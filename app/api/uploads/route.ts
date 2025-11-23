import { type NextRequest, NextResponse } from "next/server"

const uploads: any[] = [
  {
    id: 1,
    applicationId: 2,
    influencerId: 2,
    uploadUrl: "/uploads/sample-reel.mp4",
    caption: "Amazing summer vibes with our collection",
    status: "pending",
    uploadedAt: new Date(),
    deliverables: ["Reel", "Story"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const applicationId = searchParams.get("applicationId")

    if (applicationId) {
      return NextResponse.json(uploads.filter((u) => u.applicationId === Number.parseInt(applicationId)))
    }

    return NextResponse.json(uploads)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch uploads" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newUpload = {
      id: Math.max(...uploads.map((u) => u.id), 0) + 1,
      ...body,
      status: "pending",
      uploadedAt: new Date(),
    }

    uploads.push(newUpload)
    return NextResponse.json(newUpload, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create upload" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    const index = uploads.findIndex((u) => u.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 })
    }

    uploads[index] = { ...uploads[index], status }
    return NextResponse.json(uploads[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update upload" }, { status: 500 })
  }
}
