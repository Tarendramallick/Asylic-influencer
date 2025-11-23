"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, CheckCircle2, DollarSign, Plus, Search, Filter } from "lucide-react"

export default function InfluencerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome, Sarah!</h1>
            <p className="text-slate-600 dark:text-slate-400">Your influencer dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-500">PRO • 45.2K followers</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<Plus className="w-5 h-5" />}
            title="Applied"
            value="12"
            change="+2 this week"
            color="blue"
          />
          <StatsCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            title="Approved"
            value="8"
            change="2 active"
            color="green"
          />
          <StatsCard
            icon={<TrendingUp className="w-5 h-5" />}
            title="Completed"
            value="34"
            change="₹2,45,000 earned"
            color="purple"
          />
          <StatsCard
            icon={<DollarSign className="w-5 h-5" />}
            title="Available Balance"
            value="₹45,000"
            change="Withdraw anytime"
            color="emerald"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Browse Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Browse Campaigns</CardTitle>
                <CardDescription>Find opportunities that match your niche</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <Search className="w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search campaigns..."
                        className="bg-transparent outline-none w-full text-sm"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Campaign Cards */}
                  <CampaignCard
                    brand="Nike"
                    title="Summer Shorts Campaign"
                    budget="₹50,000"
                    followers="50K+"
                    deadline="5 days"
                    applied={false}
                  />
                  <CampaignCard
                    brand="Zara"
                    title="Fall Fashion Drop"
                    budget="₹35,000"
                    followers="30K+"
                    deadline="10 days"
                    applied={true}
                  />
                  <CampaignCard
                    brand="Starbucks"
                    title="Coffee Week Campaign"
                    budget="₹25,000"
                    followers="Any"
                    deadline="3 days"
                    applied={false}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Approved Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Approved Campaigns</CardTitle>
                <CardDescription>Content waiting for your upload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <ApprovedCampaignItem
                    brand="Apple"
                    title="iOS 18 Launch"
                    status="Upload Pending"
                    deadline="2 days"
                    reward="₹60,000"
                  />
                  <ApprovedCampaignItem
                    brand="Samsung"
                    title="Galaxy S24 Review"
                    status="Scheduled"
                    deadline="Posting Tomorrow"
                    reward="₹45,000"
                  />
                  <ApprovedCampaignItem
                    brand="Amazon"
                    title="Prime Day Fashion"
                    status="Posted"
                    deadline="Completed"
                    reward="₹35,000"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span>Nike Campaign Posted</span>
                    <span className="font-bold">+₹50,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span>Adidas Reel</span>
                    <span className="font-bold">+₹35,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span>Samsung Story</span>
                    <span className="font-bold">+₹25,000</span>
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">Withdraw ₹45,000</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ icon, title, value, change, color }: any) {
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400",
    purple:
      "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400",
    emerald:
      "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400",
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

function CampaignCard({ brand, title, budget, followers, deadline, applied }: any) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-slate-400 dark:hover:border-slate-600 transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Badge variant="outline" className="mb-2">
            {brand}
          </Badge>
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">Budget</p>
          <p className="font-bold text-slate-900 dark:text-white">{budget}</p>
        </div>
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">Min Followers</p>
          <p className="font-bold text-slate-900 dark:text-white">{followers}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {deadline}
        </span>
        <Button
          size="sm"
          variant={applied ? "outline" : "default"}
          className={applied ? "" : "bg-purple-600 hover:bg-purple-700"}
        >
          {applied ? "Applied" : "Apply"}
        </Button>
      </div>
    </div>
  )
}

function ApprovedCampaignItem({ brand, title, status, deadline, reward }: any) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-800/50">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {brand} - {title}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{status}</p>
        </div>
        <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200">{reward}</Badge>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
        <Clock className="w-3 h-3" /> {deadline}
      </p>
    </div>
  )
}
