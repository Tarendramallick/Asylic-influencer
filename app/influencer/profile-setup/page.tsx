"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Upload } from "lucide-react"

export default function ProfileSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    niche: "",
    followers: "",
    engagementRate: "",
    avatar: null as File | null,
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push("/influencer")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, avatar: e.target.files![0] }))
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Complete Your Profile</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profile Picture</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      {formData.avatar ? (
                        <img
                          src={URL.createObjectURL(formData.avatar) || "/placeholder.svg"}
                          alt="Avatar"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input type="file" accept="image/*" onChange={handleFileChange} />
                      <p className="text-xs text-muted-foreground mt-1">JPG or PNG, max 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    name="username"
                    placeholder="@yourusername"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Niche</label>
                  <Input
                    name="niche"
                    placeholder="e.g., Fashion, Tech, Travel"
                    value={formData.niche}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Followers</label>
                  <Input
                    name="followers"
                    type="number"
                    placeholder="Your follower count"
                    value={formData.followers}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Engagement Rate (%)</label>
                  <Input
                    name="engagementRate"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 5.2"
                    value={formData.engagementRate}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                Back
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1">
              {step === 3 ? "Complete Setup" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
