"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cloud, Instagram } from "lucide-react"

const campaigns = [
  { id: 1, name: "Nike", subtitle: "Summer Collection" },
  { id: 2, name: "Starbucks", subtitle: "Coffee Campaign" },
  { id: 3, name: "Apple", subtitle: "Tech Series" },
]

export function UploadContent() {
  const [selected, setSelected] = useState<string>("")
  const [uploadMethod, setUploadMethod] = useState<"manual" | "instagram">("manual")

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Upload Content</h1>
        <p className="text-muted-foreground mt-1">Submit your campaign deliverables</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a campaign" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id.toString()}>
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground">{campaign.subtitle}</p>
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
              <p className="text-sm text-muted-foreground mt-1">Upload video directly</p>
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
              <p className="text-sm text-muted-foreground mt-1">Auto-detect from Instagram</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {uploadMethod === "manual" && (
        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Cloud className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium">Click or drag files here</p>
              <p className="text-sm text-muted-foreground mt-1">Supports MP4, MOV, WebM (max 1GB)</p>
            </div>
          </CardContent>
        </Card>
      )}

      {uploadMethod === "instagram" && (
        <Card>
          <CardHeader>
            <CardTitle>Connect Instagram</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Instagram className="w-4 h-4 mr-2" />
              Connect Instagram Account
            </Button>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              We'll detect videos matching your campaign requirements
            </p>
          </CardContent>
        </Card>
      )}

      <Button size="lg" className="w-full">
        Submit Content
      </Button>
    </div>
  )
}
