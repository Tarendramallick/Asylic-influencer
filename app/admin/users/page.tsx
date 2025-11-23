"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, CheckCircle, XCircle } from "lucide-react"

const pendingInfluencers = [
  { id: 1, username: "@creator_001", followers: "150K", engagement: "8.2%", status: "pending", date: "2 hours ago" },
  { id: 2, username: "@lifestyle_guru", followers: "250K", engagement: "6.5%", status: "pending", date: "1 hour ago" },
  { id: 3, username: "@tech_reviewer", followers: "500K", engagement: "7.1%", status: "pending", date: "30 min ago" },
]

const pendingBrands = [
  { id: 1, name: "TechStart Inc", industry: "Tech", status: "pending", date: "1 day ago" },
  { id: 2, name: "Fashion Forward", industry: "Fashion", status: "pending", date: "6 hours ago" },
  { id: 3, name: "Green Living Co", industry: "Sustainability", status: "pending", date: "3 hours ago" },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [approvedInfluencers, setApprovedInfluencers] = useState<any[]>([])
  const [approvedBrands, setApprovedBrands] = useState<any[]>([])

  const handleApproveInfluencer = (id: number) => {
    const influencer = pendingInfluencers.find((i) => i.id === id)
    if (influencer) {
      setApprovedInfluencers([...approvedInfluencers, influencer])
      // Remove from pending in real app
    }
  }

  const handleRejectInfluencer = (id: number) => {
    // Handle rejection
  }

  const handleApproveBrand = (id: number) => {
    const brand = pendingBrands.find((b) => b.id === id)
    if (brand) {
      setApprovedBrands([...approvedBrands, brand])
      // Remove from pending in real app
    }
  }

  const handleRejectBrand = (id: number) => {
    // Handle rejection
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">User Management</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-100 dark:bg-slate-800 border-0"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="pending-influencers" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending-influencers">Pending Influencers</TabsTrigger>
            <TabsTrigger value="pending-brands">Pending Brands</TabsTrigger>
            <TabsTrigger value="approved-influencers">Approved Influencers</TabsTrigger>
            <TabsTrigger value="approved-brands">Approved Brands</TabsTrigger>
          </TabsList>

          {/* Pending Influencers */}
          <TabsContent value="pending-influencers" className="space-y-4">
            {pendingInfluencers.map((influencer) => (
              <Card key={influencer.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{influencer.username}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {influencer.followers} followers • {influencer.engagement} engagement
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Applied {influencer.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveInfluencer(influencer.id)}
                        className="bg-green-600 hover:bg-green-700 gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectInfluencer(influencer.id)}
                        className="gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Pending Brands */}
          <TabsContent value="pending-brands" className="space-y-4">
            {pendingBrands.map((brand) => (
              <Card key={brand.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{brand.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{brand.industry}</p>
                      <p className="text-xs text-slate-500 mt-1">Applied {brand.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveBrand(brand.id)}
                        className="bg-green-600 hover:bg-green-700 gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleRejectBrand(brand.id)} className="gap-1">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Approved Influencers */}
          <TabsContent value="approved-influencers" className="space-y-4">
            {approvedInfluencers.length > 0 ? (
              approvedInfluencers.map((influencer) => (
                <Card key={influencer.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{influencer.username}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {influencer.followers} followers • {influencer.engagement} engagement
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900">Approved</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-slate-600 dark:text-slate-400">
                  No approved influencers yet
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Approved Brands */}
          <TabsContent value="approved-brands" className="space-y-4">
            {approvedBrands.length > 0 ? (
              approvedBrands.map((brand) => (
                <Card key={brand.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{brand.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{brand.industry}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900">Approved</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-slate-600 dark:text-slate-400">
                  No approved brands yet
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
