import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/database"
import { generateToken } from "@/lib/auth"
import { registerSchema } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validated = registerSchema.parse(body)

    const db = await getDb()
    const usersCollection = db.collection("users")

    // Check if user exists
    const existingUser = await usersCollection.findOne({
      email: validated.email,
    })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10)

    // Create user
    const result = await usersCollection.insertOne({
      name: validated.name,
      email: validated.email,
      password: hashedPassword,
      role: validated.role,
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        bio: "",
        avatar: "",
        followers: 0,
        engagementRate: 0,
        niche: "",
      },
      wallet: {
        balance: 0,
        totalEarned: 0,
        pending: 0,
      },
    })

    // Generate token
    const token = generateToken({
      userId: result.insertedId.toString(),
      email: validated.email,
      role: validated.role,
    })

    return NextResponse.json(
      {
        message: "User registered successfully",
        token,
        user: {
          id: result.insertedId.toString(),
          email: validated.email,
          name: validated.name,
          role: validated.role,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
