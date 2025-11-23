"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, CheckCircle, Clock, Plus, ChevronRight } from "lucide-react"

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Nike Campaign Hub</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage your influencer partnerships</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" /> New Campaign
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ClientStatsCard
            icon={<BarChart3 className="w-5 h-5" />}
            title="Active Campaigns"
            value="8"
            change="2 launching soon"
            color="blue"
          />
          <ClientStatsCard
            icon={<Users className="w-5 h-5" />}
            title="Influencers"
            value="142"
            change="45 pending review"
            color="green"
          />
          <ClientStatsCard
            icon={<CheckCircle className="w-5 h-5" />}
            title="Completed"
            value="34"
            change="All verified"
            color="emerald"
          />
          <ClientStatsCard
            icon={<Clock className="w-5 h-5" />}
            title="Budget Spent"
            value="₹28.5L"
            change="65% of monthly"
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Campaigns currently accepting applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CampaignManagementCard
                  title="Summer Shorts Launch"
                  status="Active"
                  applications="23"
                  approved="8"
                  budget="₹4,00,000"
                  progress={65}
                />
                <CampaignManagementCard
                  title="Fall Fashion Collection"
                  status="Active"
                  applications="18"
                  approved="6"
                  budget="₹3,50,000"
                  progress={45}
                />
                <CampaignManagementCard
                  title="Winter Essentials"
                  status="Review"
                  applications="5"
                  approved="2"
                  budget="₹2,50,000"
                  progress={25}
                />
              </CardContent>
            </Card>

            {/* Content Pending Review */}
            <Card>
              <CardHeader>
                <CardTitle>Content Pending Review</CardTitle>
                <CardDescription>Influencer uploads waiting for approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ContentReviewItem
                  influencer="@sarah_fashion"
                  campaign="Summer Shorts"
                  type="Reel (45s)"
                  status="Pending"
                  followers="85K"
                />
                <ContentReviewItem
                  influencer="@mike.travels"
                  campaign="Fall Fashion"
                  type="Story"
                  status="Pending"
                  followers="142K"
                />
                <ContentReviewItem
                  influencer="@emma_vibes"
                  campaign="Summer Shorts"
                  type="Post + Caption"
                  status="Changes Requested"
                  followers="62K"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ApplicationCard
                  influencer="Aisha Sharma"
                  followers="127K"
                  engagement="4.8%"
                  category="Fashion"
                  status="approve"
                />
                <ApplicationCard
                  influencer="Rohan Kumar"
                  followers="89K"
                  engagement="3.2%"
                  category="Lifestyle"
                  status="review"
                />
                <ApplicationCard
                  influencer="Priya Singh"
                  followers="156K"
                  engagement="5.1%"
                  category="Fashion"
                  status="approve"
                />
                <Button variant="outline" className="w-full text-blue-600 dark:text-blue-400 bg-transparent">
                  View All Applications <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Analytics Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 mb-1">Avg Engagement</p>
                    <p className="text-2xl font-bold">4.2%</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 mb-1">Verified Posts</p>
                    <p className="text-2xl font-bold">34/34</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 mb-1">Success Rate</p>
                    <p className="text-2xl font-bold">98%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClientStatsCard({ icon, title, value, change, color }: any) {
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400",
    emerald:
      "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400",
    orange:
      "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400",
  }

  return (
    <Card className={`border-2 ${colors[color]}`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            <p className="text-xs opacity-70 mt-1">{change}</p>
          </div>
          <div className="opacity-50">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function CampaignManagementCard({ title, status, applications, approved, budget, progress }: any) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
          <p className="text-xs text-slate-500 mt-1">{budget}</p>
        </div>
        <Badge variant={status === "Active" ? "default" : "outline"}>{status}</Badge>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">Applications</p>
          <p className="font-bold">{applications}</p>
        </div>
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">Approved</p>
          <p className="font-bold">{approved}</p>
        </div>
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">Budget Used</p>
          <p className="font-bold">{progress}%</p>
        </div>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

function ContentReviewItem({ influencer, campaign, type, status, followers }: any) {
  const statusColor =
    status === "Pending"
      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"
      : "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200"

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-800/50">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{influencer}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {campaign} • {followers}
          </p>
        </div>
        <Badge className={statusColor}>{status}</Badge>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400">{type}</p>
    </div>
  )
}

function ApplicationCard({ influencer, followers, engagement, category, status }: any) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-800/50">
      <p className="font-semibold text-sm text-slate-900 dark:text-white">{influencer}</p>
      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
        {followers} • {engagement} engagement
      </p>
      <div className="flex items-center justify-between mt-2">
        <Badge variant="outline" className="text-xs">
          {category}
        </Badge>
        {status === "approve" && (
          <Button size="sm" className="h-6 bg-green-600 hover:bg-green-700 text-xs">
            Approve
          </Button>
        )}
        {status === "review" && (
          <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
            Review
          </Button>
        )}
      </div>
    </div>
  )
}
