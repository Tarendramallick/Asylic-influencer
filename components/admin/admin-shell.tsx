"use client"

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users2,
  Megaphone,
  CheckCircle2,
  FileText,
  Settings,
  LogOut,
  Wallet,
  Bell,
  Activity,
  Flag,
  ScrollText,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type * as React from "react"

export function AdminShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()
  const router = useRouter()

  const nav = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Influencers", icon: Users2, href: "/admin/influencers" },
    { label: "Clients", icon: Building2, href: "/admin/clients" },
    { label: "Campaigns", icon: Megaphone, href: "/admin/campaigns" },
    { label: "Verification", icon: CheckCircle2, href: "/admin/verification" },
    { label: "Payments", icon: Wallet, href: "/admin/payments" },
    { label: "Reports", icon: FileText, href: "/admin/reports" },
    { label: "Disputes", icon: Flag, href: "/admin/disputes" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
    { label: "System Logs", icon: ScrollText, href: "/admin/system-logs" },
    { label: "Notifications", icon: Bell, href: "/admin/notifications" },
    { label: "System Health", icon: Activity, href: "/admin/system-health" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("auth_user")
    router.push("/login")
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="px-2 py-2">
          <div className="flex items-center gap-2 px-2">
            <div className="size-6 rounded-md bg-primary" aria-hidden />
            <span className="font-semibold">InfluencePro Admin</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href} aria-label={item.label} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <Button variant="ghost" className="justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset className={cn("min-h-svh", className)}>
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3">
            <SidebarTrigger />
            <h1 className="text-balance text-lg font-semibold">Admin Dashboard</h1>
            <div className="ml-auto flex items-center gap-2">
              <Input placeholder="Search…" className="h-9 w-56" aria-label="Search" />
              <Button size="sm" variant="outline">
                Invite Admin
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
