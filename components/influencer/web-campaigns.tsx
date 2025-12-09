"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Zap } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

const categories = ["All", "Travel", "Fitness", "Tech", "Fashion", "Lifestyle", "Beauty", "Food"]

export function BrowseCampaigns() {
  const { token } = useAuth()
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    fetchCampaigns()
  }, [token, selectedCategory])

  const fetchCampaigns = async () => {
    setLoading(true)
    try {
      const url =
        selectedCategory === "All" ? "/api/campaigns" : `/api/campaigns?category=${selectedCategory.toLowerCase()}`

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setCampaigns(data)
      }
    } catch (error) {
      console.error("[v0] Error fetching campaigns:", error)
      toast({
        title: "Error",
        description: "Failed to load campaigns",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (campaignId: string) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Application submitted successfully!",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to apply",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply to campaign",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Browse Campaigns</h1>
        <p className="text-muted-foreground mt-1">{campaigns.length} campaigns available for you</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="whitespace-nowrap"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Campaigns Grid */}
      {campaigns.length === 0 ? (
        <Card className="p-6">
          <p className="text-center text-muted-foreground">No campaigns found in this category</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign._id} className="overflow-hidden flex flex-col">
              <div className="relative h-40 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                {campaign.image ? (
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary/30">{campaign.title.charAt(0)}</span>
                  </div>
                )}
              </div>

              <CardContent className="pt-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground">{campaign.brandName || "Brand"}</p>
                  </div>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {campaign.category}
                  </Badge>
                </div>

                <p className="text-sm text-foreground mb-4 flex-1 line-clamp-2">{campaign.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">₹{campaign.budget.toLocaleString()}</span>
                  </div>

                  {campaign.deadline && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
                    </div>
                  )}

                  {campaign.deliverables && campaign.deliverables.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Deliverables:</p>
                      <div className="flex flex-wrap gap-1">
                        {campaign.deliverables.map((d: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {d}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {campaign.hashtags && campaign.hashtags.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Hashtags:</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {campaign.hashtags.map((h: string) => `#${h}`).join(" ")}
                      </p>
                    </div>
                  )}
                </div>

                <Button className="w-full" onClick={() => handleApply(campaign._id)}>
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
