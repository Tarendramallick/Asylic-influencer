import { type NextRequest, NextResponse } from "next/server"

const applications: any[] = [
  {
    id: 1,
    campaignId: 1,
    influencerId: 1,
    username: "@influencer_1",
    followers: "125K",
    engagement: "8.5%",
    status: "pending",
    appliedAt: new Date(),
  },
  {
    id: 2,
    campaignId: 1,
    influencerId: 2,
    username: "@influencer_2",
    followers: "250K",
    engagement: "7.2%",
    status: "approved",
    appliedAt: new Date(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get("campaignId")

    if (campaignId) {
      return NextResponse.json(applications.filter((a) => a.campaignId === Number.parseInt(campaignId)))
    }

    return NextResponse.json(applications)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newApplication = {
      id: Math.max(...applications.map((a) => a.id), 0) + 1,
      ...body,
      status: "pending",
      appliedAt: new Date(),
    }

    applications.push(newApplication)
    return NextResponse.json(newApplication, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    const index = applications.findIndex((a) => a.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    applications[index] = { ...applications[index], status }
    return NextResponse.json(applications[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
  }
}
