import { NextResponse } from "next/server"

export function GET() {
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!clientId) {
    console.error("[v0] Missing NEXT_PUBLIC_INSTAGRAM_APP_ID environment variable")
    return NextResponse.json(
      { error: "Instagram app is not configured. Please add NEXT_PUBLIC_INSTAGRAM_APP_ID to environment variables." },
      { status: 500 },
    )
  }

  if (!appUrl) {
    console.error("[v0] Missing NEXT_PUBLIC_APP_URL environment variable")
    return NextResponse.json(
      { error: "App URL is not configured. Please add NEXT_PUBLIC_APP_URL to environment variables." },
      { status: 500 },
    )
  }

  const redirectUri = `${appUrl}/api/auth/instagram/callback`
  const scope =
    "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights"

  try {
    const authUrl = new URL("https://www.instagram.com/oauth/authorize")
    authUrl.searchParams.set("client_id", clientId)
    authUrl.searchParams.set("redirect_uri", redirectUri)
    authUrl.searchParams.set("scope", scope)
    authUrl.searchParams.set("response_type", "code")

    console.log("[v0] Instagram OAuth redirect URL constructed")
    console.log("[v0] App URL:", appUrl)
    console.log("[v0] Redirect URI:", redirectUri)
    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error("[v0] Instagram auth route error:", error)
    return NextResponse.json({ error: "Failed to initiate Instagram login" }, { status: 500 })
  }
}
