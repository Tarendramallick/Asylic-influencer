import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Anton } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
})

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
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${anton.variable}`}
    >
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
