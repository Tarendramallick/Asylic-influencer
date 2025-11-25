import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    const db = await getDb()
    const usersCollection = db.collection("users")

    // Search for clients (brand role) by name or email
    const clients = await usersCollection
      .find({
        role: "brand",
        $or: [{ name: { $regex: query, $options: "i" } }, { email: { $regex: query, $options: "i" } }],
      })
      .limit(10)
      .toArray()

    return NextResponse.json(
      clients.map((c) => ({
        id: c._id.toString(),
        name: c.name,
        email: c.email,
        type: "client",
      })),
    )
  } catch (error) {
    console.error("[v0] Search clients error:", error)
    return NextResponse.json({ error: "Failed to search clients" }, { status: 500 })
  }
}
