"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const growthData = [
  { day: "Mon", value: 24000 },
  { day: "Tue", value: 25000 },
  { day: "Wed", value: 25200 },
  { day: "Thu", value: 25400 },
  { day: "Fri", value: 25500 },
  { day: "Sat", value: 25650 },
  { day: "Sun", value: 25800 },
]

export default function DashboardOverview({
  onViewVerification,
  onOpenMessages,
  onOpenEarnings,
  onOpenTasks,
}: {
  onViewVerification: () => void
  onOpenMessages: () => void
  onOpenEarnings: () => void
  onOpenTasks: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total Reach" value="25.8K" />
        <StatCard label="Engagement" value="4.6%" />
      </div>

      <Card className="p-4">
        <h3 className="font-semibold">Follower Growth</h3>
        <div className="h-32 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                fontSize={12}
              />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Recent Earnings</h3>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </div>
          <div className="text-right">
            <div className="font-semibold">₹18,250</div>
            <div className="text-xs text-muted-foreground">+12% MoM</div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold">Quick Actions</h3>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Button variant="secondary" size="sm" onClick={onOpenMessages}>
            Messages
          </Button>
          <Button variant="secondary" size="sm" onClick={onOpenEarnings}>
            Earnings
          </Button>
          <Button variant="secondary" size="sm" onClick={onOpenTasks}>
            Checklist
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Upcoming Posts</h3>
            <p className="text-sm text-muted-foreground">2 scheduled this week</p>
          </div>
          <Button variant="default" onClick={onViewVerification}>
            View status
          </Button>
        </div>
      </Card>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </Card>
  )
}
