"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const rows = [
  { name: "Diwali Drop 2025", client: "UrbanWear", influencers: 24, budget: "₹12L", status: "Active" },
  { name: "ByteTech Launch", client: "ByteTech", influencers: 12, budget: "₹8L", status: "Pending Review" },
  { name: "GlowBeauty Festive", client: "GlowBeauty", influencers: 16, budget: "₹6L", status: "Paused" },
]

export function CampaignsSection() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <Select defaultValue="any" aria-label="Status filter">
            <option value="any">Any Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Completed">Completed</option>
          </Select>
          <Select defaultValue="any" aria-label="Client filter">
            <option value="any">Any Client</option>
            <option value="UrbanWear">UrbanWear</option>
            <option value="ByteTech">ByteTech</option>
          </Select>
          <Select defaultValue="recent" aria-label="Sort by">
            <option value="recent">Most Recent</option>
            <option value="budget">Budget</option>
          </Select>
        </CardContent>
      </Card>

      <Card aria-label="Campaigns table">
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="border-b border-border/60">
                <th className="py-2 pr-4">Campaign</th>
                <th className="py-2 pr-4">Client</th>
                <th className="py-2 pr-4">Influencers</th>
                <th className="py-2 pr-4">Budget</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-b border-border/40">
                  <td className="py-2 pr-4">{r.name}</td>
                  <td className="py-2 pr-4">{r.client}</td>
                  <td className="py-2 pr-4">{r.influencers}</td>
                  <td className="py-2 pr-4">{r.budget}</td>
                  <td className="py-2 pr-4">{r.status}</td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Pause
                      </Button>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                      <Button size="sm" variant="outline">
                        Resync Hashtags
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
