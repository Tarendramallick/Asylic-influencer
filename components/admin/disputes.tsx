"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tickets = [
  { id: "T-1001", by: "UrbanWear", type: "Payment", description: "Payout delayed", status: "Open", priority: "High" },
  {
    id: "T-1002",
    by: "techguru_raj",
    type: "Content",
    description: "Approval rejected",
    status: "In Review",
    priority: "Medium",
  },
]

export function DisputesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr className="border-b border-border/60">
              <th className="py-2 pr-4">Ticket ID</th>
              <th className="py-2 pr-4">Raised By</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Description</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Priority</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b border-border/40">
                <td className="py-2 pr-4">{t.id}</td>
                <td className="py-2 pr-4">{t.by}</td>
                <td className="py-2 pr-4">{t.type}</td>
                <td className="py-2 pr-4">{t.description}</td>
                <td className="py-2 pr-4">{t.status}</td>
                <td className="py-2 pr-4">{t.priority}</td>
                <td className="py-2">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button size="sm" variant="success">
                      Resolve
                    </Button>
                    <Button size="sm" variant="destructive">
                      Escalate
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
