"use client"

import type React from "react"

import { useState } from "react"
import { InfluencerNav } from "@/components/influencer/web-nav"
import { InfluencerSidebar } from "@/components/influencer/web-sidebar"
import { MobileMenu } from "@/components/influencer/mobile-menu"

export default function InfluencerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <InfluencerSidebar className="hidden lg:flex" />

      {/* Mobile Menu */}
      <MobileMenu open={sidebarOpen} onOpenChange={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <InfluencerNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
