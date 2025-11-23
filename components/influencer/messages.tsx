"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Message = { id: string; from: "me" | "brand"; text: string; time: string }

const initialThread: Message[] = [
  { id: "m1", from: "brand", text: "Hi! Can you confirm the posting time for XYZ Drop?", time: "2:30 PM" },
  { id: "m2", from: "me", text: "Sure—scheduled for Tue 4 PM.", time: "2:32 PM" },
  { id: "m3", from: "brand", text: "Perfect. Please add #XYZDrop and @xyzbrand.", time: "2:35 PM" },
]

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(initialThread)
  const [text, setText] = useState("")

  function send() {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), from: "me", text: text.trim(), time: "now" }])
    setText("")
  }

  return (
    <div className="space-y-3">
      <Card className="p-3">
        <div className="text-sm font-medium">XYZ Brand</div>
        <div className="text-xs text-muted-foreground">@brand_manager</div>
      </Card>

      <div className="space-y-2 max-h-64 overflow-auto pr-1">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`rounded-lg px-3 py-2 text-sm ${m.from === "me" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              {m.text}
              <div className="text-[10px] opacity-75 mt-1 text-right">{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" />
        <Button onClick={send}>Send</Button>
      </div>
    </div>
  )
}
