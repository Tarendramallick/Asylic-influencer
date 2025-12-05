import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { code } = await request.json()

  if (!code) {
    return NextResponse.json({ error: "No authorization code provided" }, { status: 400 })
  }

  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
  const clientSecret = process.env.INSTAGRAM_APP_SECRET // Use non-public environment variable
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!clientId || !clientSecret || !appUrl) {
    console.error("[v0] Missing Instagram configuration")
    return NextResponse.json({ error: "Instagram configuration missing" }, { status: 500 })
  }

  const redirectUri = `${appUrl}/api/auth/instagram/callback`

  try {
    console.log("[v0] Server-side token exchange")

    const params = {
      client_id: clientId,
      client_secret: clientSecret, // Client secret is now only on server
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code,
    }

    const response = await fetch("https://graph.instagram.com/v20.0/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params).toString(),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Instagram token error:", JSON.stringify(data, null, 2))
      return NextResponse.json({ error: data.error?.message || "Token exchange failed" }, { status: response.status })
    }

    return NextResponse.json({ access_token: data.access_token })
  } catch (error) {
    console.error("[v0] Token exchange error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Token exchange failed" },
      { status: 500 },
    )
  }
}
