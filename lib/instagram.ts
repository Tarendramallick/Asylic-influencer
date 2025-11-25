export async function getInstagramAccessToken(code: string) {
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
  const clientSecret = process.env.INSTAGRAM_APP_SECRET
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`

  try {
    const response = await fetch("https://graph.instagram.com/v18.0/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code,
      }).toString(),
    })

    if (!response.ok) throw new Error("Failed to get access token")
    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error("[v0] Instagram token error:", error)
    throw error
  }
}

export async function getInstagramProfile(accessToken: string) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v18.0/me?fields=id,username,name,biography,profile_picture_url,followers_count,follows_count,media_count,website&access_token=${accessToken}`,
    )

    if (!response.ok) throw new Error("Failed to fetch profile")
    return await response.json()
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
