"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Clock, Building2, Zap } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

const payoutMethods = [
  { icon: Building2, name: "Bank Transfer", desc: "Direct to your bank account" },
  { icon: Zap, name: "UPI", desc: "Google Pay, PhonePe, Paytm" },
]

export function EarningsPage() {
  const { token } = useAuth()
  const { toast } = useToast()
  const [transactionFilter, setTransactionFilter] = useState("All")
  const [transactions, setTransactions] = useState<any[]>([])
  const [earnings, setEarnings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    fetchData()
  }, [token])

  const fetchData = async () => {
    try {
      const [earningsRes, payoutsRes] = await Promise.all([
        fetch("/api/earnings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/payouts/history", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      if (earningsRes.ok) {
        const earningsData = await earningsRes.json()
        setEarnings(earningsData)
      }

      if (payoutsRes.ok) {
        const payoutsData = await payoutsRes.json()
        setTransactions(payoutsData)
      }
    } catch (error) {
      console.error("[v0] Error fetching earnings:", error)
      toast({
        title: "Error",
        description: "Failed to load earnings data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filtered =
    transactionFilter === "All"
      ? transactions
      : transactions.filter((t) => t.status === transactionFilter.toLowerCase())

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    )
  }

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
              <p className="text-3xl font-bold mt-2">₹{(earnings?.balance || 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Total Earned</p>
              <p className="text-3xl font-bold mt-2">₹{(earnings?.totalEarned || 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Pending</p>
              <p className="text-3xl font-bold mt-2">₹{(earnings?.pending || 0).toLocaleString()}</p>
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
            <div className="text-2xl font-bold">₹{(earnings?.totalEarned || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {transactions.filter((t) => t.status === "paid").length} campaigns completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(earnings?.pending || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Request Payout */}
      <Button size="lg" className="w-full" disabled={!earnings?.balance || earnings.balance < 1000}>
        Request Payout {earnings?.balance < 1000 && "(Minimum ₹1,000)"}
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

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No transactions found</div>
          ) : (
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
                    <TableRow key={tx._id}>
                      <TableCell className="font-medium">{tx.campaignName || tx.description || "Campaign"}</TableCell>
                      <TableCell>₹{tx.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={tx.status === "paid" ? "default" : tx.status === "pending" ? "secondary" : "outline"}
                        >
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
