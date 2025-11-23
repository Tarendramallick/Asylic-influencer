"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const rows = [
  { influencer: "fashionista_amy", campaign: "Diwali Drop 2025", content: "Reel.mp4", status: "Pending" },
  { influencer: "techguru_raj", campaign: "ByteTech Launch", content: "Story.mov", status: "Pending" },
]

export function VerificationQueue() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<(typeof rows)[0] | null>(null)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pending Verifications</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="border-b border-border/60">
                <th className="py-2 pr-4">Influencer</th>
                <th className="py-2 pr-4">Campaign</th>
                <th className="py-2 pr-4">Submitted Content</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.influencer} className="border-b border-border/40">
                  <td className="py-2 pr-4">{r.influencer}</td>
                  <td className="py-2 pr-4">{r.campaign}</td>
                  <td className="py-2 pr-4">{r.content}</td>
                  <td className="py-2 pr-4">{r.status}</td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelected(r)
                          setOpen(true)
                        }}
                      >
                        Play Preview
                      </Button>
                      <Button size="sm" variant="success">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        Schedule Review
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby="preview-desc">
          <DialogHeader>
            <DialogTitle>Content Preview</DialogTitle>
          </DialogHeader>
          <div id="preview-desc" className="text-sm text-muted-foreground">
            {selected ? `${selected.influencer} - ${selected.content}` : "No content selected"}
          </div>
          <div className="mt-3 aspect-video w-full bg-muted rounded-md" aria-hidden="true" />
          <div className="mt-4 flex gap-2">
            <Button variant="success">Approve</Button>
            <Button variant="destructive">Reject</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
