import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const db = await getDb()
    const applicationsCollection = db.collection("applications")
    const usersCollection = db.collection("users")

    const applications = await applicationsCollection.find({}).limit(50).toArray()

    const enriched = await Promise.all(
      applications.map(async (app) => {
        const influencer = await usersCollection.findOne({ _id: app.influencerId })
        return {
          id: app._id.toString(),
          name: influencer?.name || "Unknown",
          followers: influencer?.profile?.followers || 0,
          engagement: `${(influencer?.profile?.engagementRate || 0).toFixed(1)}%`,
          proposal: app.proposal || "N/A",
          status: app.status || "Pending",
          campaign: app.campaignName || "N/A",
        }
      }),
    )

    return NextResponse.json(enriched)
  } catch (error) {
    console.error("[v0] Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
