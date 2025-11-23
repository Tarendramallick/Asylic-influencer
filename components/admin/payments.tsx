"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

const rows = [
  {
    date: "2025-10-01",
    client: "UrbanWear",
    influencer: "fashionista_amy",
    campaign: "Diwali Drop 2025",
    amount: "₹50,000",
    status: "Pending",
  },
  {
    date: "2025-10-02",
    client: "ByteTech",
    influencer: "techguru_raj",
    campaign: "ByteTech Launch",
    amount: "₹35,000",
    status: "Completed",
  },
  {
    date: "2025-10-03",
    client: "GlowBeauty",
    influencer: "fit_life_maya",
    campaign: "GlowBeauty Festive",
    amount: "₹20,000",
    status: "Failed",
  },
]

export function PaymentsSection() {
  const [status, setStatus] = useState("All")

  const filtered = rows.filter((r) => (status === "All" ? true : r.status === status))

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Collected</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">₹1.2 Cr</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Paid</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">₹92 L</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Platform Commission</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">₹28 L</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transactions</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
                <option>All</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Failed</option>
                <option>Refunds</option>
              </Select>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="border-b border-border/60">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Client</th>
                <th className="py-2 pr-4">Influencer</th>
                <th className="py-2 pr-4">Campaign</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => (
                <tr key={idx} className="border-b border-border/40">
                  <td className="py-2 pr-4">{r.date}</td>
                  <td className="py-2 pr-4">{r.client}</td>
                  <td className="py-2 pr-4">{r.influencer}</td>
                  <td className="py-2 pr-4">{r.campaign}</td>
                  <td className="py-2 pr-4">{r.amount}</td>
                  <td className="py-2 pr-4">{r.status}</td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="success">
                        Mark as Paid
                      </Button>
                      <Button size="sm" variant="outline">
                        Retry
                      </Button>
                      <Button size="sm" variant="outline">
                        Invoice
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
