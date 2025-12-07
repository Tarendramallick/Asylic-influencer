import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { generateToken } from "@/lib/auth"
import { getInstagramAccessTokenDirect, getInstagramProfile, getInstagramInsights } from "@/lib/instagram"

const mongoUri = process.env.MONGODB_URI!

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const verifyToken = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (verifyToken && challenge) {
    const expectedToken = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN

    if (!expectedToken) {
      console.error("[v0] INSTAGRAM_WEBHOOK_VERIFY_TOKEN not set in environment variables")
      return NextResponse.json({ error: "Webhook verify token not configured" }, { status: 500 })
    }

    if (verifyToken === expectedToken) {
      console.log("[v0] Webhook verification successful")
      return new NextResponse(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      })
    } else {
      console.error("[v0] Webhook verification failed - invalid token")
      return NextResponse.json({ error: "Invalid verify token" }, { status: 403 })
    }
  }

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

  const client = new MongoClient(mongoUri)

  try {
    console.log("[v0] Starting Instagram callback processing")
    console.log("[v0] Authorization code:", code)

    const accessToken = await getInstagramAccessTokenDirect(code)
    console.log("[v0] Access token obtained successfully")

    const profile = await getInstagramProfile(accessToken)
    console.log("[v0] Profile fetched:", profile)

    const insights = await getInstagramInsights(profile.id, accessToken)
    console.log("[v0] Insights fetched:", insights)

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

    console.log("[v0] Instagram authentication successful for user:", user.username)
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error("[v0] ===== INSTAGRAM CALLBACK ERROR =====")
    console.error("[v0] Error type:", error?.constructor?.name)
    console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Full error:", error)
    console.error("[v0] =====================================")

    const redirectUrl = new URL("/login", process.env.NEXT_PUBLIC_APP_URL!)
    redirectUrl.searchParams.set("error", "callback_failed")
    redirectUrl.searchParams.set(
      "message",
      error instanceof Error ? error.message : "Instagram OAuth failed: Unknown error",
    )
    return NextResponse.redirect(redirectUrl)
  } finally {
    await client.close()
  }
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type")

  if (contentType?.includes("application/json")) {
    const data = await request.json()
    const code = data.code

    if (!code) {
      return NextResponse.json({ error: "No authorization code provided" }, { status: 400 })
    }

    try {
      console.log("[v0] Starting Instagram callback processing")
      console.log("[v0] Authorization code:", code)

      const accessToken = await getInstagramAccessTokenDirect(code)
      console.log("[v0] Access token obtained successfully")

      const profile = await getInstagramProfile(accessToken)
      console.log("[v0] Profile fetched:", profile)

      const insights = await getInstagramInsights(profile.id, accessToken)
      console.log("[v0] Insights fetched:", insights)

      const mongoClient = new MongoClient(mongoUri)
      await mongoClient.connect()
      const db = mongoClient.db("influencer_platform")
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

      await mongoClient.close()

      return NextResponse.json({ token }, { status: 200 })
    } catch (error) {
      console.error("[v0] ===== INSTAGRAM TOKEN EXCHANGE ERROR =====")
      console.error("[v0] Error type:", error?.constructor?.name)
      console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
      console.error("[v0] Full error:", error)
      console.error("[v0] =========================================")

      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Token exchange failed" },
        { status: 500 },
      )
    }
  }

  console.log("[v0] Webhook received")
  return NextResponse.json({ success: true })
}
