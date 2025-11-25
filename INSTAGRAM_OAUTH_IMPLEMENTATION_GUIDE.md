# Complete Instagram OAuth Implementation Guide

## Step-by-Step Setup

### Part 1: Facebook Developer Console

1. Go to https://developers.facebook.com
2. Create new app or select existing
3. Choose "Business" as app type
4. Add "Instagram Graph API" product
5. Go to Settings > Basic
6. Copy App ID and App Secret

### Part 2: Instagram OAuth Configuration

1. In your app, go to Instagram Graph API > Settings
2. Set OAuth Redirect URIs:
   - Development: `http://localhost:3000/api/auth/instagram/callback`
   - Production: `https://yourdomain.com/api/auth/instagram/callback`

3. Set Instagram Basic Display scope: `instagram_business_basic`
4. Set Instagram Graph API scope: `instagram_business_content_publish`

### Part 3: Environment Setup

Add to `.env.local`:
\`\`\`
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_app_id_here
INSTAGRAM_APP_SECRET=your_app_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

Add to Vercel (Production):
\`\`\`
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_production_app_id
INSTAGRAM_APP_SECRET=your_production_app_secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com
\`\`\`

### Part 4: Test Instagram Login

1. Run dev server: `npm run dev`
2. Go to http://localhost:3000/login
3. Select "Join as Influencer"
4. Click "Continue with Instagram"
5. Authorize the app
6. Should redirect to dashboard with Instagram data

## How It Works

1. User clicks "Continue with Instagram"
2. Redirected to `/api/auth/instagram`
3. Instagram shows authorization screen
4. User grants permissions
5. Instagram redirects to `/api/auth/instagram/callback`
6. App exchanges code for access token
7. Fetches Instagram profile data
8. Creates/updates user in MongoDB
9. Generates JWT token
10. Redirects to dashboard

## Data Retrieved

When user logs in with Instagram:
- Username, name, bio
- Profile picture URL
- Followers, following count
- Post count
- Access token for future API calls
- All stored in MongoDB user record

## Real-Time Sync

Every time user logs in:
- Follower count updates
- Following count updates
- Post count updates
- Access token refreshes

## Troubleshooting

### "Invalid OAuth Redirect URI"
- Check redirect URI matches in Facebook app settings
- Include trailing slash if needed
- Verify app is in Development or Live mode

### "Invalid App ID"
- Verify NEXT_PUBLIC_INSTAGRAM_APP_ID is correct
- Check it matches in Facebook Developer Console

### "Invalid App Secret"
- Verify INSTAGRAM_APP_SECRET is correct
- Keep it secret (never commit to git)

### User data not syncing
- Check MongoDB connection
- Verify JWT_SECRET is set
- Check API response in network tab

## Security Notes

✓ App ID is public (NEXT_PUBLIC_)
✗ App Secret must be secret (server-side only)
✓ Access tokens stored securely in MongoDB
✓ JWT tokens validate all requests
✓ User ID verification on protected endpoints

## Next: Enable Analytics

Once Instagram login works:
1. User's Instagram data available
2. Real-time engagement metrics
3. Post performance tracking
4. Audience insights
5. Daily analytics dashboard

## Support

For issues:
1. Check browser console for errors
2. Check server logs in Vercel
3. Verify environment variables
4. Test callback URL is accessible
5. Check MongoDB connection

---

Ready for Instagram OAuth! ✅
