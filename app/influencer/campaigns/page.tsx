"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Users, TrendingUp } from "lucide-react"

const allCampaigns = [
  {
    id: 1,
    brand: "Nike",
    title: "Summer Sneakers Campaign",
    description: "Showcase our new summer sneaker collection",
    payment: 1000,
    followers: "50K-500K",
    engagement: "5%+",
    deliverables: ["Reel", "Story", "Post"],
    location: "Global",
    deadline: "2025-12-30",
    category: "Sports",
  },
  {
    id: 2,
    brand: "Coca-Cola",
    title: "Sustainability Awareness",
    description: "Create content about eco-friendly practices",
    payment: 750,
    followers: "100K-1M",
    engagement: "8%+",
    deliverables: ["Reel"],
    location: "USA",
    deadline: "2025-12-25",
    category: "Lifestyle",
  },
  {
    id: 3,
    brand: "Apple",
    title: "iPhone 16 Launch",
    description: "Feature the new iPhone 16 in creative ways",
    payment: 1500,
    followers: "200K+",
    engagement: "6%+",
    deliverables: ["Reel", "Story"],
    location: "Global",
    deadline: "2025-12-15",
    category: "Tech",
  },
  {
    id: 4,
    brand: "Starbucks",
    title: "Holiday Vibes",
    description: "Holiday season content featuring our new drinks",
    payment: 600,
    followers: "10K+",
    engagement: "Any",
    deliverables: ["Post", "Story"],
    location: "USA",
    deadline: "2025-12-20",
    category: "Food",
  },
  {
    id: 5,
    brand: "Adidas",
    title: "Fitness Challenge",
    description: "Join our 30-day fitness challenge",
    payment: 800,
    followers: "50K-500K",
    engagement: "4%+",
    deliverables: ["Reel", "Post"],
    location: "Global",
    deadline: "2026-01-15",
    category: "Sports",
  },
]

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState("all")

  const categories = ["all", "Sports", "Lifestyle", "Tech", "Food"]
  const paymentRanges = ["all", "500-750", "750-1000", "1000+"]

  const filteredCampaigns = allCampaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || campaign.category === selectedCategory
    const matchesPayment =
      selectedPayment === "all" ||
      (selectedPayment === "500-750" && campaign.payment >= 500 && campaign.payment <= 750) ||
      (selectedPayment === "750-1000" && campaign.payment > 750 && campaign.payment <= 1000) ||
      (selectedPayment === "1000+" && campaign.payment > 1000)

    return matchesSearch && matchesCategory && matchesPayment
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Discover Campaigns</h1>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search campaigns or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-100 dark:bg-slate-800 border-0"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <div className="flex gap-2">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 pt-2">Category:</span>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <div className="flex gap-2">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 pt-2">Budget:</span>
                {paymentRanges.map((range) => (
                  <Button
                    key={range}
                    variant={selectedPayment === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPayment(range)}
                  >
                    ${range}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Showing {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? "s" : ""}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-slate-600 dark:text-slate-400 text-lg">No campaigns found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function CampaignCard({ campaign }: any) {
  const [applied, setApplied] = useState(false)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{campaign.brand}</p>
            <CardTitle className="text-lg">{campaign.title}</CardTitle>
          </div>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900">${campaign.payment}</Badge>
        </div>
        <CardDescription>{campaign.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span>{campaign.followers}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <span>{campaign.engagement}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{campaign.location}</span>
          </div>
          <div className="text-slate-600 dark:text-slate-400">{campaign.deadline}</div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Deliverables</p>
          <div className="flex gap-1 flex-wrap">
            {campaign.deliverables.map((del) => (
              <Badge key={del} variant="outline" className="text-xs">
                {del}
              </Badge>
            ))}
          </div>
        </div>

        <Button onClick={() => setApplied(!applied)} className="w-full" variant={applied ? "outline" : "default"}>
          {applied ? "Withdraw Application" : "Apply Now"}
        </Button>
      </CardContent>
    </Card>
  )
}
