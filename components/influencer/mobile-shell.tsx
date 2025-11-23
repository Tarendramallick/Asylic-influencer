"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Home, Search, Calendar, Upload, User2, Bell } from "lucide-react"
import LoginOnboarding from "./login-onboarding"
import DashboardOverview from "./dashboard-overview"
import ProfileAnalytics from "./profile-analytics"
import ExploreCampaigns from "./explore-campaigns"
import Schedule from "./schedule"
import PromotionUpload from "./promotion-upload"
import Verification from "./verification"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Messages from "./messages"
import Earnings from "./earnings"
import Tasks from "./tasks"

type TabKey = "home" | "explore" | "schedule" | "upload" | "profile"

export default function InfluencerApp() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [tab, setTab] = useState<TabKey>("home")

  // Simulate a selection state; in a real app, this would come from API
  const [hasSelection, setHasSelection] = useState(false)
  const [hasVerified, setHasVerified] = useState(false)

  const [showMessages, setShowMessages] = useState(false)
  const [showEarnings, setShowEarnings] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showTasks, setShowTasks] = useState(false)

  const Title = () => {
    const titleMap: Record<TabKey, string> = {
      home: "Dashboard",
      explore: "Explore Campaigns",
      schedule: "Schedule",
      upload: "Upload",
      profile: "Profile",
    }
    return titleMap[tab]
  }

  return (
    <div className="mx-auto w-full max-w-sm bg-background text-foreground border rounded-2xl shadow-sm overflow-hidden">
      {/* iPhone notch/status spacer */}
      <div className="h-3 bg-background" aria-hidden />

      {/* Top Nav */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="font-semibold text-sm text-muted-foreground">InfluencePro</div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              aria-label="Notifications"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="size-5" />
            </Button>
            <Avatar className="size-7">
              <AvatarImage alt="You" src="/diverse-profile-avatars.png" />
              <AvatarFallback>IU</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="px-4 pb-3">
          <h1 className="text-xl font-semibold text-pretty">{Title()}</h1>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 pb-20 pt-4">
        {!isAuthed ? (
          <LoginOnboarding onLogin={() => setIsAuthed(true)} />
        ) : tab === "home" ? (
          <DashboardOverview
            onViewVerification={() => {
              setHasVerified(true)
              setTab("upload")
            }}
            onOpenMessages={() => setShowMessages(true)}
            onOpenEarnings={() => setShowEarnings(true)}
            onOpenTasks={() => setShowTasks(true)}
          />
        ) : tab === "explore" ? (
          <ExploreCampaigns
            onApply={() => {}}
            onSelected={() => {
              setHasSelection(true)
              setTab("schedule")
            }}
          />
        ) : tab === "schedule" ? (
          <Schedule onReadyToUpload={() => setTab("upload")} />
        ) : tab === "upload" ? (
          hasVerified ? (
            <Verification />
          ) : (
            <PromotionUpload
              onUploaded={() => {
                // Simulate auto-verification complete
                setHasVerified(true)
              }}
            />
          )
        ) : (
          <ProfileAnalytics />
        )}
      </div>

      {/* Tab Bar */}
      {isAuthed ? (
        <nav
          role="tablist"
          aria-label="App Tabs"
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-background/80 backdrop-blur border-t"
        >
          <div className="grid grid-cols-5">
            <TabButton
              icon={<Home className="size-5" />}
              label="Home"
              active={tab === "home"}
              onClick={() => setTab("home")}
            />
            <TabButton
              icon={<Search className="size-5" />}
              label="Explore"
              active={tab === "explore"}
              onClick={() => setTab("explore")}
            />
            <TabButton
              icon={<Calendar className="size-5" />}
              label="Schedule"
              active={tab === "schedule"}
              onClick={() => setTab("schedule")}
            />
            <TabButton
              icon={<Upload className="size-5" />}
              label="Upload"
              active={tab === "upload"}
              onClick={() => setTab("upload")}
            />
            <TabButton
              icon={<User2 className="size-5" />}
              label="Profile"
              active={tab === "profile"}
              onClick={() => setTab("profile")}
            />
          </div>
          <div className="px-4 pb-3 pt-1">
            {hasSelection && !hasVerified ? (
              <Card className="p-3 bg-accent text-accent-foreground">
                <p className="text-sm">You’ve been selected! Check Schedule, then Upload your promo.</p>
              </Card>
            ) : hasVerified ? (
              <Card className="p-3 bg-primary text-primary-foreground">
                <p className="text-sm">Verified — Payment in Progress</p>
              </Card>
            ) : null}
          </div>
        </nav>
      ) : null}

      <Dialog open={showMessages} onOpenChange={setShowMessages}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Messages</DialogTitle>
            <DialogDescription>Chat with brands and campaign managers.</DialogDescription>
          </DialogHeader>
          <Messages />
        </DialogContent>
      </Dialog>

      <Dialog open={showEarnings} onOpenChange={setShowEarnings}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Earnings & Payouts</DialogTitle>
            <DialogDescription>Track balance and payout history.</DialogDescription>
          </DialogHeader>
          <Earnings />
        </DialogContent>
      </Dialog>

      <Dialog open={showTasks} onOpenChange={setShowTasks}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Checklist</DialogTitle>
            <DialogDescription>Your deliverables for current campaigns.</DialogDescription>
          </DialogHeader>
          <Tasks onAllDone={() => setShowTasks(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>Latest updates from your campaigns.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Card className="p-3">
              <div className="text-sm">
                <span className="font-medium">XYZ Drop</span> selected you for 1 Reel
              </div>
              <div className="text-xs text-muted-foreground">2 min ago</div>
            </Card>
            <Card className="p-3">
              <div className="text-sm">
                Payment initiated for <span className="font-medium">FitFuel</span>
              </div>
              <div className="text-xs text-muted-foreground">1h ago</div>
            </Card>
            <Card className="p-3">
              <div className="text-sm">
                New message from <span className="font-medium">@brand_manager</span>
              </div>
              <div className="text-xs text-muted-foreground">Yesterday</div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      role="tab"
      aria-selected={!!active}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 py-2.5 text-xs",
        active ? "text-primary font-medium" : "text-muted-foreground",
      )}
    >
      {icon}
      <span className="sr-only md:not-sr-only">{label}</span>
    </button>
  )
}
