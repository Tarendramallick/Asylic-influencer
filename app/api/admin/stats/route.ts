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
    const user = await db.collection("users").findOne({ _id: toObjectId(payload.userId) })

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const [totalCampaigns, totalInfluencers, totalClients, pendingVerifications, revenueData] = await Promise.all([
      db.collection("campaigns").countDocuments({}),
      db.collection("users").countDocuments({ role: "influencer" }),
      db.collection("users").countDocuments({ role: "client" }),
      db.collection("users").countDocuments({ role: "influencer", verified: { $ne: true } }),
      // Get revenue by month
      db
        .collection("campaigns")
        .aggregate([
          {
            $group: {
              _id: { $month: "$createdAt" },
              revenue: { $sum: "$budget" },
            },
          },
          { $sort: { _id: 1 } },
        ])
        .toArray(),
    ])

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const formattedRevenue = revenueData.map((item) => ({
      month: monthNames[item._id - 1],
      Revenue: item.revenue / 1000, // Convert to thousands
    }))

    return NextResponse.json({
      totalCampaigns,
      totalInfluencers,
      totalClients,
      pendingVerifications,
      revenueData: formattedRevenue,
    })
  } catch (error) {
    console.error("[v0] Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
