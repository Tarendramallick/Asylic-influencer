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

    const { contentId } = await request.json()
    if (!contentId) {
      return NextResponse.json({ error: "Content ID required" }, { status: 400 })
    }

    const db = await getDb()

    const content = await db.collection("content").findOne({
      _id: toObjectId(contentId),
    })

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Update content status to approved
    const result = await db.collection("content").updateOne(
      { _id: toObjectId(contentId) },
      {
        $set: {
          approvalStatus: "approved",
          approvedAt: new Date(),
          approvedBy: toObjectId(payload.userId),
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
    }

    // Create notification for influencer
    await db.collection("notifications").insertOne({
      userId: content.influencerId,
      type: "content_approved",
      message: "Your content has been approved! You can now share it on Instagram.",
      contentId: toObjectId(contentId),
      read: false,
      createdAt: new Date(),
    })

    return NextResponse.json({
      message: "Content approved successfully",
      contentId: contentId,
    })
  } catch (error) {
    console.error("[v0] Error approving content:", error)
    return NextResponse.json(
      { error: "Failed to approve content: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 500 },
    )
  }
}
