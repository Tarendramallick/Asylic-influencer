# Production MVP Setup Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier available)
- npm or yarn package manager

## Step 1: MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with strong password
4. Get connection string (click Connect > Drivers > Node.js)
5. Copy the connection string format: `mongodb+srv://username:password@cluster.mongodb.net/influencer_platform?retryWrites=true&w=majority`

## Step 2: Environment Configuration

1. Copy `.env.local.example` to `.env.local`
2. Replace `your_mongodb_atlas_connection_string_here` with your actual MongoDB connection string
3. Replace `your-super-secret-jwt-key-change-this-in-production` with a secure random string (use `openssl rand -base64 32` to generate)

## Step 3: Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

## Step 4: Run Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Visit `http://localhost:3000` in your browser.

## Step 5: Test the Application

### Test Influencer Account
1. Go to http://localhost:3000
2. Click "Join as Influencer" or click "Get Started"
3. Click "Sign up"
4. Create account with role "influencer"
5. Test credentials:
   - Email: influencer@example.com
   - Password: password123

### Test Brand Account
1. Go to http://localhost:3000/login
2. Click "Continue as Brand"
3. Create account with role "brand"
4. Test credentials:
   - Email: brand@example.com
   - Password: password123

### Test Admin Account (Simulated)
1. Go to http://localhost:3000/login
2. Click "Admin Access" (currently simulation only)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with credentials

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Campaigns
- `GET /api/campaigns` - Get available campaigns
- `POST /api/campaigns` - Create new campaign (brands only)
- `POST /api/campaigns/[id]/apply` - Apply to campaign (influencers only)

### Content & Uploads
- `POST /api/content/upload` - Upload campaign content

### Earnings & Payouts
- `GET /api/earnings` - Get earnings info
- `POST /api/payouts/request` - Request payout
- `GET /api/payouts/history` - Get payout history

## Authentication Flow

All API requests (except auth endpoints) require `Authorization: Bearer <token>` header.

Tokens are:
- Generated on login/registration
- Valid for 7 days
- Stored in localStorage on client
- Include user ID, email, and role

## Database Schema

### Collections
1. **users** - User accounts with profiles and wallets
2. **campaigns** - Marketing campaigns created by brands
3. **applications** - Influencer applications to campaigns
4. **content** - Uploaded content for campaigns
5. **earnings** - Earnings records
6. **payouts** - Payout requests and history
7. **messages** - Messages between users (future)

## Deployment

### Deploy to Vercel
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your_github_repo_url
git push -u origin main
\`\`\`

Then:
1. Go to https://vercel.com
2. Import your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy

### Production Checklist
- [ ] Set strong JWT_SECRET in production
- [ ] Use production MongoDB URI
- [ ] Enable HTTPS
- [ ] Set NEXT_PUBLIC_APP_URL to production domain
- [ ] Configure CORS if needed
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Enable rate limiting
- [ ] Set up automated backups for MongoDB
- [ ] Configure email service for notifications
- [ ] Set up payment processing (Stripe)

## Troubleshooting

### MongoDB Connection Error
- Verify connection string is correct
- Check MongoDB IP whitelist includes your IP
- Ensure database user has correct permissions

### JWT Token Issues
- Clear localStorage and login again
- Verify JWT_SECRET matches between sessions
- Check token expiration (7 days)

### API 401 Unauthorized
- Check Authorization header format: `Bearer <token>`
- Verify token is valid and not expired
- Try logging out and logging back in

## Support
For issues or questions, check:
- API error messages in browser console
- Server logs: `npm run dev` output
- MongoDB logs in Atlas dashboard
