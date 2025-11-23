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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const db = await getDb()
    const payoutsCollection = db.collection("payouts")

    const filter: any = { influencerId: toObjectId(payload.userId) }
    if (status) {
      filter.status = status
    }

    const payouts = await payoutsCollection.find(filter).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(payouts)
  } catch (error) {
    console.error("[v0] Error fetching payout history:", error)
    return NextResponse.json({ error: "Failed to fetch payout history" }, { status: 500 })
  }
}
