import { Card } from "@/components/ui/card"

export default function Verification() {
  return (
    <div className="space-y-4">
      <Card className="p-4 bg-primary text-primary-foreground">
        <h3 className="font-semibold">✅ Verified — Payment in Progress</h3>
        <p className="text-sm opacity-90 mt-1">Hashtag matched • Public • On schedule</p>
      </Card>

      <Card className="p-4">
        <h4 className="font-semibold">What’s next?</h4>
        <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5">
          <li>Funds will be released within 3–5 business days</li>
          <li>Track in Dashboard → Recent Earnings</li>
        </ul>
      </Card>
    </div>
  )
}
