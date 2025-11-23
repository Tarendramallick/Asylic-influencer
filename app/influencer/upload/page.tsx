"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Clock, CheckCircle } from "lucide-react"

export default function ContentUploadPage() {
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [caption, setCaption] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [campaignId, setCampaignId] = useState("1")

  const handleFileUpload = (type: string) => {
    setUploadedFiles([...uploadedFiles, type])
  }

  const handleSubmit = async () => {
    const uploadData = {
      applicationId: 1,
      influencerId: 1,
      uploadUrl: "/uploads/content",
      caption,
      scheduledTime,
      deliverables: uploadedFiles,
    }

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(uploadData),
      })

      if (response.ok) {
        router.push("/influencer/dashboard")
      }
    } catch (error) {
      console.error("Upload failed:", error)
    }
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
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Upload Content</h1>
            <p className="text-slate-600 dark:text-slate-400">Campaign: Summer Collection</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* File Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Content Files</CardTitle>
              <CardDescription>Upload your Reel, Story, or Post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {["Reel", "Story", "Post"].map((type) => (
                  <div
                    key={type}
                    onClick={() => handleFileUpload(type)}
                    className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="font-semibold">{type}</p>
                    <p className="text-xs text-slate-500">MP4 • 50MB max</p>
                  </div>
                ))}
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Uploaded Files:</p>
                  <div className="flex gap-2 flex-wrap">
                    {uploadedFiles.map((file, i) => (
                      <Badge key={i} className="bg-green-100 text-green-800 dark:bg-green-900 gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {file}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Caption Section */}
          <Card>
            <CardHeader>
              <CardTitle>Caption & Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Caption</label>
                <textarea
                  placeholder="Write your caption here..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-3 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                  rows={4}
                />
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Required Hashtags & Mentions</p>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md text-sm space-y-1">
                  <p>#SummerCollection #Nike</p>
                  <p>@nike</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheduling Section */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Posting</CardTitle>
              <CardDescription>Set when you want to post this content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Scheduled Time</label>
                <div className="flex gap-2">
                  <Clock className="w-5 h-5 text-slate-400 mt-2" />
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="flex-1 p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">Must be before deadline: 2025-12-30</p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={uploadedFiles.length === 0}
            >
              Submit Content
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
