"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

type Campaign = {
  _id: string
  title: string
  budget: number
  description: string
  category: string
  deliverables: string[]
  hashtags: string[]
  requirements: any
}

export default function ExploreCampaigns() {
  const { token } = useAuth()
  const { toast } = useToast()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [applied, setApplied] = useState<Record<string, "none" | "pending" | "selected">>({})

  useEffect(() => {
    if (!token) return

    fetchCampaigns()
  }, [token])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setCampaigns(data.slice(0, 10))
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

  const apply = async (id: string) => {
    setApplied((s) => ({ ...s, [id]: "pending" }))

    try {
      const response = await fetch(`/api/campaigns/${id}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setApplied((s) => ({ ...s, [id]: "selected" }))
        toast({
          title: "Success",
          description: "Application submitted successfully!",
        })
      } else {
        setApplied((s) => ({ ...s, [id]: "none" }))
        toast({
          title: "Error",
          description: "Failed to apply to campaign",
          variant: "destructive",
        })
      }
    } catch (error) {
      setApplied((s) => ({ ...s, [id]: "none" }))
      toast({
        title: "Error",
        description: "Failed to apply to campaign",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No campaigns available at the moment</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {campaigns.map((c) => {
        const status = applied[c._id] || "none"
        return (
          <Card key={c._id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{c.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {c.category} • {c.deliverables?.join(", ")}
                </p>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{c.budget.toLocaleString()}</div>
                {status === "none" ? (
                  <Button className="mt-2" size="sm" onClick={() => apply(c._id)}>
                    Apply
                  </Button>
                ) : status === "pending" ? (
                  <span className="mt-2 inline-block text-xs text-muted-foreground">Pending...</span>
                ) : (
                  <span className="mt-2 inline-block text-xs text-primary">Selected!</span>
                )}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
