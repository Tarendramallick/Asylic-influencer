"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export function MessageModal({ influencer }: { influencer: string }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [file, setFile] = useState<File | null>(null)

  function send() {
    console.log("[v0] Message sent:", { influencer, text, file })
    setOpen(false)
    setText("")
    setFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Message
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Message {influencer}</DialogTitle>
        </DialogHeader>
        <Textarea placeholder="Write your message..." value={text} onChange={(e) => setText(e.target.value)} />
        <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <DialogFooter>
          <Button onClick={send}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
