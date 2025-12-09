import { type NextRequest, NextResponse } from "next/server"
import { getDb, toObjectId } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"
import { getInstagramProfile, getInstagramMedia } from "@/lib/instagram"

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get("authorization"))
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const db = await getDb()
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne({ _id: toObjectId(payload.userId) })
    if (!user || !user.instagramAccessToken) {
      return NextResponse.json({ error: "Instagram account not connected" }, { status: 400 })
    }

    console.log("[v0] Syncing Instagram data for user:", user.username)

    // Fetch fresh Instagram data
    const profile = await getInstagramProfile(user.instagramAccessToken)
    const media = await getInstagramMedia(user.instagramAccessToken)

    // Calculate engagement rate
    const totalEngagement = media.data.reduce(
      (sum: number, post: any) => sum + (post.like_count || 0) + (post.comments_count || 0),
      0,
    )
    const totalFollowers = profile.followers_count || 1
    const totalPosts = media.data.length || 1
    const engagementRate = ((totalEngagement / totalFollowers / totalPosts) * 100).toFixed(2)

    // Update user with fresh data
    await usersCollection.updateOne(
      { _id: toObjectId(payload.userId) },
      {
        $set: {
          name: profile.name,
          username: profile.username,
          followers: profile.followers_count,
          following: profile.follows_count,
          postCount: profile.media_count,
          "profile.bio": profile.biography,
          "profile.website": profile.website,
          "profile.profilePicture": profile.profile_picture_url,
          "profile.engagementRate": Number.parseFloat(engagementRate),
          lastSyncedAt: new Date(),
        },
      },
    )

    console.log("[v0] Instagram data synced successfully")

    return NextResponse.json({
      message: "Instagram data synced successfully",
      profile: {
        name: profile.name,
        username: profile.username,
        followers: profile.followers_count,
        following: profile.follows_count,
        postCount: profile.media_count,
        engagementRate: Number.parseFloat(engagementRate),
      },
    })
  } catch (error) {
    console.error("[v0] Error syncing Instagram data:", error)
    return NextResponse.json({ error: "Failed to sync Instagram data" }, { status: 500 })
  }
}
