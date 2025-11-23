"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LogOut, Users, TrendingUp, DollarSign, Plus } from "lucide-react"

const campaigns = [
  {
    id: 1,
    title: "Summer Collection Campaign",
    budget: 5000,
    applicants: 12,
    approved: 3,
    deadline: "2025-12-30",
    status: "active",
  },
  {
    id: 2,
    title: "Product Launch",
    budget: 8000,
    applicants: 25,
    approved: 5,
    deadline: "2025-12-15",
    status: "active",
  },
  {
    id: 3,
    title: "Brand Awareness",
    budget: 3500,
    applicants: 8,
    approved: 2,
    deadline: "2025-12-25",
    status: "completed",
  },
]

export default function ClientDashboard() {
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
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Brand Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">Campaign Management & Analytics</p>
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
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Active Campaigns" value="2" color="blue" />
          <StatCard icon={<Users className="w-5 h-5" />} label="Total Influencers" value="10" color="green" />
          <StatCard icon={<DollarSign className="w-5 h-5" />} label="Budget Spent" value="$16,500" color="purple" />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Completed" value="1" color="amber" />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>Your brand information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Business Name</p>
                    <p className="font-semibold">Nike Inc.</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Industry</p>
                    <p className="font-semibold">Sports & Apparel</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Website</p>
                    <p className="font-semibold">nike.com</p>
                  </div>
                  <Button className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Plus className="w-4 h-4" />
                    Create Campaign
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    View Applications
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    Review Content
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Campaign
            </Button>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{campaign.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Budget: ${campaign.budget}</p>
                      </div>
                      <Badge
                        className={
                          campaign.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Applicants</p>
                        <p className="font-semibold text-lg">{campaign.applicants}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Approved</p>
                        <p className="font-semibold text-lg">{campaign.approved}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Deadline</p>
                        <p className="font-semibold">{campaign.deadline}</p>
                      </div>
                      <div>
                        <Button className="w-full">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((app) => (
                <Card key={app}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">@influencer_{app}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">125K followers • 8.5% engagement</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Approve</Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="space-y-4">
              {[1, 2, 3].map((content) => (
                <Card key={content}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">Campaign: Summer Collection</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Uploaded by @influencer_1</p>
                        <p className="text-sm mt-2">Reel • Story • Post</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Review</Button>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900">Pending</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Reach</span>
                      <span className="font-semibold">2.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engagements</span>
                      <span className="font-semibold">187K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate</span>
                      <span className="font-semibold">7.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI</span>
                      <span className="font-semibold">340%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Budget</span>
                      <span className="font-semibold">$20,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spent</span>
                      <span className="font-semibold">$16,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining</span>
                      <span className="font-semibold">$3,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost per Engagement</span>
                      <span className="font-semibold">$0.088</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
