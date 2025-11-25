"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Report {
  period: string
  totalApplications: number
  approvedApplications: number
  rejectedApplications: number
  totalEarnings: number
  averageEarningsPerCampaign: number
}

export function PerformanceReports() {
  const [report, setReport] = useState<Report | null>(null)
  const [period, setPeriod] = useState("monthly")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchReport = async (type: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/reports?type=${type}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      if (!response.ok) throw new Error("Failed to fetch report")
      const data = await response.json()
      setReport(data)
      setPeriod(type)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load report",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const chartData = report
    ? [
        { name: "Applications", value: report.totalApplications },
        { name: "Approved", value: report.approvedApplications },
        { name: "Rejected", value: report.rejectedApplications },
      ]
    : []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Performance Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {["monthly", "quarterly", "yearly"].map((type) => (
            <Button
              key={type}
              variant={period === type ? "default" : "outline"}
              onClick={() => fetchReport(type)}
              disabled={isLoading}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>

        {report && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">₹{report.totalEarnings.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Per Campaign</p>
                <p className="text-2xl font-bold">₹{report.averageEarningsPerCampaign.toLocaleString()}</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0066cc" />
              </BarChart>
            </ResponsiveContainer>

            <Button className="w-full bg-transparent" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF Report
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
