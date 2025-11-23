"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MessageModal } from "./message-modal"

const rows = [
  {
    name: "Aarav Mehta",
    followers: "82k",
    engagement: "4.8%",
    proposal: "₹10,000 / Reel",
    status: "Pending",
    campaign: "Fall Launch",
  },
  {
    name: "Priya K",
    followers: "45k",
    engagement: "6.1%",
    proposal: "₹6,000 / Post",
    status: "Pending",
    campaign: "Back-to-School",
  },
  {
    name: "Rohan S",
    followers: "110k",
    engagement: "3.9%",
    proposal: "₹14,000 / Reel",
    status: "Shortlisted",
    campaign: "UGC Sprint",
  },
]

export function ApplicationsTable() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filter by campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="fall">Fall Launch</SelectItem>
            <SelectItem value="b2s">Back-to-School</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="followers">Followers</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Influencer</TableHead>
            <TableHead>Followers</TableHead>
            <TableHead>Engagement</TableHead>
            <TableHead>Proposal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.followers}</TableCell>
              <TableCell>{r.engagement}</TableCell>
              <TableCell>{r.proposal}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="secondary">
                  Reject
                </Button>
                <MessageModal influencer={r.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
