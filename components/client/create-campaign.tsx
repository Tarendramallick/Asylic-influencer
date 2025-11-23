"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CampaignForm = {
  name: string
  brand: string
  description: string
  logo?: File | null
  deliverable: "Reel" | "Story" | "Post" | "Carousel" | ""
  influencersNeeded: number
  budgetPerDeliverable: number
  ageRange: string
  gender: string
  interests: string[]
  location: string
  followerRange: string
  hashtags: string
  mentions: string
  captionGuidelines: string
}

const initialForm: CampaignForm = {
  name: "",
  brand: "",
  description: "",
  logo: null,
  deliverable: "",
  influencersNeeded: 1,
  budgetPerDeliverable: 0,
  ageRange: "",
  gender: "",
  interests: [],
  location: "",
  followerRange: "",
  hashtags: "",
  mentions: "",
  captionGuidelines: "",
}

export function CreateCampaignDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<CampaignForm>(initialForm)

  function next() {
    setStep((s) => Math.min(5, s + 1))
  }

  function back() {
    setStep((s) => Math.max(1, s - 1))
  }

  function publish() {
    console.log("[v0] Publishing campaign:", form)
    // TODO: integrate backend save + notifications
    setOpen(false)
    setStep(1)
    setForm(initialForm)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create Campaign</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Campaign</DialogTitle>
          <DialogDescription>Step {step} of 5</DialogDescription>
        </DialogHeader>

        {/* Stepper */}
        <div className="mb-2 grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} aria-hidden className={`h-1 rounded ${i + 1 <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="grid gap-3">
            <Input
              placeholder="Campaign Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Brand / Product Name"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, logo: e.target.files?.[0] ?? null })}
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm">Content Type</label>
              <Select
                value={form.deliverable}
                onValueChange={(v: CampaignForm["deliverable"]) => setForm({ ...form, deliverable: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reel">Instagram Reel</SelectItem>
                  <SelectItem value="Story">Story</SelectItem>
                  <SelectItem value="Post">Post</SelectItem>
                  <SelectItem value="Carousel">Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              type="number"
              min={1}
              placeholder="Number of influencers"
              value={form.influencersNeeded}
              onChange={(e) => setForm({ ...form, influencersNeeded: Number(e.target.value) })}
            />
            <Input
              type="number"
              min={0}
              placeholder="Budget per deliverable"
              value={form.budgetPerDeliverable}
              onChange={(e) => setForm({ ...form, budgetPerDeliverable: Number(e.target.value) })}
            />
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              placeholder="Age range (e.g., 18-35)"
              value={form.ageRange}
              onChange={(e) => setForm({ ...form, ageRange: e.target.value })}
            />
            <Input
              placeholder="Gender (e.g., Any, Female, Male)"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />
            <Input
              placeholder="Interests (comma separated)"
              onChange={(e) =>
                setForm({
                  ...form,
                  interests: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
            <Input
              placeholder="Location (city/state)"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <Input
              placeholder="Follower range (e.g., 10k-100k)"
              value={form.followerRange}
              onChange={(e) => setForm({ ...form, followerRange: e.target.value })}
            />
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-3">
            <Input
              placeholder="Required hashtags (e.g., #MyBrand2025)"
              value={form.hashtags}
              onChange={(e) => setForm({ ...form, hashtags: e.target.value })}
            />
            <Input
              placeholder="Required mentions (e.g., @mybrand.official)"
              value={form.mentions}
              onChange={(e) => setForm({ ...form, mentions: e.target.value })}
            />
            <Textarea
              placeholder="Caption/theme instructions"
              value={form.captionGuidelines}
              onChange={(e) => setForm({ ...form, captionGuidelines: e.target.value })}
            />
          </div>
        )}

        {step === 5 && (
          <div className="grid gap-3">
            <div className="rounded-md border p-3 text-sm">
              <div className="font-medium">Review</div>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <span className="text-muted-foreground">Name:</span> {form.name || "-"}
                </div>
                <div>
                  <span className="text-muted-foreground">Brand:</span> {form.brand || "-"}
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span> {form.deliverable || "-"}
                </div>
                <div>
                  <span className="text-muted-foreground">Influencers:</span> {form.influencersNeeded}
                </div>
                <div>
                  <span className="text-muted-foreground">Budget/Deliverable:</span> {form.budgetPerDeliverable}
                </div>
                <div>
                  <span className="text-muted-foreground">Age:</span> {form.ageRange || "-"}
                </div>
                <div>
                  <span className="text-muted-foreground">Gender:</span> {form.gender || "-"}
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span> {form.location || "-"}
                </div>
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground">Hashtags:</span> {form.hashtags || "-"}
                </div>
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground">Mentions:</span> {form.mentions || "-"}
                </div>
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground">Caption:</span> {form.captionGuidelines || "-"}
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-2">
          <div className="ml-auto flex items-center gap-2">
            {step > 1 && (
              <Button variant="ghost" onClick={back}>
                Back
              </Button>
            )}
            {step < 5 ? <Button onClick={next}>Next</Button> : <Button onClick={publish}>Publish Campaign</Button>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
