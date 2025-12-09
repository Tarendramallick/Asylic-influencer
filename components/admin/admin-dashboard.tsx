"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { Users2, Megaphone, CheckCircle2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

export function AdminDashboard({ className }: { className?: string }) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("[v0] Error fetching admin stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  const kpis = [
    { label: "Total Campaigns", value: stats?.totalCampaigns?.toLocaleString() || "0", icon: Megaphone },
    { label: "Total Influencers", value: stats?.totalInfluencers?.toLocaleString() || "0", icon: Users2 },
    { label: "Active Clients", value: stats?.totalClients?.toLocaleString() || "0", icon: Users2 },
    { label: "Pending Verifications", value: stats?.pendingVerifications?.toLocaleString() || "0", icon: CheckCircle2 },
  ]

  return (
    <div className={cn("grid gap-4", className)}>
      {/* KPIs */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader className="flex items-center justify-between gap-2 border-b py-4">
              <CardTitle className="text-sm">{k.label}</CardTitle>
              <k.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-2xl font-semibold">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Revenue Chart */}
      <Card>
        <CardHeader className="border-b py-4">
          <CardTitle>Revenue (Last 6 Months)</CardTitle>
          <CardDescription>Aggregated billings across all clients</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <ChartContainer
            config={{
              Revenue: { label: "Revenue", color: "var(--color-chart-3)" },
            }}
            className="aspect-[16/6] w-full"
          >
            <ResponsiveContainer>
              <BarChart data={stats?.revenueData || []} margin={{ left: 12, right: 12 }}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="Revenue" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
