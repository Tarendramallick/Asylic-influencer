import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    const db = await getDb()
    const campaignsCollection = db.collection("campaigns")

    // Search for campaigns/weblinks by title or description
    const results = await campaignsCollection
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { url: { $regex: query, $options: "i" } },
        ],
      })
      .limit(10)
      .toArray()

    return NextResponse.json(
      results.map((c) => ({
        id: c._id.toString(),
        title: c.title,
        url: c.url,
        description: c.description,
        type: "campaign",
      })),
    )
  } catch (error) {
    console.error("[v0] Search weblinks error:", error)
    return NextResponse.json({ error: "Failed to search weblinks" }, { status: 500 })
  }
}
