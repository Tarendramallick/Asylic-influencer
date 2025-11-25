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
    const notificationsCollection = db.collection("notifications")

    const notifications = await notificationsCollection
      .find({ userId: new ObjectId(payload.userId) })
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray()

    await client.close()
    return NextResponse.json(notifications)
  } catch (error) {
    console.error("[v0] Notifications fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const token = getTokenFromHeader(request.headers.get("authorization"))
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 })

  try {
    const { notificationId } = await request.json()
    if (!notificationId) return NextResponse.json({ error: "Missing notificationId" }, { status: 400 })

    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db("influencer_platform")
    const notificationsCollection = db.collection("notifications")

    await notificationsCollection.updateOne(
      { _id: new ObjectId(notificationId), userId: new ObjectId(payload.userId) },
      { $set: { read: true } },
    )

    await client.close()
    return NextResponse.json({ message: "Notification marked as read" })
  } catch (error) {
    console.error("[v0] Notification update error:", error)
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}
