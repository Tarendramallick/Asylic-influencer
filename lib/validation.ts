import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["influencer", "brand"]),
})

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  followers: z.number().optional(),
  engagementRate: z.number().optional(),
  niche: z.string().optional(),
})

export const createCampaignSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  budget: z.number().min(100, "Budget must be at least 100"),
  deadline: z.string(),
  deliverables: z.array(z.string()),
  category: z.string(),
  hashtags: z.array(z.string()),
})

export const applyCampaignSchema = z.object({
  campaignId: z.string(),
  message: z.string().optional(),
})

export const uploadContentSchema = z.object({
  campaignId: z.string(),
  contentType: z.enum(["reel", "story", "carousel", "post"]),
  contentUrl: z.string().url(),
  caption: z.string().optional(),
})

export const requestPayoutSchema = z.object({
  amount: z.number().min(10, "Minimum payout is 10"),
  method: z.enum(["bank_transfer", "upi"]),
  bankDetails: z
    .object({
      accountNumber: z.string(),
      ifscCode: z.string(),
      accountHolder: z.string(),
    })
    .optional(),
  upiId: z.string().optional(),
})
