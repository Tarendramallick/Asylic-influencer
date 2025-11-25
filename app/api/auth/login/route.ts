import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/database"
import { generateToken } from "@/lib/auth"
import { loginSchema } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Login attempt for email:", body.email)

    // Validate input
    const validated = loginSchema.parse(body)

    const db = await getDb()
    const usersCollection = db.collection("users")

    // Find user
    const user = await usersCollection.findOne({ email: validated.email })

    if (!user) {
      console.log("[v0] User not found:", validated.email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("[v0] User found:", user.email, "Role:", user.role)

    // Check password
    const isPasswordValid = await bcrypt.compare(validated.password, user.password)
    if (!isPasswordValid) {
      console.log("[v0] Password invalid for user:", validated.email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("[v0] Password valid, generating token")

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    console.log("[v0] Login successful for:", user.email)

    return NextResponse.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        profile: user.profile,
        wallet: user.wallet,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error instanceof Error ? error.message : error)
    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
