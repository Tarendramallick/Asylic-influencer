"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

const notifications = [
  { msg: "New Campaign Created", priority: "Normal", time: "2m ago" },
  { msg: "Influencer Post Verified", priority: "Low", time: "10m ago" },
  { msg: "API Limit Warning", priority: "High", time: "1h ago" },
]

export function NotificationsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select defaultValue="All" aria-label="Priority">
          <option>All</option>
          <option>High</option>
          <option>Normal</option>
          <option>Low</option>
        </Select>
        <Button variant="outline">Mark all as read</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {notifications.map((n, idx) => (
              <li key={idx} className="flex items-center justify-between rounded-md border border-border/60 p-2">
                <span>{n.msg}</span>
                <span className="text-muted-foreground">
                  {n.priority} • {n.time}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
