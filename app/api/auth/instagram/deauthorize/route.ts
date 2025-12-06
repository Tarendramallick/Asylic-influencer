import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const mongoUri = process.env.MONGODB_URI!

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { signed_request } = body

    if (!signed_request) {
      console.error("[v0] Deauthorize request missing signed_request")
      return NextResponse.json({ error: "Missing signed_request" }, { status: 400 })
    }

    // Parse the signed request to get user ID
    const [encodedSig, payload] = signed_request.split(".")
    const decodedPayload = JSON.parse(Buffer.from(payload, "base64").toString())
    const instagramUserId = decodedPayload.user_id

    console.log("[v0] Instagram deauthorization request for user:", instagramUserId)

    // Remove user's Instagram access token from database
    const client = new MongoClient(mongoUri)
    try {
      await client.connect()
      const db = client.db("influencer_platform")
      const usersCollection = db.collection("users")

      await usersCollection.updateOne(
        { instagramId: instagramUserId },
        {
          $set: {
            instagramAccessToken: null,
            updatedAt: new Date(),
          },
        },
      )

      console.log("[v0] Successfully deauthorized Instagram user:", instagramUserId)
      return NextResponse.json({ success: true }, { status: 200 })
    } finally {
      await client.close()
    }
  } catch (error) {
    console.error("[v0] Deauthorize error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Deauthorization failed" },
      { status: 500 },
    )
  }
}
