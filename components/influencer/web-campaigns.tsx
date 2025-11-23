"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Zap } from "lucide-react"

const categories = ["All", "Travel", "Fitness", "Tech", "Fashion", "Lifestyle"]

const campaigns = [
  {
    id: 1,
    title: "TravelGear Pro",
    subtitle: "Summer Adventure Series 2024",
    description: "Showcase our latest travel backpack in real-world adventure scenarios",
    image: "/travel-adventure-backpack.jpg",
    brand: "TravelGear",
    payment: 15000,
    daysLeft: 8,
    deliverables: ["1 Reel", "2 Stories", "Carousel Post"],
    hashtags: ["#TravelGearPro", "#AdventureReady"],
    category: "Travel",
  },
  {
    id: 2,
    title: "Nike Summer",
    subtitle: "Athletic Lifestyle Campaign",
    description: "Feature Nike shoes in your daily fitness routine",
    image: "/nike-athletic-shoes.jpg",
    brand: "Nike",
    payment: 12000,
    daysLeft: 15,
    deliverables: ["2 Reels", "1 Post"],
    hashtags: ["#NikeSummer", "#AthleticStyle"],
    category: "Fitness",
  },
  {
    id: 3,
    title: "Apple Tech Series",
    subtitle: "Product Showcase",
    description: "Create content featuring latest Apple products",
    image: "/apple-tech-products.jpg",
    brand: "Apple",
    payment: 20000,
    daysLeft: 12,
    deliverables: ["1 Video", "3 Stories"],
    hashtags: ["#AppleTech", "#Innovation"],
    category: "Tech",
  },
]

export function BrowseCampaigns() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filtered = selectedCategory === "All" ? campaigns : campaigns.filter((c) => c.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Browse Campaigns</h1>
        <p className="text-muted-foreground mt-1">{filtered.length} campaigns available for you</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="whitespace-nowrap"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden flex flex-col">
            <div className="relative h-40 bg-muted overflow-hidden">
              <img
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="pt-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg">{campaign.title}</h3>
                  <p className="text-sm text-muted-foreground">{campaign.subtitle}</p>
                </div>
                <Badge variant="outline" className="ml-2 shrink-0">
                  {campaign.category}
                </Badge>
              </div>

              <p className="text-sm text-foreground mb-4 flex-1">{campaign.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">₹{campaign.payment}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>{campaign.daysLeft} days left</span>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Deliverables:</p>
                  <div className="flex flex-wrap gap-1">
                    {campaign.deliverables.map((d) => (
                      <Badge key={d} variant="secondary" className="text-xs">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Hashtags:</p>
                  <p className="text-xs text-muted-foreground">{campaign.hashtags.join(" ")}</p>
                </div>
              </div>

              <Button className="w-full">Apply Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
