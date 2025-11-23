"use client"

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

const kpis = [
  { label: "Active Campaigns", value: "24", icon: Megaphone },
  { label: "Creators Engaged", value: "1,342", icon: Users2 },
  { label: "Spend (MTD)", value: "$128k", icon: DollarSign },
  { label: "ROI (Est.)", value: "3.8x", icon: ArrowUpRight },
]

const performanceData = [
  { day: "Mon", Impressions: 120, Clicks: 18 },
  { day: "Tue", Impressions: 160, Clicks: 24 },
  { day: "Wed", Impressions: 200, Clicks: 31 },
  { day: "Thu", Impressions: 180, Clicks: 27 },
  { day: "Fri", Impressions: 240, Clicks: 36 },
  { day: "Sat", Impressions: 220, Clicks: 33 },
  { day: "Sun", Impressions: 260, Clicks: 41 },
]

const campaigns = [
  { name: "Fall Launch", status: "Live", creators: 54, budget: "$45,000" },
  { name: "Back-to-School", status: "Planning", creators: 12, budget: "$12,500" },
  { name: "Holiday Teaser", status: "Review", creators: 28, budget: "$22,100" },
  { name: "UGC Sprint", status: "Live", creators: 77, budget: "$60,000" },
]

const budgetData = [
  { name: "Fall Launch", value: 45000, key: "Fall Launch" },
  { name: "Back-to-School", value: 12500, key: "Back-to-School" },
  { name: "Holiday Teaser", value: 22100, key: "Holiday Teaser" },
  { name: "UGC Sprint", value: 60000, key: "UGC Sprint" },
]

export function ClientDashboard({ className }: { className?: string }) {
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
          <ChartContainer
            config={{
              "Fall Launch": { label: "Fall Launch", color: "var(--color-chart-1)" },
              "Back-to-School": { label: "Back-to-School", color: "var(--color-chart-2)" },
              "Holiday Teaser": { label: "Holiday Teaser", color: "var(--color-chart-3)" },
              "UGC Sprint": { label: "UGC Sprint", color: "var(--color-chart-4)" },
            }}
            className="aspect-[16/6] w-full"
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie data={budgetData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                  {budgetData.map((entry) => (
                    <Cell key={entry.name} fill={`var(--color-${entry.key.replaceAll(" ", "\\ ")})`} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
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
            <TableCaption>Showing 4 of 24 campaigns</TableCaption>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
