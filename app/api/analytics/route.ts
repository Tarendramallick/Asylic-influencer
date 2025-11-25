import { type NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"
import { getInstagramInsights, getInstagramMedia } from "@/lib/instagram"

const mongoUri = process.env.MONGODB_URI!

export async function GET(request: NextRequest) {
  const token = getTokenFromHeader(request.headers.get("authorization"))
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 })

  try {
    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db("influencer_platform")
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne({ _id: new ObjectId(payload.userId) })
    if (!user || !user.instagramAccessToken) {
      await client.close()
      return NextResponse.json({ error: "Instagram account not connected" }, { status: 400 })
    }

    const insights = await getInstagramInsights(user.instagramId, user.instagramAccessToken)
    const media = await getInstagramMedia(user.instagramAccessToken)

    const totalEngagement = media.data.reduce(
      (sum: number, post: any) => sum + (post.like_count + post.comments_count),
      0,
    )
    const avgEngagement = media.data.length > 0 ? totalEngagement / media.data.length : 0

    await client.close()

    return NextResponse.json({
      profile: {
        followers: user.followers,
        following: user.following,
        postCount: user.postCount,
      },
      insights: insights.data || [],
      media: media.data || [],
      engagement: {
        total: totalEngagement,
        average: Number.parseFloat(avgEngagement.toFixed(2)),
      },
    })
  } catch (error) {
    console.error("[v0] Analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
