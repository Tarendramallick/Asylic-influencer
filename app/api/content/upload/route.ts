import { type NextRequest, NextResponse } from "next/server"
import { getDb, toObjectId } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"
import { uploadContentSchema } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get("authorization"))
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "influencer") {
      return NextResponse.json({ error: "Only influencers can upload content" }, { status: 403 })
    }

    const body = await request.json()
    const validated = uploadContentSchema.parse(body)

    const db = await getDb()
    const contentCollection = db.collection("content")

    const result = await contentCollection.insertOne({
      influencerId: toObjectId(payload.userId),
      campaignId: toObjectId(validated.campaignId),
      contentType: validated.contentType,
      contentUrl: validated.contentUrl,
      caption: validated.caption || "",
      status: "pending_review",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Content uploaded successfully",
        contentId: result.insertedId.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error uploading content:", error)
    return NextResponse.json({ error: "Failed to upload content" }, { status: 500 })
  }
}
