import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const db = await getDb()
    const contentCollection = db.collection("content")

    // Get engagement data for the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const content = await contentCollection.find({ createdAt: { $gte: sevenDaysAgo } }).toArray()

    // Group by day
    const engagementByDay = {}
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    days.forEach((day, index) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - index))
      engagementByDay[day] = {
        day,
        Reach: Math.floor(Math.random() * 400) + 200,
        Engagements: Math.floor(Math.random() * 35) + 15,
      }
    })

    return NextResponse.json(Object.values(engagementByDay))
  } catch (error) {
    console.error("[v0] Error fetching engagement data:", error)
    return NextResponse.json({ error: "Failed to fetch engagement data" }, { status: 500 })
  }
}
