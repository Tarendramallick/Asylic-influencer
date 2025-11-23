"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const payouts = [
  { id: "p1", label: "FitFuel Story", amount: "₹3,500", status: "Paid", date: "Oct 5" },
  { id: "p2", label: "XYZ Drop Reel", amount: "₹8,000", status: "Processing", date: "Oct 12" },
  { id: "p3", label: "TechLite Reel", amount: "₹9,500", status: "Pending", date: "Oct 18" },
]

export default function Earnings() {
  return (
    <div className="space-y-3">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Available Balance</div>
            <div className="text-2xl font-semibold">₹12,250</div>
          </div>
          <Button disabled title="Minimum ₹5,000 for payout">
            Request Payout
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold">Payouts</h3>
        <div className="mt-2 space-y-2">
          {payouts.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <div className="text-sm font-medium">{p.label}</div>
                <div className="text-xs text-muted-foreground">
                  {p.date} • {p.status}
                </div>
              </div>
              <div className="font-semibold">{p.amount}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-accent text-accent-foreground">
        <div className="text-sm">Tip: Complete verification faster by posting on schedule with required tags.</div>
      </Card>
    </div>
  )
}
