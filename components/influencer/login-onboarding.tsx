"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LoginOnboarding({ onLogin }: { onLogin: () => void }) {
  const slides = [
    {
      title: "Automate your deals",
      body: "Find campaigns, apply fast, and manage everything in one app.",
    },
    {
      title: "Smarter analytics",
      body: "See reach, growth, and content performance at a glance.",
    },
    {
      title: "Verified payouts",
      body: "Auto-verify posts and get paid with confidence.",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {slides.map((s, i) => (
          <Card key={i} className="p-4">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
          </Card>
        ))}
      </div>

      <div className="pt-2">
        <Button className="w-full" onClick={onLogin} aria-label="Login with Instagram">
          Login with Instagram
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
