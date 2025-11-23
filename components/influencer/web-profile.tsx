"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, Edit, LinkIcon, Lock } from "lucide-react"

export function InfluencerProfile() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center flex-1">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">Sarah Johnson</h2>
                <p className="text-muted-foreground">@sarahjohnson</p>
                <p className="mt-2 text-sm">Fashion & Lifestyle | 48.5K followers | Creating authentic content</p>
                <div className="flex gap-6 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Followers</p>
                    <p className="font-bold text-lg">48.5K</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                    <p className="font-bold text-lg">7.2%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Niche</p>
                    <p className="font-bold text-lg">Fashion</p>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Update Profile Information</p>
                    <p className="text-sm text-muted-foreground">Name, bio, location</p>
                  </div>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Connected Accounts</p>
                    <p className="text-sm text-muted-foreground">Instagram, social media</p>
                  </div>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Link
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">Update your password</p>
                  </div>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue="Sarah Johnson" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <Input defaultValue="@sarahjohnson" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    defaultValue="Fashion & Lifestyle | 48.5K followers | Creating authentic content"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Niche</label>
                    <Input defaultValue="Fashion" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input defaultValue="New York, USA" className="mt-1" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">Save Changes</Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">₹187,500</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Campaigns Completed</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium">June 2023</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="w-full justify-center py-2 text-center">✓ Verified</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
