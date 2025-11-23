import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo (replace with database in production)
let campaigns: any[] = [
  {
    id: 1,
    clientId: 1,
    title: "Summer Collection Campaign",
    budget: 5000,
    applicants: 12,
    approved: 3,
    deadline: "2025-12-30",
    status: "active",
    createdAt: new Date(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const campaign = campaigns.find((c) => c.id === Number.parseInt(id))
      return NextResponse.json(campaign || null)
    }

    return NextResponse.json(campaigns)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newCampaign = {
      id: Math.max(...campaigns.map((c) => c.id), 0) + 1,
      ...body,
      applicants: 0,
      approved: 0,
      status: "active",
      createdAt: new Date(),
    }

    campaigns.push(newCampaign)
    return NextResponse.json(newCampaign, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    const index = campaigns.findIndex((c) => c.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    campaigns[index] = { ...campaigns[index], ...body }
    return NextResponse.json(campaigns[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    campaigns = campaigns.filter((c) => c.id !== Number.parseInt(id!))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 })
  }
}
