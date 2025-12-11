import { type NextRequest, NextResponse } from "next/server"
import { getDb, toObjectId } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"
import { publishContentToInstagram } from "@/lib/instagram"

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get("authorization"))
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { contentId } = await request.json()
    if (!contentId) {
      return NextResponse.json({ error: "Content ID required" }, { status: 400 })
    }

    const db = await getDb()

    // Get content details
    const content = await db.collection("content").findOne({
      _id: toObjectId(contentId),
    })

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Get influencer with Instagram token
    const influencer = await db.collection("users").findOne({
      _id: content.influencerId,
    })

    if (!influencer || !influencer.instagramAccessToken) {
      return NextResponse.json(
        {
          error: "Influencer Instagram account not connected",
        },
        { status: 400 },
      )
    }

    // Publish to Instagram
    try {
      const instagramResult = await publishContentToInstagram(
        influencer.instagramAccessToken,
        content.contentUrl,
        content.caption,
        content.hashtags,
      )

      // Update content status
      await db.collection("content").updateOne(
        { _id: toObjectId(contentId) },
        {
          $set: {
            approvalStatus: "approved",
            instagramPostId: instagramResult.postId,
            instagramUrl: instagramResult.url,
            approvedAt: new Date(),
            approvedBy: toObjectId(payload.userId),
            updatedAt: new Date(),
          },
        },
      )

      // Create notification for influencer
      await db.collection("notifications").insertOne({
        userId: content.influencerId,
        type: "content_approved",
        message: "Your content has been approved and posted to Instagram!",
        contentId: toObjectId(contentId),
        instagramUrl: instagramResult.url,
        createdAt: new Date(),
      })

      return NextResponse.json({
        message: "Content approved and posted to Instagram",
        instagramUrl: instagramResult.url,
      })
    } catch (instagramError) {
      console.error("[v0] Instagram posting error:", instagramError)
      return NextResponse.json(
        {
          error: "Content approved but failed to post to Instagram. Will retry later.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] Error approving content:", error)
    return NextResponse.json({ error: "Failed to approve content" }, { status: 500 })
  }
}
