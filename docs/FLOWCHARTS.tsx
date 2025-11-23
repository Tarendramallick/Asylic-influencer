"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, User, Building2, Shield } from "lucide-react"

export default function Flowcharts() {
  const [selectedModule, setSelectedModule] = useState("influencer")

  const InfluencerFlow = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-8 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <User className="w-6 h-6" />
          Influencer Complete Journey
        </h3>

        <div className="space-y-4">
          {/* Step 1 */}
          <FlowStep
            number={1}
            title="Authentication"
            items={["Instagram OAuth Login", "Email + Password (Alternative)", "Auto-populate profile data"]}
            color="blue"
          />
          <FlowArrow />

          {/* Step 2 */}
          <FlowStep
            number={2}
            title="Profile Setup"
            items={["Complete KYC details", "Select niche/category", "Verify follower count"]}
            color="blue"
          />
          <FlowArrow />

          {/* Step 3 */}
          <FlowStep
            number={3}
            title="Dashboard"
            items={["View earning stats", "See active campaigns", "Check notifications"]}
            color="blue"
          />
          <FlowArrow />

          {/* Step 4 */}
          <FlowStep
            number={4}
            title="Campaign Discovery"
            items={["Browse active campaigns", "Filter by category/budget", "View brand requirements"]}
            color="green"
          />
          <FlowArrow />

          {/* Step 5 */}
          <FlowStep
            number={5}
            title="Apply to Campaign"
            items={["One-click application", "Auto-fill profile data", "Optional: custom message"]}
            color="green"
          />
          <FlowArrow />

          {/* Decision Point */}
          <div className="bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
            <p className="font-bold text-center">Brand Reviews Application</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <Badge className="bg-green-500">APPROVED ✓</Badge>
              </div>
              <div className="text-center">
                <Badge variant="outline">REJECTED ✗</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FlowArrow label="Yes" />
              <FlowStep
                number={6}
                title="Content Upload"
                items={["Upload reel/story", "Add caption & hashtags", "Brand reviews upload"]}
                color="green"
              />
              <FlowArrow />
              <FlowStep
                number={7}
                title="Schedule Posting"
                items={["Select date & time", "Brand approves schedule", "Awaiting posting window"]}
                color="purple"
              />
              <FlowArrow />
              <FlowStep
                number={8}
                title="Post to Instagram"
                items={["Use required hashtags", "Include @mentions", "Publish content"]}
                color="purple"
              />
              <FlowArrow />
              <FlowStep
                number={9}
                title="Auto-Verification"
                items={["System detects post", "Matches hashtags/mentions", "Records engagement"]}
                color="purple"
              />
              <FlowArrow />
              <FlowStep
                number={10}
                title="Campaign Completed"
                items={["Earnings credited", "Available to withdraw", "Brand feedback received"]}
                color="green"
              />
            </div>

            <div>
              <FlowArrow label="No" />
              <FlowStep
                number={6}
                title="Rejected"
                items={["Reason provided", "Can reapply later", "Feedback received"]}
                color="red"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ClientFlow = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          Brand Complete Journey
        </h3>

        <div className="space-y-4">
          {/* Step 1 */}
          <FlowStep
            number={1}
            title="Authentication"
            items={["Email + Password Login", "Google OAuth", "Forgot password reset"]}
            color="blue"
          />
          <FlowArrow />

          {/* Step 2 */}
          <FlowStep
            number={2}
            title="Brand Onboarding"
            items={["Complete business info", "Upload brand logo", "KYC verification"]}
            color="blue"
          />
          <FlowArrow />

          {/* Step 3 */}
          <FlowStep
            number={3}
            title="Dashboard"
            items={["Campaign overview", "Active influencers", "Budget tracking"]}
            color="blue"
          />
          <FlowArrow />

          {/* Step 4 */}
          <FlowStep
            number={4}
            title="Create Campaign"
            items={["Define goals & deliverables", "Set guidelines & hashtags", "Set budget & timeline"]}
            color="green"
          />
          <FlowArrow />

          {/* Step 5 */}
          <FlowStep
            number={5}
            title="Campaign Goes Live"
            items={["Influencers can apply", "Applications queue up", "Brand receives notifications"]}
            color="green"
          />
          <FlowArrow />

          {/* Step 6 */}
          <FlowStep
            number={6}
            title="Review Applications"
            items={["View influencer profiles", "Check eligibility match", "Approve or reject"]}
            color="green"
          />
          <FlowArrow />

          {/* Step 7 */}
          <FlowStep
            number={7}
            title="Content Review"
            items={["Influencer uploads content", "Brand reviews quality", "Check guidelines compliance"]}
            color="purple"
          />

          {/* Decision Point */}
          <div className="bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
            <p className="font-bold text-center">Brand Content Decision</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <Badge className="bg-green-500">APPROVE ✓</Badge>
              </div>
              <div className="text-center">
                <Badge variant="outline">CHANGES NEEDED</Badge>
              </div>
              <div className="text-center">
                <Badge variant="outline">REJECT ✗</Badge>
              </div>
            </div>
          </div>

          <FlowArrow label="If Approved" />
          <FlowStep
            number={8}
            title="Post Verification"
            items={["Monitor Instagram", "Auto-detect post", "Record metrics"]}
            color="purple"
          />
          <FlowArrow />

          {/* Step 9 */}
          <FlowStep
            number={9}
            title="Campaign Completed"
            items={["View analytics", "Process influencer payment", "Request brand feedback"]}
            color="green"
          />
        </div>
      </div>
    </div>
  )

  const AdminFlow = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-8 rounded-lg border border-red-200 dark:border-red-800">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Admin Platform Management
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-4">User Management</h4>
            <FlowStep
              number={1}
              title="Manage Influencers"
              items={["KYC verification", "Approve/reject profiles", "Suspend accounts"]}
              color="purple"
            />
            <FlowArrow />
            <FlowStep
              number={2}
              title="Manage Brands"
              items={["Verify businesses", "Monitor compliance", "Handle complaints"]}
              color="purple"
            />
          </div>

          <div>
            <h4 className="font-bold mb-4">Campaign & Content Control</h4>
            <FlowStep
              number={3}
              title="Monitor Campaigns"
              items={["Track all campaigns", "Suspend harmful content", "Resolve disputes"]}
              color="purple"
            />
            <FlowArrow />
            <FlowStep
              number={4}
              title="Verify Content"
              items={["Review auto-detections", "Manual approvals", "Moderation logs"]}
              color="purple"
            />
          </div>
        </div>

        <FlowArrow />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-bold mb-4">Financial Management</h4>
            <FlowStep
              number={5}
              title="Payment Processing"
              items={["Review withdrawal requests", "Approve payouts", "Track transactions"]}
              color="green"
            />
          </div>

          <div>
            <h4 className="font-bold mb-4">Reporting & Settings</h4>
            <FlowStep
              number={6}
              title="Platform Controls"
              items={["Generate reports", "Configure APIs", "Manage settings"]}
              color="green"
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">System Flowcharts</CardTitle>
          <CardDescription>Complete user journeys for all three platform modules</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedModule} onValueChange={setSelectedModule} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="influencer">Influencer Flow</TabsTrigger>
              <TabsTrigger value="client">Brand Flow</TabsTrigger>
              <TabsTrigger value="admin">Admin Flow</TabsTrigger>
            </TabsList>

            <TabsContent value="influencer">
              <InfluencerFlow />
            </TabsContent>
            <TabsContent value="client">
              <ClientFlow />
            </TabsContent>
            <TabsContent value="admin">
              <AdminFlow />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function FlowStep({ number, title, items, color }: any) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-700",
    green: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-700",
    purple: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-700",
    red: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-700",
    yellow: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-700",
  }

  return (
    <div className={`${colorClasses[color]} border-l-4 p-4 rounded-lg`}>
      <div className="flex items-start gap-3">
        <Badge className="mt-1">{number}</Badge>
        <div className="flex-1">
          <p className="font-bold text-lg">{title}</p>
          <ul className="mt-2 space-y-1 text-sm">
            {items.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-current rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function FlowArrow({ label }: any) {
  return (
    <div className="flex items-center justify-center my-3">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        {label && <span className="text-sm font-medium">{label}</span>}
        <ArrowDown className="w-5 h-5" />
      </div>
    </div>
  )
}
