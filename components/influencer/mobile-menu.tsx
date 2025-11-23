"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Compass, Upload, Wallet, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const pathname = usePathname()

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/influencer",
    },
    {
      icon: Compass,
      label: "Browse Campaigns",
      href: "/influencer/campaigns",
    },
    {
      icon: Upload,
      label: "Upload Content",
      href: "/influencer/upload",
    },
    {
      icon: Wallet,
      label: "Earnings",
      href: "/influencer/earnings",
    },
    {
      icon: User,
      label: "Profile",
      href: "/influencer/profile",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              I
            </div>
            <span className="font-semibold">Creator Hub</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
