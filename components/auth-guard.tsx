"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "influencer" | "brand" | "admin"
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter()
  const { user, loading, token } = useAuth()

  useEffect(() => {
    if (loading) return

    if (!token || !user) {
      router.push("/login")
      return
    }

    if (requiredRole && user.role !== requiredRole) {
      router.push(user.role === "brand" ? "/client" : "/influencer")
    }
  }, [user, token, loading, requiredRole, router])

  if (loading || !token || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
