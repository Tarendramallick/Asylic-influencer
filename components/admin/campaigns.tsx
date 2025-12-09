"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export function CampaignsSection() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/campaigns", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setCampaigns(data)
      }
    } catch (error) {
      console.error("[v0] Error fetching campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const campaignData = {
      title: formData.get("title"),
      description: formData.get("description"),
      client: formData.get("client"),
      budget: formData.get("budget"),
      category: formData.get("category"),
      status: "active",
    }

    try {
      const token = localStorage.getItem("token")
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
        fetchCampaigns()
      }
    } catch (error) {
      console.error("[v0] Error creating campaign:", error)
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      })
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCampaign} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Campaign Title</label>
                  <Input name="title" required className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea name="description" required className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Client Name</label>
                  <Input name="client" required className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Budget (₹)</label>
                    <Input name="budget" type="number" required className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select name="category" required className="mt-1">
                      <option value="fashion">Fashion</option>
                      <option value="beauty">Beauty</option>
                      <option value="tech">Technology</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="food">Food & Beverage</option>
                      <option value="fitness">Fitness</option>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create Campaign
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
                    <td className="py-2 pr-4">{campaign.title}</td>
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
