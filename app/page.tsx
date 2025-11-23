"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, BarChart3, Users, Shield, TrendingUp, Smartphone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">InfluenceHub</div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Sign In
            </Button>
            <Button onClick={() => router.push("/login")}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Trusted by 10,000+ creators worldwide</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
            Connect Brands with <span className="text-primary">Perfect Influencers</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Asylic.in is the complete influencer marketing platform that connects brands with authentic creators.
            Automate campaigns, manage content, and scale your influence effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="gap-2" onClick={() => router.push("/login?role=influencer")}>
              Join as Influencer <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent"
              onClick={() => router.push("/login?role=brand")}
            >
              Launch Campaign <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-20 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-border p-12 text-center">
          <div className="w-full h-96 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Platform Dashboard Preview</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose InfluenceHub?</h2>
          <p className="text-lg text-muted-foreground">Everything you need for successful influencer marketing</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Smart Matching"
            description="AI-powered algorithm matches brands with influencers based on audience alignment and engagement metrics."
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Real-Time Analytics"
            description="Track campaign performance with comprehensive analytics, ROI metrics, and detailed engagement reports."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Automation"
            description="Automate content scheduling, post verification, and payment processing to save time and reduce errors."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Secure Platform"
            description="Enterprise-grade security with verified users, secure payments, and protected intellectual property."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Campaign Management"
            description="Create, manage, and monitor campaigns from start to finish with intuitive tools and workflows."
          />
          <FeatureCard
            icon={<Smartphone className="w-8 h-8" />}
            title="Mobile Friendly"
            description="Manage your campaigns and content on the go with our responsive mobile-first design."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Simple, seamless collaboration in three steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Brands Create Campaigns</h3>
            <p className="text-muted-foreground">
              Set your goals, budget, and target audience. Our AI finds the perfect influencers.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Influencers Apply</h3>
            <p className="text-muted-foreground">
              Review opportunities and apply to campaigns that match your brand and audience.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Collaborate & Earn</h3>
            <p className="text-muted-foreground">
              Create content, get verified posts, and earn money. Automated payments guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">For influencers, brands, and enterprises</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            title="Influencer"
            price="Free"
            description="For individual creators"
            features={["Unlimited applications", "Portfolio management", "Earnings dashboard", "Auto post tracking"]}
          />
          <PricingCard
            title="Brand Pro"
            price="$299"
            period="/month"
            description="For growing brands"
            features={[
              "5 concurrent campaigns",
              "Analytics dashboard",
              "Influencer search",
              "Content review tools",
              "Priority support",
            ]}
            highlighted
          />
          <PricingCard
            title="Enterprise"
            price="Custom"
            description="For large organizations"
            features={[
              "Unlimited campaigns",
              "Advanced analytics",
              "Dedicated account manager",
              "API access",
              "24/7 support",
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of brands and influencers already using InfluenceHub to create authentic connections and
            drive real results.
          </p>
          <Button size="lg" variant="secondary" className="gap-2" onClick={() => router.push("/login")}>
            Start Your Free Trial <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">InfluenceHub</h3>
              <p className="text-sm text-muted-foreground">Connecting brands with authentic influencers worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    For Influencers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    For Brands
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 Asylic.in. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-foreground">
                Twitter
              </Link>
              <Link href="#" className="hover:text-foreground">
                LinkedIn
              </Link>
              <Link href="#" className="hover:text-foreground">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  highlighted,
}: { title: string; price: string; period?: string; description: string; features: string[]; highlighted?: boolean }) {
  return (
    <Card className={`${highlighted ? "border-primary ring-1 ring-primary/20 scale-105" : ""}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground">{period}</span>}
        </div>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                ✓
              </div>
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full" variant={highlighted ? "default" : "outline"}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}
