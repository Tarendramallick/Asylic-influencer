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
import { Users2, Megaphone, CheckCircle2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const kpis = [
  { label: "Total Campaigns", value: "1,245", icon: Megaphone },
  { label: "Total Influencers", value: "15,870", icon: Users2 },
  { label: "Active Clients", value: "322", icon: Users2 },
  { label: "Pending Verifications", value: "34", icon: CheckCircle2 },
]

const revenueData = [
  { month: "Jan", Revenue: 520 },
  { month: "Feb", Revenue: 610 },
  { month: "Mar", Revenue: 700 },
  { month: "Apr", Revenue: 640 },
  { month: "May", Revenue: 780 },
  { month: "Jun", Revenue: 820 },
]

const approvals = [
  { id: "REQ-1941", type: "Content Review", owner: "Acme Co.", status: "Pending" },
  { id: "REQ-1942", type: "Payment Release", owner: "Nova Labs", status: "Pending" },
  { id: "REQ-1943", type: "Creator Onboarding", owner: "GreenLeaf", status: "Escalated" },
  { id: "REQ-1944", type: "Ad Copy Check", owner: "Acme Co.", status: "Pending" },
]

export function AdminDashboard({ className }: { className?: string }) {
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
              <BarChart data={revenueData} margin={{ left: 12, right: 12 }}>
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

      {/* Approvals Queue */}
      <Card>
        <CardHeader className="border-b py-4">
          <CardTitle>Approvals Queue</CardTitle>
          <CardDescription>Items requiring admin attention</CardDescription>
        </CardHeader>
        <CardContent className="py-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>Showing 4 of 18 pending approvals</TableCaption>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
