# Instagram OAuth Setup Guide

## Prerequisites
1. Facebook Developer Account
2. Instagram Business Account
3. Created App on Facebook Developers Console

## Setup Steps

### 1. Facebook App Configuration
- Go to [Facebook Developers Console](https://developers.facebook.com)
- Create a new app or use existing one
- Add "Instagram Graph API" product to your app
- Go to Settings > Basic and copy App ID and App Secret

### 2. OAuth Configuration
- Go to Instagram Graph API Settings
- Add Valid OAuth Redirect URIs:
  \`\`\`
  http://localhost:3000/api/auth/instagram/callback (development)
  https://yourdomain.com/api/auth/instagram/callback (production)
  \`\`\`

### 3. Environment Variables
Add to `.env.local`:
\`\`\`
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
\`\`\`

### 4. Test Login
1. Click "Continue with Instagram" on login page
2. Authorize the app
3. User profile data syncs automatically

## Real Data Fetched
- Username, followers, following count
- Bio, profile picture, website
- Post count, engagement metrics
- Media/post history
- Audience insights (impressions, reach, profile views)

## API Endpoints
- `/api/auth/instagram` - Initiates OAuth flow
- `/api/auth/instagram/callback` - OAuth callback handler
- `/api/analytics` - Fetches Instagram analytics
