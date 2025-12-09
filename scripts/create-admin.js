// Run this script once to create a default admin user
// node scripts/create-admin.js

const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string_here"
const DATABASE_NAME = "influencer_platform"

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(DATABASE_NAME)
    const usersCollection = db.collection("users")

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email: "admin@asylic.biz" })

    if (existingAdmin) {
      console.log("Admin user already exists!")
      console.log("Email: admin@asylic.biz")
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("Admin@123456", 10)

    // Create admin user
    const result = await usersCollection.insertOne({
      name: "Admin User",
      email: "admin@asylic.biz",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        bio: "System Administrator",
        avatar: "",
        followers: 0,
        engagementRate: 0,
        niche: "Administration",
      },
      wallet: {
        balance: 0,
        totalEarned: 0,
        pending: 0,
      },
    })

    console.log("✅ Admin user created successfully!")
    console.log("\n=== ADMIN CREDENTIALS ===")
    console.log("Email: admin@asylic.biz")
    console.log("Password: Admin@123456")
    console.log("\n⚠️  IMPORTANT: Change this password after first login!")
    console.log("\nYou can now login at: /login?role=admin")
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await client.close()
    console.log("\nDisconnected from MongoDB")
  }
}

createAdminUser()
