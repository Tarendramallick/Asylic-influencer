import { type NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"

const mongoUri = process.env.MONGODB_URI!

export async function GET(request: NextRequest) {
  const token = getTokenFromHeader(request.headers.get("authorization"))
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 })

  const reportType = request.nextUrl.searchParams.get("type") || "monthly"

  try {
    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db("influencer_platform")
    const applicationsCollection = db.collection("applications")
    const earningsCollection = db.collection("earnings")

    const now = new Date()
    const startDate = new Date()

    if (reportType === "monthly") startDate.setMonth(startDate.getMonth() - 1)
    else if (reportType === "quarterly") startDate.setMonth(startDate.getMonth() - 3)
    else if (reportType === "yearly") startDate.setFullYear(startDate.getFullYear() - 1)

    const applications = await applicationsCollection
      .find({
        influencerId: new ObjectId(payload.userId),
        createdAt: { $gte: startDate },
      })
      .toArray()

    const earnings = await earningsCollection
      .find({
        influencerId: new ObjectId(payload.userId),
        createdAt: { $gte: startDate },
      })
      .toArray()

    const totalEarnings = earnings.reduce((sum, e) => sum + (e.amount || 0), 0)
    const approvedApplications = applications.filter((a) => a.status === "approved").length

    await client.close()

    return NextResponse.json({
      period: reportType,
      totalApplications: applications.length,
      approvedApplications,
      rejectedApplications: applications.filter((a) => a.status === "rejected").length,
      totalEarnings,
      averageEarningsPerCampaign: applications.length > 0 ? totalEarnings / applications.length : 0,
    })
  } catch (error) {
    console.error("[v0] Reports error:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
