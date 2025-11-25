import { type NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"

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
    const scheduleCollection = db.collection("scheduled_content")

    const scheduled = await scheduleCollection
      .find({ influencerId: new ObjectId(payload.userId) })
      .sort({ scheduledAt: 1 })
      .toArray()

    await client.close()
    return NextResponse.json(scheduled)
  } catch (error) {
    console.error("[v0] Schedule fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const token = getTokenFromHeader(request.headers.get("authorization"))
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 })

  try {
    const { campaignId, content, scheduledAt } = await request.json()
    if (!campaignId || !content || !scheduledAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db("influencer_platform")
    const scheduleCollection = db.collection("scheduled_content")

    const result = await scheduleCollection.insertOne({
      influencerId: new ObjectId(payload.userId),
      campaignId: new ObjectId(campaignId),
      content,
      scheduledAt: new Date(scheduledAt),
      status: "scheduled",
      createdAt: new Date(),
    })

    await client.close()
    return NextResponse.json({ id: result.insertedId, message: "Content scheduled" })
  } catch (error) {
    console.error("[v0] Schedule creation error:", error)
    return NextResponse.json({ error: "Failed to schedule content" }, { status: 500 })
  }
}
