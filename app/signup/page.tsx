"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const router = useRouter()
  const { register } = useAuth()
  const { toast } = useToast()

  const [role, setRole] = useState<"influencer" | "brand" | "">("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  const passwordsMatch = password && confirmPassword && password === confirmPassword
  const passwordsDontMatch = password && confirmPassword && password !== confirmPassword

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!role) {
      toast({
        title: "Error",
        description: "Please select an account type",
        variant: "destructive",
      })
      return
    }

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await register(name, email, password, role)
      toast({
        title: "Success",
        description: `${role === "influencer" ? "Influencer" : "Brand"} account created successfully!`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Please try again",
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
            <CardTitle className="text-2xl">Create your Asylic.in account</CardTitle>
            <CardDescription>Choose how you want to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={() => setRole("influencer")} variant="outline" className="w-full h-12 justify-start">
              Sign up as Influencer
            </Button>
            <Button onClick={() => setRole("brand")} variant="outline" className="w-full h-12 justify-start">
              Sign up as Brand
            </Button>
            <Button onClick={() => router.push("/login")} variant="ghost" className="w-full">
              Already have an account?
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
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2 w-fit"
            onClick={() => {
              setRole("")
              setErrors({})
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-2xl">
            {role === "influencer" ? "Create Influencer Account" : "Create Brand Account"}
          </CardTitle>
          <CardDescription>Get started in minutes</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors({ ...errors, name: undefined })
                }}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors({ ...errors, email: undefined })
                }}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors({ ...errors, password: undefined })
                  }}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              {password && password.length >= 6 && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Password meets requirements
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
                  }}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && (
                <div
                  className={`text-sm flex items-center gap-1 ${passwordsMatch ? "text-green-600" : "text-red-500"}`}
                >
                  {passwordsMatch ? (
                    <>
                      <Check className="w-4 h-4" /> Passwords match
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" /> Passwords do not match
                    </>
                  )}
                </div>
              )}
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <Button type="submit" disabled={isLoading || !passwordsMatch || !name || !email} className="w-full h-12">
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm mt-4">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
