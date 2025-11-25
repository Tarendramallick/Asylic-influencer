"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MessageModal } from "./message-modal"

interface Application {
  id: string
  name: string
  followers: number
  engagement: string
  proposal: string
  status: string
  campaign: string
}

export function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/applications")
        if (!response.ok) {
          throw new Error("Failed to fetch applications")
        }
        const data = await response.json()
        setApplications(data)
      } catch (err) {
        console.error("[v0] Error fetching applications:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        setApplications([])
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading applications...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>
  }

  if (applications.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No applications yet.</div>
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filter by campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {[...new Set(applications.map((a) => a.campaign))].map((campaign) => (
              <SelectItem key={campaign} value={campaign}>
                {campaign}
              </SelectItem>
            ))}
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
          {applications.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.followers.toLocaleString()}</TableCell>
              <TableCell>{a.engagement}</TableCell>
              <TableCell>{a.proposal}</TableCell>
              <TableCell>{a.status}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="secondary">
                  Reject
                </Button>
                <MessageModal influencer={a.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
