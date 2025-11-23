import { type NextRequest, NextResponse } from "next/server"

const users: any[] = [
  {
    id: 1,
    email: "influencer@example.com",
    username: "influencer_user",
    role: "influencer",
    status: "active",
    followers: 125450,
    engagement: 8.5,
  },
  {
    id: 2,
    email: "brand@nike.com",
    username: "Nike Inc",
    role: "client",
    status: "active",
    industry: "Sports",
  },
  {
    id: 3,
    email: "admin@influencehub.com",
    role: "admin",
    status: "active",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const id = searchParams.get("id")

    if (id) {
      return NextResponse.json(users.find((u) => u.id === Number.parseInt(id)))
    }

    if (role) {
      return NextResponse.json(users.filter((u) => u.role === role))
    }

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newUser = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      ...body,
      status: "active",
    }

    users.push(newUser)
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    const index = users.findIndex((u) => u.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    users[index] = { ...users[index], ...body }
    return NextResponse.json(users[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
