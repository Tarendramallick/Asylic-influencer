"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PromotionUpload({ onUploaded }: { onUploaded: () => void }) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) setFileName(f.name)
  }

  function handleUpload() {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      onUploaded()
    }, 1200)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold">Submit Promotion</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Upload your reel/story for brand review or post with tags to auto-verify.
        </p>
        <div className="mt-3 grid gap-3">
          <Input type="file" accept="video/*,image/*" onChange={handleSelect} />
          {fileName ? <div className="text-xs text-muted-foreground">Selected: {fileName}</div> : null}
          <Button onClick={handleUpload} disabled={!fileName || isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-accent text-accent-foreground">
        <h4 className="font-medium">Auto-Verification</h4>
        <ul className="text-sm mt-1 list-disc pl-5">
          <li>
            Use hashtag: <span className="font-medium">#XYZDrop</span>
          </li>
          <li>
            Mention: <span className="font-medium">@xyzbrand</span>
          </li>
          <li>Ensure post is Public and on schedule</li>
        </ul>
      </Card>
    </div>
  )
}
