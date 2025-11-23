import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const perfData = [
  { type: "Reels", value: 120 },
  { type: "Posts", value: 80 },
  { type: "Stories", value: 95 },
]

export default function ProfileAnalytics() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold">Audience</h3>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <MiniStat label="Top Country" value="IN" />
          <MiniStat label="Age" value="18–24" />
          <MiniStat label="Gender" value="54% F" />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold">Content Performance</h3>
        <div className="h-32 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={perfData}>
              <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold">AI Suggestion</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your Reels perform 20% better with {"#techreview"} tags — use them more!
        </p>
      </Card>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  )
}
