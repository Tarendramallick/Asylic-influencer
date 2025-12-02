import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { generateToken } from "@/lib/auth"
import { getInstagramAccessToken, getInstagramProfile, getInstagramInsights } from "@/lib/instagram"

const mongoUri = process.env.MONGODB_URI!
const client = new MongoClient(mongoUri)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")
  const errorDescription = searchParams.get("error_description")

  if (error) {
    console.error(`[v0] Instagram OAuth error: ${error} - ${errorDescription}`)
    const redirectUrl = new URL("/login", process.env.NEXT_PUBLIC_APP_URL!)
    redirectUrl.searchParams.set("error", error)
    redirectUrl.searchParams.set("message", errorDescription || "Instagram login was cancelled or failed")
    return NextResponse.redirect(redirectUrl)
  }

  if (!code) {
    console.error("[v0] No authorization code received from Instagram")
    const redirectUrl = new URL("/login", process.env.NEXT_PUBLIC_APP_URL!)
    redirectUrl.searchParams.set("error", "no_code")
    redirectUrl.searchParams.set("message", "No authorization code received")
    return NextResponse.redirect(redirectUrl)
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
    const redirectUrl = new URL("/login", process.env.NEXT_PUBLIC_APP_URL!)
    redirectUrl.searchParams.set("error", "callback_failed")
    redirectUrl.searchParams.set("message", error instanceof Error ? error.message : "Authentication failed")
    return NextResponse.redirect(redirectUrl)
  } finally {
    await client.close()
  }
}
