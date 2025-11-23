"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const defaultTasks = [
  { id: "t1", label: "Confirm posting time", done: false },
  { id: "t2", label: "Add #XYZDrop and @xyzbrand", done: false },
  { id: "t3", label: "Ensure public visibility", done: false },
  { id: "t4", label: "Upload final Reel", done: false },
]

export default function Tasks({ onAllDone }: { onAllDone?: () => void }) {
  const [tasks, setTasks] = useState(defaultTasks)

  function toggle(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const allDone = tasks.every((t) => t.done)

  return (
    <div className="space-y-3">
      <Card className="p-4">
        <h3 className="font-semibold">XYZ Drop • Deliverables</h3>
        <div className="mt-2 space-y-2">
          {tasks.map((t) => (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              className={`w-full text-left rounded-md border px-3 py-2 text-sm ${t.done ? "bg-primary text-primary-foreground" : ""}`}
              aria-pressed={t.done}
            >
              {t.done ? "✅ " : "⬜️ "} {t.label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-end">
          <Button variant="secondary" disabled={!allDone} onClick={onAllDone}>
            Mark all done
          </Button>
        </div>
      </Card>
    </div>
  )
}
