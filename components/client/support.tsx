"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function ChatDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Start Chat</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Support Chat</DialogTitle>
        </DialogHeader>
        <div className="h-40 rounded-md border p-2 text-sm text-muted-foreground">Chat will appear here…</div>
        <div className="flex gap-2">
          <Input placeholder="Type a message" />
          <Button>Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function SupportView() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="border-b py-4">
          <CardTitle>Help Center</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a campaign?</AccordionTrigger>
              <AccordionContent>
                Use the “Create Campaign” button and follow the 5 steps. Publish to notify verified influencers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How are payouts handled?</AccordionTrigger>
              <AccordionContent>
                After content approval, initiate payouts from the Payments tab. We can integrate Stripe for automation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How can I export analytics?</AccordionTrigger>
              <AccordionContent>Go to Analytics and click Export CSV or Export PDF.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b py-4">
          <CardTitle>Submit a Ticket</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 py-4">
          <Input placeholder="Subject" />
          <Textarea placeholder="Describe your issue" />
          <div className="flex items-center gap-2">
            <Button>Submit</Button>
            <ChatDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
