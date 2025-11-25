"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  _id: string
  userId: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      if (!response.ok) throw new Error("Failed to fetch notifications")
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      console.error("[v0] Fetch notifications error:", error)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ notificationId: id }),
      })
      if (!response.ok) throw new Error("Failed to mark as read")
      fetchNotifications()
    } catch (error) {
      console.error("[v0] Mark as read error:", error)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      <button className="relative p-2 hover:bg-muted rounded-lg" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 w-96 max-h-96 overflow-y-auto bg-background border border-border rounded-lg shadow-lg z-50">
          <Card className="border-0 rounded-none">
            <CardHeader className="border-b flex flex-row items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 pt-4">
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No notifications</p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif._id}
                    className={`p-3 rounded-lg border cursor-pointer hover:bg-muted/50 ${
                      !notif.read ? "bg-muted border-primary/30" : ""
                    }`}
                    onClick={() => markAsRead(notif._id)}
                  >
                    <p className="font-semibold text-sm">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">{notif.message}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
