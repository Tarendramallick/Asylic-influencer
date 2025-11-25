import { type NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"

const mongoUri = process.env.MONGODB_URI!

export async function GET(request: NextRequest) {
  const token = getTokenFromHeader(request.headers.get("authorization"))
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 })

  const recipientId = request.nextUrl.searchParams.get("recipientId")
  if (!recipientId) return NextResponse.json({ error: "Missing recipientId" }, { status: 400 })

  try {
    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db("influencer_platform")
    const messagesCollection = db.collection("messages")

    const messages = await messagesCollection
      .find({
        $or: [
          { senderId: new ObjectId(payload.userId), recipientId: new ObjectId(recipientId) },
          { senderId: new ObjectId(recipientId), recipientId: new ObjectId(payload.userId) },
        ],
      })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()

    await client.close()
    return NextResponse.json(messages.reverse())
  } catch (error) {
    console.error("[v0] Messages fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const token = getTokenFromHeader(request.headers.get("authorization"))
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 })

  try {
    const { recipientId, message } = await request.json()
    if (!recipientId || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db("influencer_platform")
    const messagesCollection = db.collection("messages")

    const result = await messagesCollection.insertOne({
      senderId: new ObjectId(payload.userId),
      recipientId: new ObjectId(recipientId),
      message,
      read: false,
      createdAt: new Date(),
    })

    await client.close()
    return NextResponse.json({ id: result.insertedId, message: "Message sent" })
  } catch (error) {
    console.error("[v0] Message send error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
