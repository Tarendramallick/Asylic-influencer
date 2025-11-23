import { type NextRequest, NextResponse } from "next/server"
import { getDb, toObjectId } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"
import { createCampaignSchema } from "@/lib/validation"

export async function GET(request: NextRequest) {
  try {
    const db = await getDb()
    const campaignsCollection = db.collection("campaigns")

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const filter: any = { status: "active" }
    if (category && category !== "all") {
      filter.category = category
    }

    const campaigns = await campaignsCollection.find(filter).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("[v0] Error fetching campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get("authorization"))
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "brand") {
      return NextResponse.json({ error: "Only brands can create campaigns" }, { status: 403 })
    }

    const body = await request.json()
    const validated = createCampaignSchema.parse(body)

    const db = await getDb()
    const campaignsCollection = db.collection("campaigns")

    const result = await campaignsCollection.insertOne({
      ...validated,
      brandId: toObjectId(payload.userId),
      status: "active",
      applications: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Campaign created successfully",
        campaignId: result.insertedId.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error creating campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
