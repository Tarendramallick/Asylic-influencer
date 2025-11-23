import { type NextRequest, NextResponse } from "next/server"
import { getDb, toObjectId } from "@/lib/database"
import { verifyToken, getTokenFromHeader } from "@/lib/auth"
import { updateProfileSchema } from "@/lib/validation"

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
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne({
      _id: toObjectId(payload.userId),
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("[v0] Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get("authorization"))
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const validated = updateProfileSchema.parse(body)

    const db = await getDb()
    const usersCollection = db.collection("users")

    const updateData: any = {}
    if (validated.name) updateData.name = validated.name
    if (validated.bio !== undefined) updateData["profile.bio"] = validated.bio
    if (validated.avatar !== undefined) updateData["profile.avatar"] = validated.avatar
    if (validated.followers !== undefined) updateData["profile.followers"] = validated.followers
    if (validated.engagementRate !== undefined) updateData["profile.engagementRate"] = validated.engagementRate
    if (validated.niche !== undefined) updateData["profile.niche"] = validated.niche

    updateData.updatedAt = new Date()

    await usersCollection.updateOne({ _id: toObjectId(payload.userId) }, { $set: updateData })

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("[v0] Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
