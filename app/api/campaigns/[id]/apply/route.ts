import { type NextRequest, NextResponse } from "next/server"
import { getDb, toObjectId } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"
import { applyCampaignSchema } from "@/lib/validation"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = getTokenFromHeader(request.headers.get("authorization"))
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "influencer") {
      return NextResponse.json({ error: "Only influencers can apply to campaigns" }, { status: 403 })
    }

    const body = await request.json()
    const validated = applyCampaignSchema.parse(body)

    const db = await getDb()
    const applicationsCollection = db.collection("applications")

    // Check if already applied
    const existing = await applicationsCollection.findOne({
      influencerId: toObjectId(payload.userId),
      campaignId: toObjectId(params.id),
    })

    if (existing) {
      return NextResponse.json({ error: "Already applied to this campaign" }, { status: 400 })
    }

    const result = await applicationsCollection.insertOne({
      influencerId: toObjectId(payload.userId),
      campaignId: toObjectId(params.id),
      message: validated.message || "",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        applicationId: result.insertedId.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error applying to campaign:", error)
    return NextResponse.json({ error: "Failed to apply to campaign" }, { status: 500 })
  }
}
