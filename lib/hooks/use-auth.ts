"use client"

import { useEffect, useState } from "react"

interface User {
  role: "influencer" | "client" | "admin"
  email: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const role = localStorage.getItem("user_role") as User["role"]
    const email = localStorage.getItem("user_email")

    if (role && email) {
      setUser({ role, email })
    }
    setLoading(false)
  }, [])

  return { user, loading }
}
