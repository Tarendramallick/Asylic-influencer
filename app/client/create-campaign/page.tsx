"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X } from "lucide-react"

export default function CreateCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    deliverables: [] as string[],
    targetAudience: "",
    guidelines: "",
    hashtags: [] as string[],
    currentHashtag: "",
  })

  const deliverableOptions = ["Reel", "Story", "Post", "TikTok", "YouTube Short"]
  const audienceOptions = ["Gen Z", "Millennials", "Adults", "All Ages"]

  const handleAddDeliverable = (del: string) => {
    if (!formData.deliverables.includes(del)) {
      setFormData({
        ...formData,
        deliverables: [...formData.deliverables, del],
      })
    }
  }

  const handleRemoveDeliverable = (del: string) => {
    setFormData({
      ...formData,
      deliverables: formData.deliverables.filter((d) => d !== del),
    })
  }

  const handleAddHashtag = () => {
    if (formData.currentHashtag.trim() && !formData.hashtags.includes(formData.currentHashtag)) {
      setFormData({
        ...formData,
        hashtags: [...formData.hashtags, formData.currentHashtag],
        currentHashtag: "",
      })
    }
  }

  const handleRemoveHashtag = (tag: string) => {
    setFormData({
      ...formData,
      hashtags: formData.hashtags.filter((t) => t !== tag),
    })
  }

  const handleSubmit = () => {
    // Save campaign
    router.push("/client/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Campaign</h1>
            <p className="text-slate-600 dark:text-slate-400">Step {step} of 3</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition ${
                s <= step ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Campaign Details"}
              {step === 2 && "Target Audience & Deliverables"}
              {step === 3 && "Review & Launch"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Tell us about your campaign"}
              {step === 2 && "Define what you need from influencers"}
              {step === 3 && "Review and launch your campaign"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Campaign Title</label>
                  <Input
                    placeholder="e.g., Summer Collection Launch"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    placeholder="Describe your campaign..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Budget ($)</label>
                    <Input
                      type="number"
                      placeholder="5000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Deadline</label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Target Audience</label>
                  <div className="flex gap-2 flex-wrap">
                    {audienceOptions.map((opt) => (
                      <Button
                        key={opt}
                        variant={formData.targetAudience === opt ? "default" : "outline"}
                        onClick={() => setFormData({ ...formData, targetAudience: opt })}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Deliverables</label>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {deliverableOptions.map((opt) => (
                      <Button
                        key={opt}
                        variant={formData.deliverables.includes(opt) ? "default" : "outline"}
                        onClick={() =>
                          formData.deliverables.includes(opt) ? handleRemoveDeliverable(opt) : handleAddDeliverable(opt)
                        }
                        size="sm"
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Guidelines & Requirements</label>
                  <textarea
                    placeholder="Describe content guidelines..."
                    value={formData.guidelines}
                    onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
                    className="w-full p-3 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Hashtags & Mentions</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add hashtag"
                      value={formData.currentHashtag}
                      onChange={(e) => setFormData({ ...formData, currentHashtag: e.target.value })}
                      onKeyPress={(e) => e.key === "Enter" && handleAddHashtag()}
                    />
                    <Button onClick={handleAddHashtag} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {formData.hashtags.map((tag) => (
                      <Badge key={tag} className="gap-1">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveHashtag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Campaign Title</p>
                    <p className="font-semibold text-lg">{formData.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Budget</p>
                    <p className="font-semibold text-lg">${formData.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Deliverables</p>
                    <div className="flex gap-2 flex-wrap">
                      {formData.deliverables.map((del) => (
                        <Badge key={del}>{del}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Hashtags</p>
                    <div className="flex gap-2 flex-wrap">
                      {formData.hashtags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  By launching this campaign, influencers will be able to see and apply for it immediately.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                Previous
              </Button>
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && (!formData.title || !formData.budget || !formData.deadline)) ||
                    (step === 2 && formData.deliverables.length === 0)
                  }
                  className="flex-1"
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                  Launch Campaign
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
