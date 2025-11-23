"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const logs = [
  { admin: "root", ip: "10.0.0.12", time: "2025-10-12 09:21", status: "Success" },
  { admin: "ops", ip: "10.0.0.18", time: "2025-10-12 11:48", status: "2FA Failed" },
  { admin: "analyst", ip: "10.0.0.23", time: "2025-10-13 08:05", status: "Success" },
]

export function SystemLogsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login Activity</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr className="border-b border-border/60">
              <th className="py-2 pr-4">Admin</th>
              <th className="py-2 pr-4">IP Address</th>
              <th className="py-2 pr-4">Login Time</th>
              <th className="py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l, idx) => (
              <tr key={idx} className="border-b border-border/40">
                <td className="py-2 pr-4">{l.admin}</td>
                <td className="py-2 pr-4">{l.ip}</td>
                <td className="py-2 pr-4">{l.time}</td>
                <td className="py-2 pr-4">{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
