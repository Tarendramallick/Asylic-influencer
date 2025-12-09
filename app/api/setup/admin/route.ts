import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const db = await connectDB()
    const usersCollection = db.collection("users")

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({
      email: "admin@asylic.biz",
    })

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin user already exists",
          email: "admin@asylic.biz",
        },
        { status: 400 },
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("Admin@123456", 10)

    // Create admin user
    const result = await usersCollection.insertOne({
      email: "admin@asylic.biz",
      password: hashedPassword,
      role: "admin",
      name: "Admin",
      createdAt: new Date(),
      isVerified: true,
      status: "active",
    })

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully!",
      credentials: {
        email: "admin@asylic.biz",
        password: "Admin@123456",
        note: "Please change this password after first login",
      },
      userId: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating admin:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create admin user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Send a POST request to this endpoint to create the admin user",
    instructions: "Use the button on the setup page or send a POST request",
  })
}
