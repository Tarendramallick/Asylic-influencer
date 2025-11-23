"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const submissions = [
  {
    id: "1",
    influencer: "Aarav Mehta",
    caption: "Big reveal! #MyBrand2025",
    link: "https://instagram.com/p/xyz",
    likes: 1200,
    comments: 87,
    reach: 54000,
    thumbnail: "/video-thumbnail.png",
  },
  {
    id: "2",
    influencer: "Priya K",
    caption: "Study hacks with our product",
    link: "https://instagram.com/p/abc",
    likes: 760,
    comments: 45,
    reach: 31000,
    thumbnail: "/video-thumbnail.png",
  },
]

export function ContentReviewGrid() {
  const [active, setActive] = useState<(typeof submissions)[number] | null>(null)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {submissions.map((s) => (
          <Card key={s.id}>
            <CardHeader className="border-b py-3">
              <CardTitle className="text-sm">{s.influencer}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <img
                src={s.thumbnail || "/placeholder.svg"}
                alt={`Submission by ${s.influencer}`}
                className="w-full rounded-md border"
              />
              <div className="mt-2 text-sm">{s.caption}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.link}</div>
              <div className="mt-3 flex gap-3 text-sm">
                <div>Likes: {s.likes.toLocaleString()}</div>
                <div>Comments: {s.comments.toLocaleString()}</div>
                <div>Reach: {s.reach.toLocaleString()}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={() => setActive(s)}>
                  Preview
                </Button>
                <Button size="sm" variant="secondary">
                  Approve
                </Button>
                <Button size="sm" variant="outline">
                  Request Revision
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submission Preview</DialogTitle>
          </DialogHeader>
          {active && (
            <div className="grid gap-3">
              <img
                src={active.thumbnail || "/placeholder.svg"}
                alt="Submission preview"
                className="w-full rounded-md border"
              />
              <div className="text-sm">{active.caption}</div>
              <a className="text-sm text-primary underline" href={active.link}>
                Open Instagram
              </a>
              <div className="flex gap-4 text-sm">
                <div>Likes: {active.likes.toLocaleString()}</div>
                <div>Comments: {active.comments.toLocaleString()}</div>
                <div>Reach: {active.reach.toLocaleString()}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button>Approve</Button>
            <Button variant="outline">Request Revision</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
