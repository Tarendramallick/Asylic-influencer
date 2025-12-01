"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { ArrowUpRight, DollarSign, Megaphone, Users2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { PieChart, Pie, Cell } from "recharts"
import { useAuth } from "@/lib/auth-context"

const performanceData = [
  { day: "Mon", Impressions: 120, Clicks: 18 },
  { day: "Tue", Impressions: 160, Clicks: 24 },
  { day: "Wed", Impressions: 200, Clicks: 31 },
  { day: "Thu", Impressions: 180, Clicks: 27 },
  { day: "Fri", Impressions: 240, Clicks: 36 },
  { day: "Sat", Impressions: 220, Clicks: 33 },
  { day: "Sun", Impressions: 260, Clicks: 41 },
]

export function ClientDashboard({ className }: { className?: string }) {
  const { user, token } = useAuth()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [kpis, setKpis] = useState({
    activeCampaigns: "0",
    creatorsEngaged: "0",
    spendMtd: "$0",
    roi: "0x",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !token) {
      setIsLoading(false)
      return
    }

    const fetchCampaigns = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch("/api/campaigns", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch campaigns")
        }

        const data = await response.json()
        setCampaigns(data.campaigns || [])

        if (data.campaigns && data.campaigns.length > 0) {
          const activeCampaigns = data.campaigns.filter((c: any) => c.status === "active").length
          const totalCreators = data.campaigns.reduce((sum: number, c: any) => sum + (c.applications?.length || 0), 0)
          const totalSpend = data.campaigns.reduce((sum: number, c: any) => sum + (c.budget || 0), 0)

          setKpis({
            activeCampaigns: activeCampaigns.toString(),
            creatorsEngaged: totalCreators.toString(),
            spendMtd: `$${(totalSpend / 1000).toFixed(0)}k`,
            roi: "3.8x",
          })
        }
      } catch (error) {
        console.error("[v0] Failed to fetch campaigns:", error)
        setError("Failed to load campaigns. Please try again.")
        setCampaigns([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [user, token])

  const budgetData = campaigns.slice(0, 4).map((c) => ({
    name: c.name,
    value: c.budget || 0,
    key: c.name,
  }))

  const tableData = campaigns.slice(0, 4).map((c) => ({
    name: c.name,
    status: c.status,
    creators: (c.applications || []).length,
    budget: `$${(c.budget / 1000).toFixed(0)}k`,
  }))

  return (
    <div className={cn("grid gap-4", className)}>
      {/* Show error message if failed to load */}
      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="py-4 text-destructive">
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {/* KPIs */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Campaigns", value: kpis.activeCampaigns, icon: Megaphone },
          { label: "Creators Engaged", value: kpis.creatorsEngaged, icon: Users2 },
          { label: "Spend (MTD)", value: kpis.spendMtd, icon: DollarSign },
          { label: "ROI (Est.)", value: kpis.roi, icon: ArrowUpRight },
        ].map((k) => (
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

      {/* Performance Chart */}
      <Card>
        <CardHeader className="border-b py-4">
          <CardTitle>Weekly Performance</CardTitle>
          <CardDescription>Impressions and clicks across all active campaigns</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <ChartContainer
            config={{
              Impressions: { label: "Impressions", color: "var(--color-chart-1)" },
              Clicks: { label: "Clicks", color: "var(--color-chart-2)" },
            }}
            className="aspect-[16/6] w-full"
          >
            <ResponsiveContainer>
              <LineChart data={performanceData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line dataKey="Impressions" type="monotone" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                <Line dataKey="Clicks" type="monotone" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Budget Distribution */}
      <Card>
        <CardHeader className="border-b py-4">
          <CardTitle>Budget Distribution</CardTitle>
          <CardDescription>Spend distribution across active campaigns</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          {budgetData.length > 0 ? (
            <ChartContainer
              config={Object.fromEntries(
                budgetData.map((d) => [d.name, { label: d.name, color: "var(--color-chart-1)" }]),
              )}
              className="aspect-[16/6] w-full"
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={budgetData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                    {budgetData.map((entry, index) => (
                      <Cell key={entry.name} fill={`hsl(${(index * 360) / budgetData.length}, 70%, 60%)`} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <p className="text-muted-foreground text-center py-8">No campaigns to display</p>
          )}
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardHeader className="border-b py-4">
          <CardTitle>Active Campaigns</CardTitle>
          <CardDescription>Key initiatives running this week</CardDescription>
        </CardHeader>
        <CardContent className="py-2">
          {tableData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Creators</TableHead>
                  <TableHead>Budget</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((c) => (
                  <TableRow key={c.name}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.status}</TableCell>
                    <TableCell>{c.creators}</TableCell>
                    <TableCell>{c.budget}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>
                Showing {tableData.length} of {campaigns.length} campaigns
              </TableCaption>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              {isLoading ? "Loading campaigns..." : "No campaigns yet. Create your first campaign to get started."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
