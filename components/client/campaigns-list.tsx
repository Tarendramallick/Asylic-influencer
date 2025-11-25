"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Campaign {
  _id: string
  name: string
  status: string
  budget: number
  influencers: number
  engagement: string
  dates: string
}

export function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/campaigns")
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns")
        }
        const data = await response.json()
        console.log("[v0] Fetched campaigns:", data)
        setCampaigns(data)
      } catch (err) {
        console.error("[v0] Error fetching campaigns:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        setCampaigns([])
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading campaigns...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>
  }

  if (campaigns.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No campaigns found. Create one to get started.</div>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((c) => (
        <Card key={c._id}>
          <CardHeader className="border-b py-4">
            <CardTitle className="flex items-center justify-between">
              <span>{c.name}</span>
              <span className="text-xs font-medium text-muted-foreground">{c.status}</span>
            </CardTitle>
            <CardDescription>{c.dates}</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <div className="grid gap-1 text-sm">
              <div>Budget: ${c.budget.toLocaleString()}</div>
              <div>Influencers: {c.influencers}</div>
              <div>Engagement: {c.engagement}</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="secondary">
                View Details
              </Button>
              <Button size="sm" variant="outline">
                Pause
              </Button>
              <Button size="sm" variant="ghost">
                Duplicate
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
