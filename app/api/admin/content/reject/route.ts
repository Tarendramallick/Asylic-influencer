import { type NextRequest, NextResponse } from "next/server"
import { getDb, toObjectId } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"

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

    const { contentId, reason } = await request.json()
    if (!contentId) {
      return NextResponse.json({ error: "Content ID required" }, { status: 400 })
    }

    const db = await getDb()

    // Update content status
    await db.collection("content").updateOne(
      { _id: toObjectId(contentId) },
      {
        $set: {
          approvalStatus: "rejected",
          rejectionReason: reason || "No reason provided",
          rejectedAt: new Date(),
          rejectedBy: toObjectId(payload.userId),
          updatedAt: new Date(),
        },
      },
    )

    // Get content to find influencer
    const content = await db.collection("content").findOne({
      _id: toObjectId(contentId),
    })

    // Create notification for influencer
    await db.collection("notifications").insertOne({
      userId: content.influencerId,
      type: "content_rejected",
      message: `Your content was rejected. Reason: ${reason || "Not specified"}`,
      contentId: toObjectId(contentId),
      createdAt: new Date(),
    })

    return NextResponse.json({
      message: "Content rejected",
    })
  } catch (error) {
    console.error("[v0] Error rejecting content:", error)
    return NextResponse.json({ error: "Failed to reject content" }, { status: 500 })
  }
}
