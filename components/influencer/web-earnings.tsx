"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Clock, Building2, Zap } from "lucide-react"

const transactionHistory = [
  { id: 1, campaign: "Nike Summer", amount: 12000, status: "paid", date: "2025-01-15" },
  { id: 2, campaign: "TravelGear Pro", amount: 15000, status: "pending", date: "2025-01-10" },
  { id: 3, campaign: "Apple Tech", amount: 20000, status: "approved", date: "2025-01-05" },
  { id: 4, campaign: "Starbucks Campaign", amount: 8500, status: "paid", date: "2024-12-28" },
]

const payoutMethods = [
  { icon: Building2, name: "Bank Transfer", desc: "Direct to your bank account" },
  { icon: Zap, name: "UPI", desc: "Google Pay, PhonePe, Paytm" },
]

export function EarningsPage() {
  const [transactionFilter, setTransactionFilter] = useState("All")

  const filtered =
    transactionFilter === "All"
      ? transactionHistory
      : transactionHistory.filter((t) => t.status === transactionFilter.toLowerCase())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Earnings</h1>
        <p className="text-muted-foreground mt-1">Manage your payments and withdrawals</p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-br from-primary to-blue-600">
        <CardContent className="pt-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm opacity-90">Available to withdraw</p>
              <p className="text-3xl font-bold mt-2">₹45,250</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Total Earned</p>
              <p className="text-3xl font-bold mt-2">₹187,500</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Pending</p>
              <p className="text-3xl font-bold mt-2">₹28,000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earnings Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <TrendingUp className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹187,500</div>
            <p className="text-xs text-muted-foreground">12 campaigns completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹28,000</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Request Payout */}
      <Button size="lg" className="w-full">
        Request Payout
      </Button>

      {/* Supported Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Payout Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {payoutMethods.map((method, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <method.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-muted-foreground">{method.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {["All", "Paid", "Pending", "Approved"].map((filter) => (
              <Button
                key={filter}
                variant={transactionFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setTransactionFilter(filter)}
                className="whitespace-nowrap"
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.campaign}</TableCell>
                    <TableCell>₹{tx.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={tx.status === "paid" ? "default" : tx.status === "pending" ? "secondary" : "outline"}
                      >
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
