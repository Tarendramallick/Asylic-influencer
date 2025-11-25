"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Clock, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VerificationStatus {
  verified: boolean
  verificationStatus: string
}

export function VerificationBadge() {
  const [verification, setVerification] = useState<VerificationStatus | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [documents, setDocuments] = useState<File[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchVerificationStatus()
  }, [])

  const fetchVerificationStatus = async () => {
    try {
      const response = await fetch("/api/verification", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      if (!response.ok) throw new Error("Failed to fetch verification status")
      const data = await response.json()
      setVerification(data)
    } catch (error) {
      console.error("[v0] Verification fetch error:", error)
    }
  }

  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (documents.length === 0) {
      toast({ title: "Error", description: "Please upload at least one document", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ documents: documents.map((f) => f.name) }),
      })

      if (!response.ok) throw new Error("Failed to submit verification")
      toast({ title: "Verification submitted for review" })
      fetchVerificationStatus()
      setDocuments([])
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit verification",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {verification?.verified ? (
            <>
              <Check className="w-5 h-5 text-green-500" />
              Verified
            </>
          ) : verification?.verificationStatus === "pending" ? (
            <>
              <Clock className="w-5 h-5 text-amber-500" />
              Under Review
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-muted-foreground" />
              Not Verified
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {verification?.verified ? (
          <p className="text-sm text-green-600">Your account is verified. You can access all premium features.</p>
        ) : verification?.verificationStatus === "pending" ? (
          <p className="text-sm text-amber-600">Your verification is under review. We'll notify you soon.</p>
        ) : (
          <form onSubmit={handleSubmitVerification} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get verified to unlock higher-paying campaigns and premium features.
            </p>
            <Input
              type="file"
              multiple
              onChange={(e) => setDocuments(Array.from(e.target.files || []))}
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Verification"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
