import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Asylic.in - Influencer Marketing Platform",
  description:
    "Connect with authentic influencers and brands. Manage campaigns, track analytics, and scale your influence effortlessly.",
  keywords: "influencer, marketing, campaigns, content creation, brand partnerships",
  authors: [{ name: "Asylic.in" }],
  generator: "v0.app",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Asylic.in - Influencer Marketing Platform",
    description: "The complete platform for influencer marketing success",
    type: "website",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
