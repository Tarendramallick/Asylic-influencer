export async function getInstagramAccessTokenDirect(code: string) {
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
  const clientSecret = process.env.INSTAGRAM_APP_SECRET
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!clientId || !clientSecret || !appUrl) {
    throw new Error("Missing Instagram configuration (APP_ID, APP_SECRET, or APP_URL)")
  }

  const redirectUri = `${appUrl}/api/auth/instagram/callback`

  try {
    console.log("[v0] Exchanging Instagram authorization code for access token")
    console.log("[v0] Token exchange params - clientId:", clientId, "redirectUri:", redirectUri)

    const params = {
      client_id: clientId,
      client_secret: clientSecret,
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
      console.error("[v0] Instagram token error response:")
      console.error("[v0] Status:", response.status)
      console.error("[v0] Full response:", JSON.stringify(data, null, 2))
      const errorMessage = data.error?.message || data.error?.type || "Token exchange failed"
      throw new Error(`Instagram OAuth failed: ${errorMessage}`)
    }

    console.log("[v0] Successfully obtained Instagram access token")
    return data.access_token
  } catch (error) {
    console.error("[v0] Instagram direct token exchange error:", error)
    throw error
  }
}

export async function getInstagramAccessToken(code: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!appUrl) {
    throw new Error("Missing NEXT_PUBLIC_APP_URL environment variable")
  }

  try {
    console.log("[v0] Requesting Instagram access token via server action")

    const response = await fetch(`${appUrl}/api/auth/instagram/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Instagram token error response:", JSON.stringify(data, null, 2))
      const errorMessage = data.error?.message || data.error?.type || "Unknown error"
      throw new Error(`Instagram OAuth failed: ${errorMessage}`)
    }

    console.log("[v0] Successfully obtained Instagram access token")
    return data.access_token
  } catch (error) {
    console.error("[v0] Instagram token error:", error)
    throw error
  }
}

export async function getInstagramProfile(accessToken: string) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v20.0/me?fields=id,username,name,biography,profile_picture_url,followers_count,follows_count,media_count,website&access_token=${accessToken}`,
    )

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Instagram profile error response:", JSON.stringify(data, null, 2))
      throw new Error(data.error?.message || "Failed to fetch profile")
    }

    console.log("[v0] Successfully fetched Instagram profile:", data.username)
    return data
  } catch (error) {
    console.error("[v0] Instagram profile error:", error)
    throw error
  }
}

export async function getInstagramInsights(userId: string, accessToken: string) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v18.0/${userId}/insights?metric=impressions,reach,profile_views&period=day&access_token=${accessToken}`,
    )

    if (!response.ok) throw new Error("Failed to fetch insights")
    return await response.json()
  } catch (error) {
    console.error("[v0] Instagram insights error:", error)
    throw error
  }
}

export async function getInstagramMedia(accessToken: string) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v18.0/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&access_token=${accessToken}`,
    )

    if (!response.ok) throw new Error("Failed to fetch media")
    return await response.json()
  } catch (error) {
    console.error("[v0] Instagram media error:", error)
    throw error
  }
}
