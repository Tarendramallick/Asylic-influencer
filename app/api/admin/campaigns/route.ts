import { type NextRequest, NextResponse } from "next/server"
import { getDb, toObjectId } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"

export async function GET(request: NextRequest) {
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
    const user = await db.collection("users").findOne({ _id: toObjectId(payload.userId) })

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const campaigns = await db.collection("campaigns").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("[v0] Error fetching admin campaigns:", error)
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
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const db = await getDb()
    const user = await db.collection("users").findOne({ _id: toObjectId(payload.userId) })

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { title, description, client, budget, category, requirements, status } = body

    const campaign = {
      title,
      description,
      client,
      budget: Number.parseFloat(budget),
      category,
      requirements: requirements || [],
      status: status || "active",
      influencersApplied: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("campaigns").insertOne(campaign)

    return NextResponse.json({ ...campaign, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
