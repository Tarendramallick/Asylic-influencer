"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlyData = [
  { month: "Sep", campaigns: 45, applications: 320, payments: 28500 },
  { month: "Oct", campaigns: 62, applications: 445, payments: 42300 },
  { month: "Nov", campaigns: 88, applications: 612, payments: 58900 },
  { month: "Dec", campaigns: 142, applications: 920, payments: 89700 },
]

const categoryData = [
  { name: "Sports", value: 35, color: "#3b82f6" },
  { name: "Lifestyle", value: 28, color: "#8b5cf6" },
  { name: "Tech", value: 22, color: "#ec4899" },
  { name: "Food", value: 15, color: "#f59e0b" },
]

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"]

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Analytics & Reports</h1>
          <p className="text-slate-600 dark:text-slate-400">Platform performance metrics and insights</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Revenue</p>
              <p className="text-3xl font-bold">$847K</p>
              <p className="text-xs text-green-600 mt-2">+23% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Active Campaigns</p>
              <p className="text-3xl font-bold">142</p>
              <p className="text-xs text-blue-600 mt-2">+61% growth</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Completed Posts</p>
              <p className="text-3xl font-bold">2.4K</p>
              <p className="text-xs text-purple-600 mt-2">89% approval rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Avg Engagement</p>
              <p className="text-3xl font-bold">7.2%</p>
              <p className="text-xs text-amber-600 mt-2">+1.2% improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Campaigns, applications, and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="campaigns" fill="#3b82f6" />
                  <Bar dataKey="applications" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Distribution</CardTitle>
              <CardDescription>By category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly payment processing</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="payments" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Influencers</CardTitle>
              <CardDescription>By campaign applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "@lifestyle_guru", apps: 24, campaigns: 8 },
                  { name: "@fitness_expert", apps: 19, campaigns: 6 },
                  { name: "@tech_reviewer", apps: 16, campaigns: 5 },
                  { name: "@fashion_icon", apps: 12, campaigns: 4 },
                  { name: "@food_blogger", apps: 9, campaigns: 3 },
                ].map((influencer, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                    <div>
                      <p className="font-semibold">{influencer.name}</p>
                      <p className="text-xs text-slate-500">{influencer.apps} applications</p>
                    </div>
                    <Badge>{influencer.campaigns} campaigns</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Brands</CardTitle>
              <CardDescription>By campaign spend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Nike", spent: "$89,500", campaigns: 12 },
                  { name: "Apple", spent: "$76,200", campaigns: 10 },
                  { name: "Coca-Cola", spent: "$54,300", campaigns: 8 },
                  { name: "Adidas", spent: "$42,100", campaigns: 6 },
                  { name: "Starbucks", spent: "$28,900", campaigns: 4 },
                ].map((brand, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                    <div>
                      <p className="font-semibold">{brand.name}</p>
                      <p className="text-xs text-slate-500">{brand.campaigns} campaigns</p>
                    </div>
                    <p className="font-semibold">{brand.spent}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
