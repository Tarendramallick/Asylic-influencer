"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Compass, Upload, Wallet, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface InfluencerSidebarProps {
  className?: string
}

export function InfluencerSidebar({ className }: InfluencerSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/influencer",
      active: pathname === "/influencer",
    },
    {
      icon: Compass,
      label: "Browse Campaigns",
      href: "/influencer/campaigns",
      active: pathname === "/influencer/campaigns",
    },
    {
      icon: Upload,
      label: "Upload Content",
      href: "/influencer/upload",
      active: pathname === "/influencer/upload",
    },
    {
      icon: Wallet,
      label: "Earnings",
      href: "/influencer/earnings",
      active: pathname === "/influencer/earnings",
    },
    {
      icon: User,
      label: "Profile",
      href: "/influencer/profile",
      active: pathname === "/influencer/profile",
    },
  ]

  return (
    <div className={cn("w-64 bg-sidebar border-r border-sidebar-border p-6 flex flex-col", className)}>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
          I
        </div>
        <span className="font-semibold text-sidebar-foreground">Creator Hub</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent",
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  )
}
