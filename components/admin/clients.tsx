"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const data = [
  { name: "UrbanWear", email: "brand@urbanwear.com", campaigns: 18, spent: "₹24L", status: "Active" },
  { name: "ByteTech", email: "hello@bytetech.io", campaigns: 9, spent: "₹11L", status: "Active" },
  { name: "GlowBeauty", email: "contact@glowbeauty.in", campaigns: 4, spent: "₹3.2L", status: "Paused" },
]

export function ClientsSection() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input placeholder="Search client..." aria-label="Search client" />
          <Select defaultValue="any" aria-label="Industry">
            <option value="any">Any Industry</option>
            <option value="fashion">Fashion</option>
            <option value="tech">Tech</option>
          </Select>
          <Select defaultValue="any" aria-label="Campaign count">
            <option value="any">Any Campaigns</option>
            <option value="gt10">{"> 10"}</option>
            <option value="lt10">{"< 10"}</option>
          </Select>
          <Select defaultValue="any" aria-label="Status">
            <option value="any">Any Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </Select>
        </CardContent>
      </Card>

      <Card aria-label="Clients table">
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="border-b border-border/60">
                <th className="py-2 pr-4">Client</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Campaigns</th>
                <th className="py-2 pr-4">Spent</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.name} className="border-b border-border/40">
                  <td className="py-2 pr-4">{r.name}</td>
                  <td className="py-2 pr-4">{r.email}</td>
                  <td className="py-2 pr-4">{r.campaigns}</td>
                  <td className="py-2 pr-4">{r.spent}</td>
                  <td className="py-2 pr-4">{r.status}</td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        Suspend
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact
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
