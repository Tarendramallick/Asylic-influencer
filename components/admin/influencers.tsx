"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const data = [
  { name: "fashionista_amy", followers: "210k", engagement: "3.2%", status: "Pending" },
  { name: "techguru_raj", followers: "95k", engagement: "5.1%", status: "Approved" },
  { name: "fit_life_maya", followers: "320k", engagement: "2.6%", status: "Suspended" },
]

export function InfluencersSection() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input placeholder="Search name..." aria-label="Search influencer name" />
          <Select defaultValue="all" aria-label="Filter by country">
            <option value="all">All Countries</option>
            <option value="in">India</option>
            <option value="us">USA</option>
          </Select>
          <Select defaultValue="all" aria-label="Filter by category">
            <option value="all">All Categories</option>
            <option value="fashion">Fashion</option>
            <option value="tech">Tech</option>
            <option value="fitness">Fitness</option>
          </Select>
          <Select defaultValue="any" aria-label="Status">
            <option value="any">Any Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </Select>
        </CardContent>
      </Card>

      <Card aria-label="Influencers table">
        <CardHeader>
          <CardTitle>Influencers</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="border-b border-border/60">
                <th className="py-2 pr-4">Influencer</th>
                <th className="py-2 pr-4">Followers</th>
                <th className="py-2 pr-4">Engagement</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.name} className="border-b border-border/40">
                  <td className="py-2 pr-4">{r.name}</td>
                  <td className="py-2 pr-4">{r.followers}</td>
                  <td className="py-2 pr-4">{r.engagement}</td>
                  <td className="py-2 pr-4">{r.status}</td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm" variant="success">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Suspend
                      </Button>
                      <Button size="sm" variant="outline">
                        Message
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
