"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const transactions = [
  { date: "2025-10-01", influencer: "Aarav", campaign: "Fall Launch", amount: "₹10,000", status: "Paid" },
  { date: "2025-10-02", influencer: "Priya", campaign: "Back-to-School", amount: "₹6,000", status: "Processing" },
]

function InitiatePaymentDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Initiate Payment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Initiate Payment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select influencer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aarav">Aarav</SelectItem>
              <SelectItem value="priya">Priya</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fall">Fall Launch</SelectItem>
              <SelectItem value="b2s">Back-to-School</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Amount (₹)" type="number" min={0} />
        </div>
        <DialogFooter>
          <Button onClick={() => console.log("[v0] Payment initiated")}>Pay</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function PaymentsView() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Total Spent This Month: ₹1,28,000</div>
        <InitiatePaymentDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Influencer</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t, i) => (
            <TableRow key={i}>
              <TableCell>{t.date}</TableCell>
              <TableCell>{t.influencer}</TableCell>
              <TableCell>{t.campaign}</TableCell>
              <TableCell>{t.amount}</TableCell>
              <TableCell>{t.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
