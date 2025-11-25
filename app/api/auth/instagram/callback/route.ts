import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { generateToken } from "@/lib/auth"
import { getInstagramAccessToken, getInstagramProfile, getInstagramInsights } from "@/lib/instagram"

const mongoUri = process.env.MONGODB_URI!
const client = new MongoClient(mongoUri)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  if (!code) {
    return NextResponse.json({ error: "No authorization code" }, { status: 400 })
  }

  try {
    const accessToken = await getInstagramAccessToken(code)
    const profile = await getInstagramProfile(accessToken)
    const insights = await getInstagramInsights(profile.id, accessToken)

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
            updatedAt: new Date(),
          },
        },
      )
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: "influencer",
    })

    const redirectUrl = new URL("/influencer", process.env.NEXT_PUBLIC_APP_URL!)
    redirectUrl.searchParams.set("token", token)

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error("[v0] Instagram callback error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  } finally {
    await client.close()
  }
}
