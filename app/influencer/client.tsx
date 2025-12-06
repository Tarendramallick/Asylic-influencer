"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { InfluencerDashboard } from "@/components/influencer/web-dashboard"

export default function InfluencerDashboardClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setToken, token, user } = useAuth()

  useEffect(() => {
    const code = searchParams.get("code")
    const tokenFromUrl = searchParams.get("token")

    // If there's a token in URL (from our auth endpoint), use it
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
      router.replace("/influencer")
      return
    }

    // If there's a code (from Instagram OAuth), exchange it for a token
    if (code) {
      const exchangeCode = async () => {
        try {
          console.log("[v0] Exchanging Instagram code for token")
          const response = await fetch("/api/auth/instagram/callback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          })

          if (response.ok) {
            const data = await response.json()
            console.log("[v0] Token received:", data.token)
            setToken(data.token)
            router.replace("/influencer")
          } else {
            const error = await response.json()
            console.error("[v0] Token exchange failed:", error)
          }
        } catch (error) {
          console.error("[v0] Error exchanging code:", error)
        }
      }

      exchangeCode()
    }
  }, [searchParams, router, setToken])

  useEffect(() => {
    if (!user) {
      router.replace("/login")
    }
  }, [user, router])

  return <InfluencerDashboard />
}
