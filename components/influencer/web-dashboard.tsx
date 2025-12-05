"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Wallet } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Skeleton } from "@/components/ui/skeleton"

export function InfluencerDashboard() {
  const { user, token } = useAuth()
  const [earnings, setEarnings] = useState<any>(null)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token || !user) {
      console.log("[v0] Waiting for user data - token:", !!token, "user:", !!user)
      setLoading(true)
      return
    }

    console.log("[v0] User loaded, fetching dashboard data")
    setLoading(false)

    const fetchData = async () => {
      try {
        console.log("[v0] Fetching dashboard data with token")
        const [earningsRes, campaignsRes] = await Promise.all([
          fetch("/api/earnings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/campaigns", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        if (earningsRes.ok) {
          const earningsData = await earningsRes.json()
          console.log("[v0] Earnings fetched:", earningsData)
          setEarnings(earningsData)
        } else {
          console.error("[v0] Earnings fetch failed:", earningsRes.status)
        }

        if (campaignsRes.ok) {
          const campaignsData = await campaignsRes.json()
          console.log("[v0] Campaigns fetched:", campaignsData.length, "items")
          setCampaigns(Array.isArray(campaignsData) ? campaignsData.slice(0, 2) : [])
        } else {
          console.error("[v0] Campaigns fetch failed:", campaignsRes.status)
        }
      } catch (error) {
        console.error("[v0] Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, user])

  const performanceData = [
    { month: "Jan", followers: user?.profile?.followers || 42000, engagement: 7.2 },
    { month: "Feb", followers: (user?.profile?.followers || 42000) + 1500, engagement: 7.8 },
    { month: "Mar", followers: user?.profile?.followers || 45200, engagement: user?.profile?.engagementRate || 8.4 },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-1">Keep crushing those campaigns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(user?.profile?.followers || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+2.5% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Target className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.profile?.engagementRate || 0}%</div>
            <p className="text-xs text-muted-foreground">Avg. engagement rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Reach</CardTitle>
            <Target className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38K</div>
            <p className="text-xs text-muted-foreground">Per post</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet</CardTitle>
            <Wallet className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(earnings?.balance || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available to withdraw</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="followers" stroke="var(--primary)" name="Followers" strokeWidth={2} />
                <Line type="monotone" dataKey="engagement" stroke="var(--accent)" name="Engagement %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary to-blue-600">
          <CardHeader>
            <CardTitle className="text-white">Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <div className="text-4xl font-bold mb-6">₹{(earnings?.balance || 0).toLocaleString()}</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-semibold">₹{(earnings?.pending || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Earned</span>
                <span className="font-semibold">₹{(earnings?.totalEarned || 0).toLocaleString()}</span>
              </div>
            </div>
            <Button className="w-full mt-6 bg-white text-primary hover:bg-gray-100">Withdraw Funds</Button>
          </CardContent>
        </Card>
      </div>

      {campaigns.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Available Campaigns</CardTitle>
            <Button variant="ghost" size="sm">
              See all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((campaign: any) => (
                <div key={campaign._id} className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-1">{campaign.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-0">
                      {campaign.category}
                    </Badge>
                    <span className="font-bold text-primary">₹{campaign.budget.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
