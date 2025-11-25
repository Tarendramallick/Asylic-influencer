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
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne({ _id: new ObjectId(payload.userId) })
    await client.close()

    return NextResponse.json({
      verified: user?.verified || false,
      verificationStatus: user?.verificationStatus || "pending",
    })
  } catch (error) {
    console.error("[v0] Verification fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch verification status" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const token = getTokenFromHeader(request.headers.get("authorization"))
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 })

  try {
    const { documents } = await request.json()
    if (!documents) return NextResponse.json({ error: "Missing documents" }, { status: 400 })

    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db("influencer_platform")
    const verificationsCollection = db.collection("verifications")

    const result = await verificationsCollection.insertOne({
      userId: new ObjectId(payload.userId),
      documents,
      status: "pending",
      submittedAt: new Date(),
    })

    await client.close()
    return NextResponse.json({ id: result.insertedId, message: "Verification submitted" })
  } catch (error) {
    console.error("[v0] Verification submission error:", error)
    return NextResponse.json({ error: "Failed to submit verification" }, { status: 500 })
  }
}
