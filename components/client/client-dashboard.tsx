"use client"

import type React from "react"

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

interface KPI {
  label: string
  value: string
  icon?: React.ComponentType<any>
}

interface Campaign {
  name: string
  status: string
  creators: number
  budget: string
}

interface PerformanceData {
  day: string
  Impressions: number
  Clicks: number
}

const defaultKpis: KPI[] = [
  { label: "Active Campaigns", value: "—", icon: Megaphone },
  { label: "Creators Engaged", value: "—", icon: Users2 },
  { label: "Spend (MTD)", value: "—", icon: DollarSign },
  { label: "ROI (Est.)", value: "—", icon: ArrowUpRight },
]

export function ClientDashboard({ className }: { className?: string }) {
  const [kpis, setKpis] = useState<KPI[]>(defaultKpis)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [budgetData, setBudgetData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const analyticsRes = await fetch("/api/analytics/campaigns")
        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json()
          setKpis(
            analyticsData.kpis.map((k: any, idx: number) => ({
              ...k,
              icon: defaultKpis[idx]?.icon,
            })),
          )
          setCampaigns(analyticsData.campaigns)
          setBudgetData(
            analyticsData.campaigns.map((c: any) => ({
              name: c.name,
              value: Number.parseInt(c.budget.replace(/[^\d]/g, "")) * 1000,
              key: c.name,
            })),
          )
        }

        // Fetch engagement data
        const engagementRes = await fetch("/api/analytics/engagement")
        if (engagementRes.ok) {
          const engagementData = await engagementRes.json()
          // Generate performance data from engagement
          setPerformanceData(
            engagementData.map((e: any) => ({
              day: e.day,
              Impressions: e.Reach,
              Clicks: e.Engagements,
            })),
          )
        }
      } catch (error) {
        console.error("[v0] Error loading dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>
  }

  return (
    <div className={cn("grid gap-4", className)}>
      {/* KPIs */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader className="flex items-center justify-between gap-2 border-b py-4">
              <CardTitle className="text-sm">{k.label}</CardTitle>
              {k.icon && <k.icon className="size-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-2xl font-semibold">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Performance Chart */}
      {performanceData.length > 0 && (
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
                  <Line
                    dataKey="Impressions"
                    type="monotone"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line dataKey="Clicks" type="monotone" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Budget Distribution */}
      {budgetData.length > 0 && (
        <Card>
          <CardHeader className="border-b py-4">
            <CardTitle>Budget Distribution</CardTitle>
            <CardDescription>Spend distribution across active campaigns</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <ChartContainer
              config={budgetData.reduce((acc: any, item: any) => {
                acc[item.name] = { label: item.name, color: `var(--color-chart-${budgetData.indexOf(item) + 1})` }
                return acc
              }, {})}
              className="aspect-[16/6] w-full"
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={budgetData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                    {budgetData.map((entry: any) => (
                      <Cell key={entry.name} fill={`var(--color-chart-${budgetData.indexOf(entry) + 1})`} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Campaigns Table */}
      {campaigns.length > 0 && (
        <Card>
          <CardHeader className="border-b py-4">
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Key initiatives running this week</CardDescription>
          </CardHeader>
          <CardContent className="py-2">
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
                {campaigns.map((c) => (
                  <TableRow key={c.name}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.status}</TableCell>
                    <TableCell>{c.creators}</TableCell>
                    <TableCell>{c.budget}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>Showing {campaigns.length} campaigns</TableCaption>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
