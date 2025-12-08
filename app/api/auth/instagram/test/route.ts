import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { generateToken } from "@/lib/auth"
import { getInstagramProfile, getInstagramMedia } from "@/lib/instagram"

const mongoUri = process.env.MONGODB_URI!

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json()

  if (!accessToken) {
    return NextResponse.json({ error: "No access token provided" }, { status: 400 })
  }

  const client = new MongoClient(mongoUri)

  try {
    console.log("[v0] Starting test user Instagram login")

    const profile = await getInstagramProfile(accessToken)
    console.log("[v0] Profile fetched:", profile)

    let media = { data: [] }
    try {
      media = await getInstagramMedia(accessToken)
      console.log("[v0] Media fetched:", media.data?.length || 0, "posts")
    } catch (mediaError) {
      console.warn("[v0] Could not fetch media:", mediaError)
    }

    let engagementRate = 0
    if (media.data && media.data.length > 0) {
      const totalEngagement = media.data.reduce(
        (sum: number, post: any) => sum + (post.like_count || 0) + (post.comments_count || 0),
        0,
      )
      engagementRate = Number.parseFloat(
        ((totalEngagement / media.data.length / profile.followers_count) * 100).toFixed(2),
      )
    }

    await client.connect()
    const db = client.db("influencer_platform")
    const usersCollection = db.collection("users")

    let user = await usersCollection.findOne({ instagramId: profile.id })

    if (!user) {
      const result = await usersCollection.insertOne({
        instagramId: profile.id,
        email: `${profile.username}@instagram.local`,
        username: profile.username,
        name: profile.name,
        bio: profile.biography,
        profilePicture: profile.profile_picture_url,
        followers: profile.followers_count,
        following: profile.follows_count,
        postCount: profile.media_count,
        website: profile.website || null,
        instagramAccessToken: accessToken,
        role: "influencer",
        verified: false,
        isTestUser: true,
        profile: {
          bio: profile.biography,
          avatar: profile.profile_picture_url,
          followers: profile.followers_count,
          engagementRate: engagementRate,
          niche: "General",
        },
        wallet: {
          balance: 0,
          earned: 0,
          pending: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      user = await usersCollection.findOne({ _id: result.insertedId })
    } else {
      await usersCollection.updateOne(
        { instagramId: profile.id },
        {
          $set: {
            followers: profile.followers_count,
            following: profile.follows_count,
            postCount: profile.media_count,
            instagramAccessToken: accessToken,
            "profile.followers": profile.followers_count,
            "profile.engagementRate": engagementRate,
            "profile.avatar": profile.profile_picture_url,
            "profile.bio": profile.biography,
            isTestUser: true,
            updatedAt: new Date(),
          },
        },
      )
      user = await usersCollection.findOne({ instagramId: profile.id })
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: "influencer",
    })

    console.log("[v0] Test user login successful for user:", user.username)
    return NextResponse.json({ token, user }, { status: 200 })
  } catch (error) {
    console.error("[v0] ===== TEST USER LOGIN ERROR =====")
    console.error("[v0] Error type:", error?.constructor?.name)
    console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Full error:", error)
    console.error("[v0] ====================================")

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Test user login failed" },
      { status: 500 },
    )
  } finally {
    await client.close()
  }
}
