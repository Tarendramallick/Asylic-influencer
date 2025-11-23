"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  { name: "Graph API", status: "Active" },
  { name: "Database", status: "Active" },
  { name: "Payment Gateway", status: "Active" },
  { name: "Auto DM Service", status: "Warning" },
]

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Active"
      ? "bg-green-500/20 text-green-700 dark:text-green-300"
      : status === "Warning"
        ? "bg-yellow-500/20 text-yellow-800 dark:text-yellow-200"
        : "bg-red-500/20 text-red-800 dark:text-red-200"
  return <span className={`px-2 py-0.5 rounded text-xs ${color}`}>{status}</span>
}

export function SystemHealthSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <Card key={s.name}>
          <CardHeader>
            <CardTitle>{s.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Uptime: 99.9%</div>
            <StatusBadge status={s.status} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
