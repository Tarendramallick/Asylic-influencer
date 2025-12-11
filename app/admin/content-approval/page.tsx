"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Loader2 } from "lucide-react"

export default function ContentApprovalPage() {
  const { token, user } = useAuth()
  const router = useRouter()
  const [pendingContent, setPendingContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContent, setSelectedContent] = useState<any | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      router.push("/login?role=admin")
      return
    }

    fetchPendingContent()
  }, [token, user, router])

  const fetchPendingContent = async () => {
    try {
      const response = await fetch("/api/admin/content/pending", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setPendingContent(data)
      }
    } catch (error) {
      console.error("[v0] Error fetching pending content:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedContent) return

    setIsApproving(true)
    try {
      const response = await fetch("/api/admin/content/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contentId: selectedContent._id,
        }),
      })

      if (response.ok) {
        setPendingContent((prev) => prev.filter((c) => c._id !== selectedContent._id))
        setSelectedContent(null)
        fetchPendingContent()
      }
    } catch (error) {
      console.error("[v0] Error approving content:", error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    if (!selectedContent || !rejectionReason) return

    setIsRejecting(true)
    try {
      const response = await fetch("/api/admin/content/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contentId: selectedContent._id,
          reason: rejectionReason,
        }),
      })

      if (response.ok) {
        setPendingContent((prev) => prev.filter((c) => c._id !== selectedContent._id))
        setSelectedContent(null)
        setRejectionReason("")
        fetchPendingContent()
      }
    } catch (error) {
      console.error("[v0] Error rejecting content:", error)
    } finally {
      setIsRejecting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading pending content...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Approval</h1>
        <p className="text-muted-foreground mt-1">Review and approve influencer content before posting to Instagram</p>
      </div>

      {pendingContent.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="font-semibold">No pending content</p>
            <p className="text-sm text-muted-foreground">All submissions have been reviewed</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pendingContent.map((content) => (
            <Card key={content._id} className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{content.influencer?.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{content.campaign?.title}</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                    {content.contentType}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {content.contentUrl && (
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    {content.contentUrl.includes("data:video") || content.contentUrl.includes(".mp4") ? (
                      <video src={content.contentUrl} controls className="w-full h-full object-cover" />
                    ) : (
                      <img
                        src={content.contentUrl || "/placeholder.svg"}
                        alt="Content preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold">Caption</p>
                  <p className="text-sm text-muted-foreground">{content.caption}</p>
                </div>

                {content.hashtags && content.hashtags.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold">Hashtags</p>
                    <p className="text-sm text-blue-600">{content.hashtags.join(" ")}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => setSelectedContent(content)}>
                    Review & Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedContent} onOpenChange={(open) => !open && setSelectedContent(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Approve Content</DialogTitle>
            <DialogDescription>Review the content before approving it to be posted on Instagram</DialogDescription>
          </DialogHeader>

          {selectedContent && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {selectedContent.contentUrl.includes("data:video") || selectedContent.contentUrl.includes(".mp4") ? (
                  <video src={selectedContent.contentUrl} controls className="w-full h-full object-cover" />
                ) : (
                  <img
                    src={selectedContent.contentUrl || "/placeholder.svg"}
                    alt="Content preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div>
                <p className="font-semibold text-sm">Caption</p>
                <p className="text-sm text-muted-foreground">{selectedContent.caption}</p>
              </div>

              {selectedContent.hashtags && selectedContent.hashtags.length > 0 && (
                <div>
                  <p className="font-semibold text-sm">Hashtags</p>
                  <p className="text-sm text-blue-600">{selectedContent.hashtags.join(" ")}</p>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold block mb-2">Rejection Reason (if rejecting)</label>
                  <Textarea
                    placeholder="Enter reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="min-h-20"
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleApprove} disabled={isApproving || isRejecting}>
                    {isApproving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      "Approve & Post to Instagram"
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={handleReject}
                    disabled={!rejectionReason || isApproving || isRejecting}
                  >
                    {isRejecting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Rejecting...
                      </>
                    ) : (
                      "Reject"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
