"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Cloud, Instagram, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export function UploadContent() {
  const { token } = useAuth()
  const router = useRouter()
  const [selected, setSelected] = useState<string>("")
  const [uploadMethod, setUploadMethod] = useState<"manual" | "instagram">("manual")
  const [file, setFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [contentType, setContentType] = useState<"reel" | "story" | "carousel" | "post">("reel")
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState(true)

  React.useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (response.ok) {
          const data = await response.json()
          setCampaigns(data)
        }
      } catch (err) {
        console.error("[v0] Error loading campaigns:", err)
      } finally {
        setLoadingCampaigns(false)
      }
    }

    if (token) {
      loadCampaigns()
    }
  }, [token])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      validateAndSetFile(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add("border-primary", "bg-primary/5")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("border-primary", "bg-primary/5")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary", "bg-primary/5")
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      validateAndSetFile(droppedFile)
    }
  }

  const validateAndSetFile = (selectedFile: File) => {
    const maxSize = 1024 * 1024 * 100 // 100MB
    const allowedTypes = ["video/mp4", "video/quicktime", "video/webm", "image/jpeg", "image/png"]

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload MP4, MOV, WebM, JPG, or PNG")
      return
    }

    if (selectedFile.size > maxSize) {
      setError("File size exceeds 100MB limit")
      return
    }

    setFile(selectedFile)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!selected || !file || !caption) {
      setError("Please fill all fields and select a file")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Convert file to base64
      const reader = new FileReader()
      reader.onload = async () => {
        const base64String = reader.result as string

        const response = await fetch("/api/content/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            campaignId: selected,
            contentType,
            contentUrl: base64String,
            caption,
          }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Upload failed")
        }

        const data = await response.json()
        console.log("[v0] Content uploaded successfully:", data)

        setSuccess(true)
        setFile(null)
        setCaption("")
        setSelected("")

        // Reset success message after 3 seconds
        setTimeout(() => {
          setSuccess(false)
          router.refresh()
        }, 3000)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed"
      setError(errorMessage)
      console.error("[v0] Upload error:", err)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Upload Content</h1>
        <p className="text-muted-foreground mt-1">Submit your campaign deliverables</p>
      </div>

      {/* Success Message */}
      {success && (
        <Card className="border-green-500 bg-green-50">
          <CardContent className="pt-6 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">Content uploaded successfully!</p>
              <p className="text-sm text-green-800">Your content is under review</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="pt-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-900">{error}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Select Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selected} onValueChange={setSelected} disabled={loadingCampaigns}>
            <SelectTrigger>
              <SelectValue placeholder={loadingCampaigns ? "Loading campaigns..." : "Choose a campaign"} />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign._id} value={campaign._id}>
                  <div>
                    <p className="font-medium">{campaign.title}</p>
                    <p className="text-xs text-muted-foreground">{campaign.category}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setUploadMethod("manual")}
              className={`p-6 rounded-lg border-2 transition-all text-center ${
                uploadMethod === "manual" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="font-semibold">Manual Upload</p>
              <p className="text-sm text-muted-foreground mt-1">Upload video or image directly</p>
            </button>

            <button
              onClick={() => setUploadMethod("instagram")}
              className={`p-6 rounded-lg border-2 transition-all text-center ${
                uploadMethod === "instagram" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="font-semibold">Instagram Sync</p>
              <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {uploadMethod === "manual" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Content Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reel">Reel</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="post">Post</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  accept="video/*,image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <Cloud className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium">Click or drag files here</p>
                  <p className="text-sm text-muted-foreground mt-1">Supports MP4, MOV, WebM, JPG, PNG (max 100MB)</p>
                </label>
                {file && <p className="text-sm text-green-600 mt-3 font-medium">✓ {file.name} selected</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Caption</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write a caption for your content..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="min-h-24"
              />
            </CardContent>
          </Card>
        </>
      )}

      {uploadMethod === "instagram" && (
        <Card>
          <CardHeader>
            <CardTitle>Connect Instagram</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>
              <Instagram className="w-4 h-4 mr-2" />
              Connect Instagram Account (Coming Soon)
            </Button>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              We'll detect videos matching your campaign requirements
            </p>
          </CardContent>
        </Card>
      )}

      <Button
        size="lg"
        className="w-full"
        onClick={handleSubmit}
        disabled={isUploading || uploadMethod === "instagram"}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          "Submit Content"
        )}
      </Button>
    </div>
  )
}
