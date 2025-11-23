"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const campaigns = [
  {
    name: "Fall Launch",
    status: "Active",
    budget: 45000,
    influencers: 54,
    engagement: "5.3%",
    dates: "Sep 1 - Oct 15",
  },
  { name: "Back-to-School", status: "Draft", budget: 12500, influencers: 12, engagement: "—", dates: "TBD" },
  {
    name: "Holiday Teaser",
    status: "Paused",
    budget: 22100,
    influencers: 28,
    engagement: "4.1%",
    dates: "Nov 10 - Dec 5",
  },
  {
    name: "UGC Sprint",
    status: "Completed",
    budget: 60000,
    influencers: 77,
    engagement: "6.0%",
    dates: "Aug 1 - Sep 1",
  },
]

export function CampaignsList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((c) => (
        <Card key={c.name}>
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
