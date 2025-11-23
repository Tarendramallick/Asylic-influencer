"use client"

import { Menu, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface InfluencerNavProps {
  onMenuClick: () => void
}

export function InfluencerNav({ onMenuClick }: InfluencerNavProps) {
  return (
    <nav className="border-b border-border bg-card sticky top-0 z-40">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Mobile Menu */}
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>

        {/* Logo */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            I
          </div>
          <span className="font-semibold text-foreground">Creator Hub</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-auto">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>

          <Avatar className="w-8 h-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}
