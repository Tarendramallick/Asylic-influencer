"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Instagram } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleParam = searchParams.get("role")
  const { login } = useAuth()
  const { toast } = useToast()

  const [role, setRole] = useState<string>(roleParam || "")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [testAccessToken, setTestAccessToken] = useState("")
  const [showTestTokenForm, setShowTestTokenForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInstagramLogin = () => {
    window.location.href = "/api/auth/instagram"
  }

  const handleTestUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/instagram/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: testAccessToken }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Test user login failed")
      }

      const data = await response.json()
      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("auth_user", JSON.stringify(data.user))
      toast({
        title: "Success",
        description: `Welcome ${data.user.username}! (Test User)`,
      })
      router.push("/influencer")
    } catch (error) {
      toast({
        title: "Test user login failed",
        description: error instanceof Error ? error.message : "Invalid access token",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to Asylic.in</CardTitle>
            <CardDescription>Choose your account type to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={() => setRole("influencer")} variant="outline" className="w-full h-12 justify-start">
              <Instagram className="w-5 h-5 mr-2" />
              Join as Influencer
            </Button>
            <Button onClick={() => setRole("brand")} variant="outline" className="w-full h-12 justify-start">
              Continue as Brand
            </Button>
            <Button onClick={() => setRole("admin")} variant="outline" className="w-full h-12 justify-start">
              Admin Access
            </Button>
            <Button onClick={() => router.push("/")} variant="ghost" className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Button variant="ghost" size="sm" className="mb-4 -ml-2 w-fit" onClick={() => setRole("")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-2xl">
            {role === "influencer" ? "Influencer Login" : role === "brand" ? "Brand Login" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {role === "influencer"
              ? "Sign in to your creator account"
              : role === "brand"
                ? "Sign in to your brand account"
                : "Sign in to admin panel"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {role === "influencer" && (
            <>
              <Button
                onClick={handleInstagramLogin}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Continue with Instagram
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">Test User</span>
                </div>
              </div>

              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowTestTokenForm(!showTestTokenForm)}
                  className="w-full"
                >
                  {showTestTokenForm ? "Hide Test Login" : "Login with Test Token"}
                </Button>

                {showTestTokenForm && (
                  <form onSubmit={handleTestUserLogin} className="mt-4 space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Instagram Access Token</label>
                      <textarea
                        placeholder="Paste your test Instagram access token here"
                        value={testAccessToken}
                        onChange={(e) => setTestAccessToken(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        This is for testing only. Use your Instagram test app access token.
                      </p>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full h-10">
                      {isLoading ? "Logging in..." : "Login as Test User"}
                    </Button>
                  </form>
                )}
              </div>
            </>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" className="text-primary hover:underline font-semibold">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
