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
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne({
      _id: toObjectId(payload.userId),
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user.wallet || {})
  } catch (error) {
    console.error("[v0] Error fetching earnings:", error)
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 })
  }
}
