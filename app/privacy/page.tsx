"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Asylic.biz ("Company," "we," "us," "our") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website and
                use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please
                do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Information Collection */}
          <Card>
            <CardHeader>
              <CardTitle>2. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Name, email address, and contact information</li>
                  <li>Account credentials and authentication information</li>
                  <li>Profile information including bio, followers, and engagement metrics</li>
                  <li>Payment information for transactions</li>
                  <li>Content you create, upload, or share on the platform</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, links clicked)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Location information (if permitted)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Third-Party Information</h3>
                <p>
                  We may receive information from Instagram, Facebook, and other social platforms when you connect your
                  accounts to our service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Use of Information */}
          <Card>
            <CardHeader>
              <CardTitle>3. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process transactions and send transaction confirmations</li>
                <li>To communicate with you about your account and services</li>
                <li>To send marketing communications (with your consent)</li>
                <li>To analyze platform usage and improve our services</li>
                <li>To detect and prevent fraud and abuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>4. How We Share Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Service providers who assist us in operating our website and conducting our business</li>
                <li>Payment processors and financial institutions</li>
                <li>Law enforcement or government agencies as required by law</li>
                <li>Business partners with your consent</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties. We do not share personal information with
                third parties for their marketing purposes without your explicit consent.
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle>5. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the Internet or electronic storage is completely secure.
              </p>
              <p>
                We cannot guarantee absolute security of your information. You use our services at your own risk. You
                are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>6. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability (receive your data in a portable format)</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at support@asylic.biz. We will respond within 30 days.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>7. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our platform. You can
                control cookie settings through your browser preferences. However, disabling cookies may affect platform
                functionality.
              </p>
              <p>We use cookies for:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Authentication and security</li>
                <li>Personalization and preferences</li>
                <li>Analytics and performance monitoring</li>
                <li>Advertising and marketing</li>
              </ul>
            </CardContent>
          </Card>

          {/* Children */}
          <Card>
            <CardHeader>
              <CardTitle>8. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If we become aware that a child under 13 has provided us with
                personal information, we will take steps to delete such information immediately.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
              <div className="bg-secondary p-4 rounded-lg mt-4">
                <p className="font-semibold text-foreground">Asylic.biz</p>
                <p>Email: support@asylic.biz</p>
                <p>Website: www.asylic.biz</p>
              </div>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card>
            <CardHeader>
              <CardTitle>10. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. We will notify you of any material changes by updating the
                "Last updated" date above.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card border-t border-border mt-16 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2025 Asylic.biz. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
