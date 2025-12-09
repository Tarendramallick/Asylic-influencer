"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export function CampaignsSection() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch("/api/admin/campaigns", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setCampaigns(data)
      } else {
        console.error("[v0] Failed to fetch campaigns:", response.status, response.statusText)
        toast({
          title: "Error",
          description: "Failed to load campaigns. Please check your authentication.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error fetching campaigns:", error)
      toast({
        title: "Error",
        description: "Failed to connect to the server",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        })
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleAddCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)

    try {
      const formData = new FormData(e.currentTarget)

      let imageUrl = ""
      if (imageFile) {
        // Use the preview which is already base64
        imageUrl = imagePreview || ""
      }

      const campaignData = {
        title: formData.get("title"),
        description: formData.get("description"),
        client: formData.get("client"),
        budget: formData.get("budget"),
        category: formData.get("category"),
        image: imageUrl,
        status: "active",
      }

      const token = localStorage.getItem("auth_token")
      const response = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      })

      if (response.ok) {
        toast({
          title: "Campaign created",
          description: "The campaign has been successfully added",
        })
        setIsDialogOpen(false)
        setImagePreview(null)
        setImageFile(null)
        ;(e.target as HTMLFormElement).reset()
        fetchCampaigns()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create campaign")
      }
    } catch (error) {
      console.error("[v0] Error creating campaign:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create campaign",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return <Skeleton className="h-96" />
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Campaigns Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Fill in the campaign details below to create a new marketing campaign.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCampaign} className="space-y-4">
                <div>
                  <Label htmlFor="title">Campaign Title</Label>
                  <Input id="title" name="title" required className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required className="mt-1" rows={4} />
                </div>

                <div>
                  <Label htmlFor="image">Campaign Image</Label>
                  <div className="mt-2">
                    {imagePreview ? (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Campaign preview"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={handleRemoveImage}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Click to upload campaign image</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="client">Client Name</Label>
                  <Input id="client" name="client" required className="mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Budget (₹)</Label>
                    <Input id="budget" name="budget" type="number" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select category</option>
                      <option value="fashion">Fashion</option>
                      <option value="beauty">Beauty</option>
                      <option value="tech">Technology</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="food">Food & Beverage</option>
                      <option value="fitness">Fitness</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? "Creating..." : "Create Campaign"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      <Card aria-label="Campaigns table">
        <CardHeader>
          <CardTitle>All Campaigns ({campaigns.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {campaigns.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No campaigns yet. Create one to get started!</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr className="border-b border-border/60">
                  <th className="py-2 pr-4">Campaign</th>
                  <th className="py-2 pr-4">Client</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Budget</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2">Applied</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign._id} className="border-b border-border/40">
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        {campaign.image && (
                          <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={campaign.image || "/placeholder.svg"}
                              alt={campaign.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span>{campaign.title}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4">{campaign.client}</td>
                    <td className="py-2 pr-4 capitalize">{campaign.category}</td>
                    <td className="py-2 pr-4">₹{campaign.budget.toLocaleString()}</td>
                    <td className="py-2 pr-4 capitalize">{campaign.status}</td>
                    <td className="py-2">{campaign.influencersApplied?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
