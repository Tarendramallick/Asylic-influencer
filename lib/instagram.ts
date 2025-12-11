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
      console.error("[v0] Instagram token error:", JSON.stringify(data, null, 2))
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

export async function publishContentToInstagram(
  accessToken: string,
  contentUrl: string,
  caption: string,
  hashtags: string[] = [],
) {
  try {
    // Get user ID first
    const profileResponse = await fetch(`https://graph.instagram.com/v20.0/me?fields=id&access_token=${accessToken}`)
    const profileData = await profileResponse.json()
    const userId = profileData.id

    if (!userId) {
      throw new Error("Unable to get Instagram user ID")
    }

    // Prepare caption with hashtags
    const fullCaption = hashtags.length > 0 ? `${caption} ${hashtags.join(" ")}` : caption

    // For now, we'll create a container for the upload
    // In production, you'd need to upload video/image first
    const containerResponse = await fetch(`https://graph.instagram.com/v20.0/${userId}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        media_type: contentUrl.includes("video") || contentUrl.includes("mp4") ? "VIDEO" : "IMAGE",
        video_url: contentUrl,
        image_url: contentUrl,
        caption: fullCaption,
        access_token: accessToken,
      }).toString(),
    })

    const containerData = await containerResponse.json()

    if (!containerResponse.ok) {
      console.error("[v0] Instagram container error:", containerData)
      throw new Error(containerData.error?.message || "Failed to create media container")
    }

    const containerId = containerData.id

    // Publish the container
    const publishResponse = await fetch(`https://graph.instagram.com/v20.0/${userId}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        creation_id: containerId,
        access_token: accessToken,
      }).toString(),
    })

    const publishData = await publishResponse.json()

    if (!publishResponse.ok) {
      console.error("[v0] Instagram publish error:", publishData)
      throw new Error(publishData.error?.message || "Failed to publish to Instagram")
    }

    console.log("[v0] Successfully published content to Instagram:", publishData)

    return {
      postId: publishData.id,
      url: `https://instagram.com/p/${publishData.id}`,
    }
  } catch (error) {
    console.error("[v0] Instagram publishing error:", error)
    throw error
  }
}
