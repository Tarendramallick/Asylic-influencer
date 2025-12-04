"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: December 2, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Agreement */}
          <Card>
            <CardHeader>
              <CardTitle>1. Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                By accessing and using asylic.biz (the "Service"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle>2. Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                You must be at least 18 years of age to use this service. By using asylic.biz, you represent and warrant
                that you are at least 18 years old and have the legal capacity to enter into this agreement.
              </p>
            </CardContent>
          </Card>

          {/* Account Registration */}
          <Card>
            <CardHeader>
              <CardTitle>3. Account Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>You are responsible for:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>Providing accurate and complete information during registration</li>
                <li>Updating information as necessary to keep it current and accurate</li>
                <li>All activities that occur under your account</li>
              </ul>
              <p className="mt-4">
                You agree to notify us immediately of any unauthorized use of your account or any other breach of
                security.
              </p>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card>
            <CardHeader>
              <CardTitle>4. User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use the service for any unlawful purpose or in violation of any applicable laws</li>
                <li>Harass, abuse, or threaten other users</li>
                <li>Upload or transmit viruses or any other malicious code</li>
                <li>Collect or track personal information of others without consent</li>
                <li>Spam or send unsolicited communications</li>
                <li>Attempt to gain unauthorized access to the service</li>
                <li>Engage in any form of fraud or deception</li>
                <li>Infringe on intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content Ownership */}
          <Card>
            <CardHeader>
              <CardTitle>5. Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                You retain all ownership rights to content you create and upload to asylic.biz. By uploading content, you
                grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content
                for the purpose of operating and promoting our service.
              </p>
              <p className="mt-4">
                You represent and warrant that your content does not infringe on any third-party intellectual property
                rights and that you have all necessary rights to grant this license.
              </p>
            </CardContent>
          </Card>

          {/* Platform Content */}
          <Card>
            <CardHeader>
              <CardTitle>6. Service Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                All content provided on asylic.biz, including text, graphics, logos, and software, is the property of
                asylic.biz or our content suppliers and is protected by international copyright laws. You may not
                reproduce, distribute, or transmit any content without our prior written permission.
              </p>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle>7. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Payments for services are due as specified in your campaign agreement or invoice. All prices are in USD
                unless otherwise specified. By providing payment information, you authorize us to charge your account.
              </p>
              <p className="mt-4">We reserve the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Change pricing with 30 days' notice</li>
                <li>Suspend or terminate service for non-payment</li>
                <li>Decline transactions that we believe are fraudulent</li>
              </ul>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card>
            <CardHeader>
              <CardTitle>8. Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Refunds for services may be issued in accordance with the terms of your specific campaign or service
                agreement. Refund requests must be submitted within 30 days of payment. asylic.biz reserves the right to
                deny refund requests that do not comply with our refund policy.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle>9. Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                asylic.biz IS PROVIDED ON AN "AS-IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED,
                REGARDING THE SERVICE, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
                NON-INFRINGEMENT.
              </p>
              <p className="mt-4">
                We do not warrant that the service will be uninterrupted, secure, or error-free, or that defects will be
                corrected.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>10. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                IN NO EVENT SHALL asylic.biz BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES
                ARISING OUT OF OR IN CONNECTION WITH THE SERVICE OR THIS AGREEMENT, EVEN IF ADVISED OF THE POSSIBILITY
                OF SUCH DAMAGES.
              </p>
            </CardContent>
          </Card>

          {/* Indemnification */}
          <Card>
            <CardHeader>
              <CardTitle>11. Indemnification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                You agree to indemnify and hold asylic.biz harmless from any claims, damages, losses, or expenses arising
                from your use of the service or breach of these terms, including claims by third parties related to your
                content or conduct.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>12. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                asylic.biz may terminate or suspend your account and access to the service immediately, without prior
                notice or liability, if you violate any term of this agreement or engage in any conduct that we deem
                harmful to our service or other users.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>13. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We may revise these terms at any time. Changes become effective upon posting to the website. Your
                continued use of the service following changes constitutes your acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>14. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                These terms are governed by and construed in accordance with the laws of India, without regard to its
                conflict of law provisions. Any legal action or proceeding relating to this agreement shall be
                exclusively subject to the jurisdiction of the courts in India.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>15. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>For questions about these Terms of Service, please contact us at:</p>
              <div className="bg-secondary p-4 rounded-lg mt-4">
                <p className="font-semibold text-foreground">asylic.biz</p>
                <p>Email: support@asylic.biz</p>
                <p>Website: www.asylic.biz</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card border-t border-border mt-16 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2025 asylic.biz. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
