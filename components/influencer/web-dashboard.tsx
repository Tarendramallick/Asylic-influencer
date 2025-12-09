"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Wallet, RefreshCw } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

export function InfluencerDashboard() {
  const { user, token, setUser } = useAuth()
  const { toast } = useToast()
  const [earnings, setEarnings] = useState<any>(null)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    if (!token || !user) {
      setLoading(true)
      return
    }

    fetchData()

    // Auto-sync Instagram data every 5 minutes
    const syncInterval = setInterval(syncInstagramData, 5 * 60 * 1000)

    return () => clearInterval(syncInterval)
  }, [token, user])

  const fetchData = async () => {
    try {
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
        setEarnings(earningsData)
      }

      if (campaignsRes.ok) {
        const campaignsData = await campaignsRes.json()
        setCampaigns(Array.isArray(campaignsData) ? campaignsData.slice(0, 2) : [])
      }
    } catch (error) {
      console.error("[v0] Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const syncInstagramData = async () => {
    if (!token || syncing) return

    setSyncing(true)
    try {
      const response = await fetch("/api/user/sync-instagram", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        // Update user context with fresh data
        if (setUser && data.profile) {
          setUser((prev: any) => ({
            ...prev,
            ...data.profile,
            profile: {
              ...prev.profile,
              engagementRate: data.profile.engagementRate,
            },
          }))
        }
        toast({
          title: "Instagram data synced",
          description: "Your profile has been updated with the latest data",
        })
      }
    } catch (error) {
      console.error("[v0] Error syncing Instagram:", error)
    } finally {
      setSyncing(false)
    }
  }

  const performanceData = [
    {
      month: "Jan",
      followers: (user?.followers || 0) - 2500,
      engagement: (user?.profile?.engagementRate || 0) - 1.2,
    },
    {
      month: "Feb",
      followers: (user?.followers || 0) - 1200,
      engagement: (user?.profile?.engagementRate || 0) - 0.5,
    },
    {
      month: "Mar",
      followers: user?.followers || 0,
      engagement: user?.profile?.engagementRate || 0,
    },
  ]

  if (loading || !user?.profile) {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground mt-1">@{user.username} • Keep crushing those campaigns</p>
        </div>
        <Button variant="outline" size="sm" onClick={syncInstagramData} disabled={syncing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
          Sync Instagram
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.followers?.toLocaleString() || "—"}</div>
            <p className="text-xs text-muted-foreground">Instagram followers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Target className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.profile.engagementRate?.toFixed(2) || "—"}%</div>
            <p className="text-xs text-muted-foreground">Based on recent posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Target className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.postCount?.toLocaleString() || "—"}</div>
            <p className="text-xs text-muted-foreground">Published on Instagram</p>
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
              <div className="flex justify-between">
                <span>Following</span>
                <span className="font-semibold">{user.following?.toLocaleString() || "—"}</span>
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
