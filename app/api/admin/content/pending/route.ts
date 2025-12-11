import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get("authorization"))
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const db = await getDb()

    // Get all pending content with influencer and campaign details
    const pendingContent = await db
      .collection("content")
      .aggregate([
        { $match: { approvalStatus: "pending" } },
        {
          $lookup: {
            from: "users",
            localField: "influencerId",
            foreignField: "_id",
            as: "influencer",
          },
        },
        {
          $lookup: {
            from: "campaigns",
            localField: "campaignId",
            foreignField: "_id",
            as: "campaign",
          },
        },
        { $unwind: "$influencer" },
        { $unwind: "$campaign" },
        { $sort: { createdAt: -1 } },
      ])
      .toArray()

    return NextResponse.json(pendingContent)
  } catch (error) {
    console.error("[v0] Error fetching pending content:", error)
    return NextResponse.json({ error: "Failed to fetch pending content" }, { status: 500 })
  }
}
