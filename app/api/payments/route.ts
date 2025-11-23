import { type NextRequest, NextResponse } from "next/server"

const payments: any[] = [
  {
    id: 1,
    influencerId: 1,
    applicationId: 1,
    amount: 500,
    status: "completed",
    date: new Date(),
  },
  {
    id: 2,
    influencerId: 2,
    applicationId: 2,
    amount: 750,
    status: "pending",
    date: new Date(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const influencerId = searchParams.get("influencerId")

    if (influencerId) {
      return NextResponse.json(payments.filter((p) => p.influencerId === Number.parseInt(influencerId)))
    }

    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newPayment = {
      id: Math.max(...payments.map((p) => p.id), 0) + 1,
      ...body,
      date: new Date(),
    }

    payments.push(newPayment)
    return NextResponse.json(newPayment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    const index = payments.findIndex((p) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    payments[index] = { ...payments[index], status }
    return NextResponse.json(payments[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 })
  }
}
