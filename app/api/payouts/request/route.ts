import { type NextRequest, NextResponse } from "next/server"
import { getDb, toObjectId } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"
import { requestPayoutSchema } from "@/lib/validation"

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

    const body = await request.json()
    const validated = requestPayoutSchema.parse(body)

    const db = await getDb()
    const usersCollection = db.collection("users")
    const payoutsCollection = db.collection("payouts")

    // Get user wallet balance
    const user = await usersCollection.findOne({
      _id: toObjectId(payload.userId),
    })

    if (!user || !user.wallet || user.wallet.balance < validated.amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    // Create payout request
    const result = await payoutsCollection.insertOne({
      influencerId: toObjectId(payload.userId),
      amount: validated.amount,
      method: validated.method,
      bankDetails: validated.method === "bank_transfer" ? validated.bankDetails : undefined,
      upiId: validated.method === "upi" ? validated.upiId : undefined,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Update wallet balance
    await usersCollection.updateOne(
      { _id: toObjectId(payload.userId) },
      {
        $set: {
          "wallet.balance": user.wallet.balance - validated.amount,
          "wallet.pending": (user.wallet.pending || 0) + validated.amount,
        },
      },
    )

    return NextResponse.json(
      {
        message: "Payout request submitted",
        payoutId: result.insertedId.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error requesting payout:", error)
    return NextResponse.json({ error: "Failed to request payout" }, { status: 500 })
  }
}
