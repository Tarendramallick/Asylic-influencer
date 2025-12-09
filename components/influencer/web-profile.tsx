"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Edit, LinkIcon, RefreshCw } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

export function InfluencerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const { user, token, setUser } = useAuth()
  const [syncing, setSyncing] = useState(false)
  const { toast } = useToast()
  const [earnings, setEarnings] = useState<any>(null)
  const [completedCampaigns, setCompletedCampaigns] = useState(0)

  useEffect(() => {
    if (token) {
      fetchEarningsData()
    }
  }, [token])

  const fetchEarningsData = async () => {
    try {
      const response = await fetch("/api/earnings", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setEarnings(data)
        setCompletedCampaigns(data.completedCampaigns || 0)
      }
    } catch (error) {
      console.error("[v0] Error fetching earnings:", error)
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
          title: "Profile synced",
          description: "Your Instagram data has been updated",
        })
      }
    } catch (error) {
      console.error("[v0] Error syncing Instagram:", error)
    } finally {
      setSyncing(false)
    }
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-48" />
      </div>
    )
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button variant="outline" size="sm" onClick={syncInstagramData} disabled={syncing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
          Sync Instagram
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center flex-1">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={
                    user.profile?.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
                  }
                />
                <AvatarFallback>{user.name?.slice(0, 2).toUpperCase() || "IN"}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.name || "Influencer"}</h2>
                <p className="text-muted-foreground">@{user.username || "username"}</p>
                <p className="mt-2 text-sm">{user.profile?.bio || "No bio available"}</p>
                <div className="flex gap-6 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Followers</p>
                    <p className="font-bold text-lg">{user.followers?.toLocaleString() || "0"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                    <p className="font-bold text-lg">{user.profile?.engagementRate?.toFixed(2) || "0"}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Posts</p>
                    <p className="font-bold text-lg">{user.postCount?.toLocaleString() || "0"}</p>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Instagram Connected</p>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-0">
                  Connected
                </Badge>
              </div>

              {user.profile?.website && (
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <LinkIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Website</p>
                      <p className="text-sm text-muted-foreground">{user.profile.website}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Instagram data is automatically synced. Use the "Sync Instagram" button to update your profile with
                  the latest information from Instagram.
                </p>
                <Button onClick={syncInstagramData} disabled={syncing} className="w-full">
                  {syncing ? "Syncing..." : "Sync Now"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">₹{(earnings?.totalEarned || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Campaigns Completed</p>
                <p className="text-2xl font-bold">{completedCampaigns}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium">{memberSince}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="w-full justify-center py-2 text-center">
                {user.verified ? "✓ Verified" : "⏳ Pending"}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
