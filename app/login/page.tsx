"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mail, Lock, Building2, User, Shield } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("role") as "influencer" | "brand" | "admin" | null

  const [loginType, setLoginType] = useState<"influencer" | "brand" | "admin">(initialRole || "influencer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!email || !password) {
        setError("Please fill in all fields")
        setLoading(false)
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        setLoading(false)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 800))

      localStorage.setItem("user_role", loginType)
      localStorage.setItem("user_email", email)
      localStorage.setItem("auth_token", `token_${Date.now()}`)

      if (loginType === "influencer") {
        router.push("/influencer/dashboard")
      } else if (loginType === "brand") {
        router.push("/client/dashboard")
      } else {
        router.push("/admin/dashboard")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const demoAccounts = {
    influencer: { email: "creator@example.com", password: "demo123" },
    brand: { email: "brand@example.com", password: "demo123" },
    admin: { email: "admin@example.com", password: "demo123" },
  }

  const fillDemoAccount = () => {
    const demo = demoAccounts[loginType]
    setEmail(demo.email)
    setPassword(demo.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="hidden md:flex flex-col justify-center space-y-8">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-bold text-slate-900 hover:text-primary transition-colors">InfluenceHub</h1>
            </Link>
            <p className="text-lg text-slate-600">The complete influencer marketing platform</p>

            <div className="space-y-6">
              <FeatureCard
                icon={<User className="w-5 h-5" />}
                title="For Influencers"
                description="Discover campaigns, showcase your content, and earn money"
              />
              <FeatureCard
                icon={<Building2 className="w-5 h-5" />}
                title="For Brands"
                description="Launch campaigns and connect with perfect influencers"
              />
              <FeatureCard
                icon={<Shield className="w-5 h-5" />}
                title="For Admins"
                description="Manage users and monitor platform performance"
              />
            </div>

            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-4">Trusted by industry leaders</p>
              <div className="flex gap-4 opacity-70">
                <div className="text-xs font-semibold text-slate-600 bg-white px-3 py-2 rounded-lg">Nike</div>
                <div className="text-xs font-semibold text-slate-600 bg-white px-3 py-2 rounded-lg">Adidas</div>
                <div className="text-xs font-semibold text-slate-600 bg-white px-3 py-2 rounded-lg">Sony</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Role Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setLoginType("influencer")}
                  className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                    loginType === "influencer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  <User className="w-4 h-4 mx-auto mb-1" />
                  Influencer
                </button>
                <button
                  onClick={() => setLoginType("brand")}
                  className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                    loginType === "brand" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1" />
                  Brand
                </button>
                <button
                  onClick={() => setLoginType("admin")}
                  className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                    loginType === "admin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  <Shield className="w-4 h-4 mx-auto mb-1" />
                  Admin
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading} size="lg">
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-blue-900">Demo Credentials</p>
                <p className="text-xs text-blue-700">{demoAccounts[loginType].email}</p>
                <Button variant="outline" size="sm" onClick={fillDemoAccount} className="w-full bg-transparent">
                  Use Demo Account
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link href="#" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-white/50 backdrop-blur">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  )
}
