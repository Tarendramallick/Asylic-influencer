"use client"

import { useState } from "react"
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
import { BarChart3, Users2, Megaphone, FileText, CreditCard, Settings, LogOut } from "lucide-react"
import type * as React from "react"
import { CreateCampaignDialog } from "@/components/client/create-campaign"

interface SearchResult {
  id: string
  name?: string
  title?: string
  type: string
}

export function ClientShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)

  const nav = [
    { label: "Dashboard", icon: BarChart3, href: "/client" },
    { label: "Campaigns", icon: Megaphone, href: "/client/campaigns" },
    { label: "Applications", icon: Users2, href: "/client/applications" },
    { label: "Analytics", icon: FileText, href: "/client/analytics" },
    { label: "Payments", icon: CreditCard, href: "/client/payments" },
    { label: "Settings", icon: Settings, href: "/client/settings" },
  ]

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length < 2) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    try {
      // Search both clients and weblinks
      const [clientsRes, weblinksRes] = await Promise.all([
        fetch(`/api/search/clients?q=${encodeURIComponent(query)}`),
        fetch(`/api/search/weblinks?q=${encodeURIComponent(query)}`),
      ])

      const clients = await clientsRes.json()
      const weblinks = await weblinksRes.json()

      setSearchResults([...clients, ...weblinks])
      setShowResults(true)
    } catch (error) {
      console.error("[v0] Search error:", error)
      setSearchResults([])
    }
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="px-2 py-2">
          <div className="flex items-center gap-2 px-2">
            <div className="size-6 rounded-md bg-primary" aria-hidden />
            <span className="font-semibold">InfluencePro</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Client</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href={item.href} aria-label={item.label} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <div className="px-2 pb-2">
            <a href="/client/support" className="text-sm text-muted-foreground hover:underline">
              Support
            </a>
          </div>
          <Button variant="ghost" className="justify-start">
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
            <h1 className="text-balance text-lg font-semibold">Client Portal</h1>
            <div className="ml-auto flex items-center gap-2 relative">
              <div className="relative">
                <Input
                  placeholder="Search campaigns or clients..."
                  className="h-9 w-56"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => searchResults.length > 0 && setShowResults(true)}
                />
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="px-3 py-2 hover:bg-muted cursor-pointer text-sm border-b last:border-b-0"
                      >
                        <div className="font-medium">{result.name || result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.type}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <CreateCampaignDialog />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
