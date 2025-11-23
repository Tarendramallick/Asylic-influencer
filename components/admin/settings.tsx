"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function SettingsSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Platform Name" defaultValue="InfluencePro" aria-label="Platform Name" />
          <Input placeholder="Support Email" defaultValue="support@influence.pro" aria-label="Support Email" />
          <Input placeholder="Domain" defaultValue="influence.pro" aria-label="Domain" />
          <Button>Save</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Instagram Graph API Key" aria-label="Instagram API Key" />
          <Input placeholder="Stripe/Razorpay Key" aria-label="Payments API Key" />
          <Textarea placeholder="Webhook Secret" aria-label="Webhook Secret" />
          <Button variant="outline">Rotate Keys</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked aria-label="Email Alerts" /> Email Alerts
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked aria-label="Payment Alerts" /> Payment Alerts
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" aria-label="API Limit Alerts" /> API Limit Alerts
          </label>
          <Button>Save</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>User Roles & Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>Admins: 3 • Moderators: 6</div>
          <Button variant="outline">Add Admin</Button>
        </CardContent>
      </Card>
    </div>
  )
}
