"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export function SettingsView() {
  const [team, setTeam] = useState<string[]>(["ops@brand.com", "marketing@brand.com"])
  const [email, setEmail] = useState("")

  function addMember() {
    if (email && !team.includes(email)) {
      setTeam([...team, email])
      setEmail("")
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader className="border-b py-4">
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <div className="size-16 rounded-full bg-muted" aria-hidden />
          <div className="mt-3 grid gap-2">
            <Input placeholder="Company Name" defaultValue="Acme Brands" />
            <Input placeholder="Contact Name" defaultValue="Jane Doe" />
            <Input placeholder="Phone" defaultValue="+91 98765 43210" />
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="border-b py-4">
          <CardTitle>Company & Billing</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 py-4">
          <Textarea placeholder="Company Info" />
          <Input placeholder="Billing Address" />
          <div className="flex items-center justify-between rounded-md border p-3">
            <div className="text-sm">
              <div className="font-medium">Email Notifications</div>
              <div className="text-muted-foreground">Campaign updates and approvals</div>
            </div>
            <Switch />
          </div>
          <div className="rounded-md border p-3">
            <div className="mb-2 text-sm font-medium">Team Members</div>
            <div className="flex gap-2">
              <Input placeholder="Invite by email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button onClick={addMember}>Invite</Button>
            </div>
            <ul className="mt-3 text-sm">
              {team.map((m) => (
                <li key={m} className="flex items-center justify-between border-b py-2 last:border-none">
                  <span>{m}</span>
                  <Button variant="ghost" size="sm" onClick={() => setTeam(team.filter((x) => x !== m))}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
