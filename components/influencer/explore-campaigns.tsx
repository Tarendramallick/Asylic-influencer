"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type Campaign = {
  id: string
  name: string
  budget: string
  deliverables: string
  hashtags: string
  type: "Reel" | "Story" | "Post"
}

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: "1", name: "XYZ Drop", budget: "₹8,000", deliverables: "1 Reel", hashtags: "#XYZDrop", type: "Reel" },
  { id: "2", name: "FitFuel", budget: "₹12,500", deliverables: "1 Story + Post", hashtags: "#FitFuel", type: "Story" },
  { id: "3", name: "TechLite", budget: "₹9,500", deliverables: "1 Reel", hashtags: "#TechLite", type: "Reel" },
]

export default function ExploreCampaigns({
  onApply,
  onSelected,
}: {
  onApply: (id: string) => void
  onSelected: (id: string) => void
}) {
  const [applied, setApplied] = useState<Record<string, "none" | "pending" | "selected">>({
    "1": "none",
    "2": "none",
    "3": "none",
  })

  function apply(id: string) {
    setApplied((s) => ({ ...s, [id]: "pending" }))
    onApply(id)
    // Simulate selection
    setTimeout(() => {
      setApplied((s) => ({ ...s, [id]: "selected" }))
      onSelected(id)
    }, 1200)
  }

  return (
    <div className="space-y-3">
      {MOCK_CAMPAIGNS.map((c) => {
        const status = applied[c.id]
        return (
          <Card key={c.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {c.deliverables} • {c.type} • {c.hashtags}
                </p>
              </div>
              <div className="text-right">
                <div className="font-semibold">{c.budget}</div>
                {status === "none" ? (
                  <Button className="mt-2" size="sm" onClick={() => apply(c.id)}>
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
