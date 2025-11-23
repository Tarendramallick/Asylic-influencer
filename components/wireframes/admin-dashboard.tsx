"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, AlertTriangle, CreditCard, Settings, TrendingUp, Flag, CheckCircle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-900 dark:to-red-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-red-100 mt-1">Platform Operations Control Center</p>
            </div>
            <Badge className="bg-red-400 text-red-900">v1.0 • All Systems Operational</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <AdminStatsCard
            icon={<Users className="w-5 h-5" />}
            title="Total Influencers"
            value="2,847"
            change="Active: 2,103"
            color="blue"
          />
          <AdminStatsCard
            icon={<BarChart3 className="w-5 h-5" />}
            title="Total Brands"
            value="384"
            change="Verified: 361"
            color="green"
          />
          <AdminStatsCard
            icon={<TrendingUp className="w-5 h-5" />}
            title="Active Campaigns"
            value="156"
            change="₹8.5Cr in budget"
            color="purple"
          />
          <AdminStatsCard
            icon={<CreditCard className="w-5 h-5" />}
            title="Monthly Revenue"
            value="₹2.4Cr"
            change="↑ 12% from last month"
            color="emerald"
          />
        </div>

        {/* Alerts & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">23</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">12 KYCs • 8 Campaigns • 3 Payouts</p>
              <Button size="sm" className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700">
                Review Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-600 dark:text-red-400" />
                Flagged Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">3 Fraud • 2 Content • 2 Payment</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-4 w-full border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 bg-transparent"
              >
                Investigate
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Pending Payouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹45.2L</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">127 influencers awaiting payment</p>
              <Button size="sm" className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                Process Payouts
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Recent actions and statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AdminActionItem
                icon={<Users className="w-4 h-4" />}
                label="Influencer Approvals"
                count="34 pending"
                action="Review"
              />
              <AdminActionItem
                icon={<BarChart3 className="w-4 h-4" />}
                label="Brand Verification"
                count="8 pending"
                action="Verify"
              />
              <AdminActionItem
                icon={<AlertTriangle className="w-4 h-4" />}
                label="Suspicious Accounts"
                count="3 flagged"
                action="Investigate"
              />
              <AdminActionItem
                icon={<CheckCircle className="w-4 h-4" />}
                label="KYC Status"
                count="2,847 verified"
                action="View Log"
              />
            </CardContent>
          </Card>

          {/* Campaign Management */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Oversight</CardTitle>
              <CardDescription>Active campaigns and content verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AdminActionItem
                icon={<BarChart3 className="w-4 h-4" />}
                label="Active Campaigns"
                count="156 running"
                action="Monitor"
              />
              <AdminActionItem
                icon={<CheckCircle className="w-4 h-4" />}
                label="Content Verified"
                count="1,248 posts"
                action="View"
              />
              <AdminActionItem
                icon={<Flag className="w-4 h-4" />}
                label="Flagged Content"
                count="5 pending"
                action="Review"
              />
              <AdminActionItem
                icon={<AlertTriangle className="w-4 h-4" />}
                label="Disputes"
                count="2 active"
                action="Resolve"
              />
            </CardContent>
          </Card>
        </div>

        {/* Financial Control & System Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Financial Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Control</CardTitle>
              <CardDescription>Revenue and payout management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span>Total Platform Revenue</span>
                  <span className="font-bold text-lg">₹8.5Cr</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span>Influencer Payouts (Month)</span>
                  <span className="font-bold">₹45.2L</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span>Platform Commission</span>
                  <span className="font-bold">₹12.3L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pending Transactions</span>
                  <span className="font-bold">127</span>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">View Financial Reports</Button>
            </CardContent>
          </Card>

          {/* Platform Settings */}
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configuration and security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <SettingItem label="API Keys" status="Configured" action="Manage" />
                <SettingItem label="Payment Gateway" status="Active" action="Configure" />
                <SettingItem label="Email Templates" status="Updated" action="Edit" />
                <SettingItem label="Security Logs" status="102K records" action="View" />
                <SettingItem label="Backup Status" status="Latest: 2 hrs ago" action="Backup Now" />
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2 bg-transparent">
                <Settings className="w-4 h-4" /> Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function AdminStatsCard({ icon, title, value, change, color }: any) {
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

function AdminActionItem({ icon, label, count, action }: any) {
  return (
    <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
      <div className="flex items-center gap-3">
        <div className="text-slate-600 dark:text-slate-400">{icon}</div>
        <div>
          <p className="font-medium text-slate-900 dark:text-white text-sm">{label}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">{count}</p>
        </div>
      </div>
      <Button size="sm" variant="ghost" className="text-xs">
        {action}
      </Button>
    </div>
  )
}

function SettingItem({ label, status, action }: any) {
  return (
    <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
      <div>
        <p className="font-medium text-slate-900 dark:text-white text-sm">{label}</p>
        <p className="text-xs text-slate-600 dark:text-slate-400">{status}</p>
      </div>
      <Button size="sm" variant="outline" className="text-xs bg-transparent">
        {action}
      </Button>
    </div>
  )
}
