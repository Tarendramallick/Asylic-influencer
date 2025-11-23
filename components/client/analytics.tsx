"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const kpis = [
  { label: "Total Reach", value: "2.4M" },
  { label: "Engagement Rate", value: "5.6%" },
  { label: "Avg. CPC", value: "₹4.10" },
  { label: "Influencer Index", value: "87" },
]

const engagementData = [
  { day: "Mon", Reach: 200, Engagements: 18 },
  { day: "Tue", Reach: 260, Engagements: 22 },
  { day: "Wed", Reach: 300, Engagements: 25 },
  { day: "Thu", Reach: 280, Engagements: 20 },
  { day: "Fri", Reach: 350, Engagements: 29 },
  { day: "Sat", Reach: 320, Engagements: 24 },
  { day: "Sun", Reach: 380, Engagements: 31 },
]

const topInfluencers = [
  { name: "Aarav", Score: 92 },
  { name: "Priya", Score: 88 },
  { name: "Rohan", Score: 85 },
  { name: "Ishita", Score: 82 },
  { name: "Dev", Score: 80 },
]

export function AnalyticsView() {
  return (
    <div className="grid gap-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fall">Fall Launch</SelectItem>
            <SelectItem value="b2s">Back-to-School</SelectItem>
            <SelectItem value="ugc">UGC Sprint</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Compare with" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="holiday">Holiday Teaser</SelectItem>
          </SelectContent>
        </Select>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" onClick={() => console.log("[v0] Export CSV")}>
            Export CSV
          </Button>
          <Button onClick={() => console.log("[v0] Export PDF")}>Export PDF</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader className="border-b py-4">
              <CardTitle className="text-sm">{k.label}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-2xl font-semibold">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement over time */}
      <Card>
        <CardHeader className="border-b py-4">
          <CardTitle>Engagement Over Time</CardTitle>
          <CardDescription>Reach vs Engagements</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <ChartContainer
            config={{
              Reach: { label: "Reach", color: "var(--color-chart-1)" },
              Engagements: { label: "Engagements", color: "var(--color-chart-2)" },
            }}
            className="aspect-[16/6] w-full"
          >
            <ResponsiveContainer>
              <LineChart data={engagementData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line dataKey="Reach" type="monotone" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                <Line dataKey="Engagements" type="monotone" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top influencers */}
      <Card>
        <CardHeader className="border-b py-4">
          <CardTitle>Top Influencers</CardTitle>
          <CardDescription>Performance score</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <ChartContainer
            config={{ Score: { label: "Score", color: "var(--color-chart-3)" } }}
            className="aspect-[16/6] w-full"
          >
            <ResponsiveContainer>
              <BarChart data={topInfluencers}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="Score" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
