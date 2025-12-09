import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

const DATABASE_NAME = "influencer_platform"

export async function getDb() {
  const client = await clientPromise
  return client.db(DATABASE_NAME)
}

export const connectDB = getDb

export async function initializeCollections() {
  const db = await getDb()

  // Create collections if they don't exist
  const collections = await db.listCollections().toArray()
  const collectionNames = collections.map((c) => c.name)

  if (!collectionNames.includes("users")) {
    await db.createCollection("users")
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
  }

  if (!collectionNames.includes("campaigns")) {
    await db.createCollection("campaigns")
    await db.collection("campaigns").createIndex({ brandId: 1 })
    await db.collection("campaigns").createIndex({ status: 1, deadline: 1 })
  }

  if (!collectionNames.includes("applications")) {
    await db.createCollection("applications")
    await db.collection("applications").createIndex({ influencerId: 1, campaignId: 1 })
    await db.collection("applications").createIndex({ status: 1 })
  }

  if (!collectionNames.includes("content")) {
    await db.createCollection("content")
    await db.collection("content").createIndex({ influencerId: 1 })
    await db.collection("content").createIndex({ campaignId: 1 })
  }

  if (!collectionNames.includes("earnings")) {
    await db.createCollection("earnings")
    await db.collection("earnings").createIndex({ influencerId: 1 })
  }

  if (!collectionNames.includes("payouts")) {
    await db.createCollection("payouts")
    await db.collection("payouts").createIndex({ influencerId: 1 })
    await db.collection("payouts").createIndex({ status: 1 })
  }

  if (!collectionNames.includes("messages")) {
    await db.createCollection("messages")
    await db.collection("messages").createIndex({ recipientId: 1 })
  }
}

export function toObjectId(id: string) {
  return new ObjectId(id)
}
