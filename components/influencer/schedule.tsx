"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const events = [
  { id: "e1", date: "Tue, 15 Oct", time: "4:00 PM", title: "XYZ Drop Reel", reminder: "Reminder 30m before" },
  { id: "e2", date: "Thu, 17 Oct", time: "11:00 AM", title: "FitFuel Story", reminder: "Reminder 1h before" },
]

export default function Schedule({ onReadyToUpload }: { onReadyToUpload: () => void }) {
  return (
    <div className="space-y-3">
      {events.map((e) => (
        <Card key={e.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">
                {e.date} • {e.time}
              </div>
              <div className="font-semibold">{e.title}</div>
              <div className="text-xs text-muted-foreground">{e.reminder}</div>
            </div>
            <Button size="sm" onClick={onReadyToUpload}>
              Upload
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
