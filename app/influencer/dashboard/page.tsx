"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LogOut, TrendingUp, DollarSign, CheckCircle, Clock } from "lucide-react"

// Sample data
const campaigns = [
  {
    id: 1,
    brand: "Nike",
    title: "Summer Collection Campaign",
    payment: 500,
    deliverables: "Reel, Story, Post",
    deadline: "2025-12-30",
    status: "applied",
  },
  {
    id: 2,
    brand: "Coca-Cola",
    title: "Sustainable Living",
    payment: 750,
    deliverables: "3 Reels",
    deadline: "2025-12-25",
    status: "pending",
  },
  {
    id: 3,
    brand: "Apple",
    title: "Product Launch",
    payment: 1000,
    deliverables: "Reel + Story",
    deadline: "2025-12-15",
    status: "approved",
  },
]

const approvedCampaigns = campaigns.filter((c) => c.status === "approved")
const appliedCampaigns = campaigns.filter((c) => c.status === "applied")

export default function InfluencerDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    localStorage.removeItem("user_role")
    localStorage.removeItem("user_email")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Influencer Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">Welcome back, @influencer_user</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Clock className="w-5 h-5" />} label="Applied" value="8" color="blue" />
          <StatCard icon={<CheckCircle className="w-5 h-5" />} label="Approved" value="3" color="green" />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Completed" value="12" color="purple" />
          <StatCard icon={<DollarSign className="w-5 h-5" />} label="Earnings" value="$4,250" color="amber" />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Complete your profile to attract more campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Username</p>
                    <p className="font-semibold">@influencer_user</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Followers</p>
                    <p className="font-semibold">125,450</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Engagement Rate</p>
                    <p className="font-semibold">8.5%</p>
                  </div>
                  <Button className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    Browse Campaigns
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    Upload Content
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    View Messages
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    Withdraw Earnings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </TabsContent>

          {/* Applied Tab */}
          <TabsContent value="applied" className="space-y-6">
            <div className="space-y-4">
              {appliedCampaigns.length > 0 ? (
                appliedCampaigns.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-slate-600 dark:text-slate-400">
                    No applied campaigns yet
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Uploads Tab */}
          <TabsContent value="uploads" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {approvedCampaigns.map((campaign) => (
                <UploadCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Earnings</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">$4,250</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">$1,500</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Withdrawn</p>
                    <p className="text-2xl font-bold text-green-600">$2,750</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Payment History</h3>
                  <div className="space-y-3">
                    {[
                      { date: "Dec 15", amount: "$500", status: "Completed" },
                      { date: "Dec 8", amount: "$750", status: "Completed" },
                      { date: "Dec 1", amount: "$1,000", status: "Completed" },
                    ].map((payment, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded"
                      >
                        <div>
                          <p className="font-semibold">{payment.date}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{payment.status}</p>
                        </div>
                        <p className="font-semibold">{payment.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Request Withdrawal</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: any) {
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400",
    purple: "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400",
    amber: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
  }

  return (
    <Card className={colors[color]}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-75">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="opacity-20">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function CampaignCard({ campaign }: any) {
  const statusColors = {
    applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{campaign.brand}</p>
            <h3 className="text-lg font-semibold">{campaign.title}</h3>
          </div>
          <Badge className={statusColors[campaign.status]}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div>
            <p className="text-slate-600 dark:text-slate-400">Payment</p>
            <p className="font-semibold">${campaign.payment}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400">Deliverables</p>
            <p className="font-semibold text-xs">{campaign.deliverables}</p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400">Deadline</p>
            <p className="font-semibold">{campaign.deadline}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {campaign.status === "applied" && <Button className="flex-1">View Details</Button>}
          {campaign.status === "approved" && <Button className="flex-1">Upload Content</Button>}
          {campaign.status === "pending" && (
            <Button disabled className="flex-1">
              Pending Review
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function UploadCard({ campaign }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{campaign.title}</CardTitle>
        <CardDescription>{campaign.brand}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Reel Upload</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900">Uploaded</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Story Upload</span>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900">Pending</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Post Upload</span>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900">Pending</Badge>
          </div>
        </div>
        <Button className="w-full">Upload Content</Button>
      </CardContent>
    </Card>
  )
}
