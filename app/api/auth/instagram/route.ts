import { NextResponse } from "next/server"

export function GET() {
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`
  const scope = "user_profile,instagram_business_basic,instagram_business_content_publish"

  const authUrl = new URL("https://api.instagram.com/oauth/authorize")
  authUrl.searchParams.set("client_id", clientId!)
  authUrl.searchParams.set("redirect_uri", redirectUri)
  authUrl.searchParams.set("scope", scope)
  authUrl.searchParams.set("response_type", "code")

  return NextResponse.redirect(authUrl.toString())
}
