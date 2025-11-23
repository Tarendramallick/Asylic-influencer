"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Target, BarChart3, Smartphone, Users, Lock, TrendingUp } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-xl text-foreground">Asylic.in</div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="text-foreground hover:bg-accent" onClick={() => router.push("/login")}>
              Sign In
            </Button>
            <Button
              className="bg-primary hover:opacity-90 text-primary-foreground"
              onClick={() => router.push("/login")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Trusted by 10,000+ creators</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight">
              Connect with Perfect <span className="text-primary">Influencers</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Asylic.in is the complete influencer marketing platform connecting brands with authentic creators.
              Automate campaigns, manage content, and scale your influence effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-primary hover:opacity-90 text-primary-foreground h-12 px-8"
                onClick={() => router.push("/login?role=influencer")}
              >
                Join as Influencer <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 bg-transparent"
                onClick={() => router.push("/login?role=brand")}
              >
                Sign in as Brand
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Smart Matching</div>
                  <div className="text-sm text-muted-foreground">Find perfect brand partnerships</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Real-time Analytics</div>
                  <div className="text-sm text-muted-foreground">Track campaign performance live</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Auto Verification</div>
                  <div className="text-sm text-muted-foreground">Instant content verification</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground">All-in-one platform for influencer marketing success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Smart Campaign Discovery",
                desc: "AI-powered matching algorithm finds your perfect brand partnerships",
              },
              {
                icon: Users,
                title: "Influencer Network",
                desc: "Connect with 10,000+ verified creators across all niches",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                desc: "Track earnings, engagement, and performance in real-time",
              },
              {
                icon: Lock,
                title: "Secure Payments",
                desc: "Safe, verified payment processing with multiple withdrawal options",
              },
              {
                icon: TrendingUp,
                title: "Content Management",
                desc: "Schedule posts and auto-detect content from Instagram",
              },
              {
                icon: Smartphone,
                title: "Mobile Optimized",
                desc: "Full-featured platform optimized for mobile and desktop",
              },
            ].map((feature, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Card className="bg-gradient-to-r from-primary to-blue-700 border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Grow Your Influence?</h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of influencers and brands already using Asylic.in to scale their business.
            </p>
            <Button
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold h-12 px-8"
              onClick={() => router.push("/login")}
            >
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border text-muted-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
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
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
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
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
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
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm">
            <p>&copy; 2025 Asylic.in. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
