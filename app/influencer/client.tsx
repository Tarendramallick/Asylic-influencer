"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { InfluencerDashboard } from "@/components/influencer/web-dashboard"

export default function InfluencerDashboardClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setToken, setUser } = useAuth()

  useEffect(() => {
    const token = searchParams.get("token")
    if (token) {
      localStorage.setItem("auth_token", token)
      setToken(token)
      router.replace("/influencer") // Clean up URL
    }
  }, [searchParams, router, setToken])

  return <InfluencerDashboard />
}
