import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const db = await getDb()
    const campaignsCollection = db.collection("campaigns")

    // Get all campaigns for KPI calculation
    const campaigns = await campaignsCollection.find({}).toArray()

    // Calculate KPIs
    const activeCampaigns = campaigns.filter((c) => c.status === "active").length
    const totalCreators = campaigns.reduce((sum, c) => sum + (c.applicationsCount || 0), 0)
    const totalSpend = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0)

    return NextResponse.json({
      kpis: [
        { label: "Active Campaigns", value: activeCampaigns.toString() },
        { label: "Creators Engaged", value: totalCreators.toLocaleString() },
        { label: "Spend (MTD)", value: `$${(totalSpend / 1000).toFixed(0)}k` },
        { label: "ROI (Est.)", value: "3.8x" },
      ],
      campaigns: campaigns.map((c) => ({
        name: c.title,
        status: c.status === "active" ? "Live" : c.status,
        creators: c.applicationsCount || 0,
        budget: `$${c.budget?.toLocaleString() || 0}`,
      })),
    })
  } catch (error) {
    console.error("[v0] Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
