"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LogOut, Users, Building2, TrendingUp, AlertCircle, DollarSign } from "lucide-react"

export default function AdminDashboard() {
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
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">Platform Management & Control</p>
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <StatCard icon={<Users className="w-5 h-5" />} label="Total Influencers" value="2,450" color="blue" />
          <StatCard icon={<Building2 className="w-5 h-5" />} label="Total Brands" value="580" color="green" />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Active Campaigns" value="142" color="purple" />
          <StatCard icon={<DollarSign className="w-5 h-5" />} label="Total Revenue" value="$847K" color="amber" />
          <StatCard icon={<AlertCircle className="w-5 h-5" />} label="Pending Reviews" value="23" color="red" />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="influencers">Influencers</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>System status and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>API Status</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900">Operational</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900">Healthy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Storage</span>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900">85% Used</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Backup</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    View All Influencers
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    View All Brands
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    Approve Pending KYC
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    System Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex justify-between items-center pb-4 border-b last:border-0">
                      <div>
                        <p className="font-semibold">Influencer {item} KYC Submitted</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">5 minutes ago</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900">Review</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Influencers Tab */}
          <TabsContent value="influencers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Influencer Management</CardTitle>
                <CardDescription>Verify and manage influencer accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((inf) => (
                    <div key={inf} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">@influencer_{inf}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">125K followers • Status: Pending</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Approve</Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Management</CardTitle>
                <CardDescription>Manage brand accounts and verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Nike", "Coca-Cola", "Apple", "Samsung"].map((brand) => (
                    <div key={brand} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{brand}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Verified • Active Campaigns: 3</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Monitoring</CardTitle>
                <CardDescription>Review and manage all campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Summer Collection", brand: "Nike", status: "active" },
                    { title: "Product Launch", brand: "Apple", status: "active" },
                    { title: "Sustainability", brand: "Coca-Cola", status: "completed" },
                  ].map((camp, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{camp.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">By {camp.brand}</p>
                      </div>
                      <Badge
                        className={
                          camp.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900"
                        }
                      >
                        {camp.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Manage payouts and billing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Pending Payouts</p>
                      <p className="text-2xl font-bold">$12,450</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Paid</p>
                      <p className="text-2xl font-bold">$234,890</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Platform Commission</p>
                      <p className="text-2xl font-bold">$42,380</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[1, 2, 3].map((pay) => (
                      <div
                        key={pay}
                        className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-800 rounded"
                      >
                        <div>
                          <p className="font-semibold">Payout Request #{pay}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">@influencer_{pay}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Approve</Button>
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure system settings and integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Commission Rate (%)</label>
                  <input
                    type="number"
                    defaultValue="15"
                    className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Minimum Payout ($)</label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Instagram API Key</label>
                  <input
                    type="password"
                    defaultValue="••••••••••••••"
                    className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                <Button className="w-full">Save Settings</Button>
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
    red: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400",
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
