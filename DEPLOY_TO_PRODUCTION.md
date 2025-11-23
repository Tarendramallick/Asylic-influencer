# Deploy Influencer Platform to Production

## Phase 1: Pre-Deployment (Day 1)

### 1.1 Final Testing
\`\`\`bash
# Run all tests
npm run dev

# Test on localhost:3000
# Follow TEST_GUIDE.md completely
\`\`\`

### 1.2 Production Environment Variables

Create production values (update in Vercel dashboard):

\`\`\`
MONGODB_URI=mongodb+srv://prod-user:strong-password@production-cluster.mongodb.net/influencer_platform_prod
JWT_SECRET=$(openssl rand -base64 32)  # Generate new secure key
NEXT_PUBLIC_APP_URL=https://yourdomain.com
\`\`\`

### 1.3 MongoDB Production Setup

\`\`\`bash
# In MongoDB Atlas:
1. Create production cluster
2. Enable automatic backups
3. Create dedicated database user
4. Set IP whitelist to include Vercel IPs:
   - 76.75.126.0/24
   - 99.86.1.0/24
5. Create database: influencer_platform_prod
\`\`\`

---

## Phase 2: GitHub Setup (Day 1)

### 2.1 Initialize Repository

\`\`\`bash
cd your-project
git init
git add .
git commit -m "Production MVP - Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/influencer-platform
git push -u origin main
\`\`\`

### 2.2 .gitignore

Ensure these files are excluded:
\`\`\`
.env.local
node_modules/
.next/
dist/
*.log
\`\`\`

---

## Phase 3: Vercel Deployment (Day 1-2)

### 3.1 Connect to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your GitHub repository
5. Click "Import"

### 3.2 Configure Project

**Framework Preset:** Next.js
**Root Directory:** ./
**Build Command:** npm run build
**Output Directory:** .next

### 3.3 Add Environment Variables

In Vercel dashboard:

**Environment:** Production

- `MONGODB_URI` = Your production MongoDB connection string
- `JWT_SECRET` = Your generated secure secret
- `NEXT_PUBLIC_APP_URL` = https://yourdomain.com

Click "Deploy"

### 3.4 Monitor Deployment

- Watch deployment logs
- Wait for "Deployment Complete" message
- Note your production URL (e.g., your-project.vercel.app)

---

## Phase 4: Domain Setup (Day 2)

### 4.1 Add Custom Domain

In Vercel dashboard → Settings → Domains:

1. Click "Add"
2. Enter your domain (yourdomain.com)
3. Follow DNS configuration steps
4. Add nameservers or CNAME records

### 4.2 SSL Certificate

- Automatically provisioned by Vercel
- Valid within 24 hours
- Auto-renews

---

## Phase 5: Post-Deployment Testing (Day 2)

### 5.1 Health Check

\`\`\`bash
# Test production URL
curl https://yourdomain.com

# Check API
curl https://yourdomain.com/api/campaigns
# Should return 401 (need auth)

# Check status page
curl -I https://yourdomain.com
# Should return 200
\`\`\`

### 5.2 Functional Testing

On production domain:

1. Register new account
2. Login
3. Browse campaigns
4. Apply to campaign
5. Upload content
6. Request payout

### 5.3 Database Verification

\`\`\`bash
# Connect to production MongoDB
mongosh "mongodb+srv://prod-user:password@production-cluster.mongodb.net/influencer_platform_prod"

# Check data
use influencer_platform_prod
db.users.count()      # Should > 0 after registration
db.campaigns.count()  # Should > 0
db.applications.count() # Should > 0
\`\`\`

### 5.4 Performance Check

Using Vercel Analytics:
1. Dashboard → Analytics
2. Verify:
   - TTFB (Time to First Byte) < 200ms
   - LCP (Largest Contentful Paint) < 2.5s
   - CLS (Cumulative Layout Shift) < 0.1

---

## Phase 6: Security Hardening (Day 2-3)

### 6.1 Security Headers

Vercel automatically adds:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### 6.2 CORS Configuration

Update in production if needed:
\`\`\`javascript
// next.config.mjs - Add if required
const config = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ]
  },
}
export default config
\`\`\`

### 6.3 Rate Limiting

\`\`\`bash
npm install express-rate-limit
\`\`\`

Add to API routes:
\`\`\`typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

export const config = {
  api: {
    bodyParser: { sizeLimit: '4mb' }
  }
}

// Apply to routes
export default limiter(handler)
\`\`\`

---

## Phase 7: Monitoring Setup (Day 3)

### 7.1 Error Tracking (Sentry)

\`\`\`bash
npm install @sentry/nextjs
\`\`\`

Create `sentry.client.config.ts`:
\`\`\`typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
\`\`\`

### 7.2 Email Monitoring

Setup SendGrid for notifications:
\`\`\`bash
npm install @sendgrid/mail
\`\`\`

### 7.3 Uptime Monitoring

- Use UptimeRobot (free tier available)
- Configure to ping every 5 minutes
- Setup alerts on downtime

---

## Phase 8: Database Backup (Day 3)

### 8.1 MongoDB Atlas Backups

1. Go to MongoDB Atlas dashboard
2. Click Backup → Backup Policy
3. Set to "Daily"
4. Retention: 30 days
5. Enable point-in-time recovery

### 8.2 Manual Backup

\`\`\`bash
# Export production data
mongodump --uri="mongodb+srv://user:password@cluster.mongodb.net/influencer_platform_prod" --out=./backups
\`\`\`

---

## Phase 9: Documentation (Day 3)

Create runbooks for:

### 9.1 Emergency Procedures
- Rollback procedure
- Database recovery
- User support escalation

### 9.2 Maintenance Windows
- Scheduled maintenance process
- Communication plan
- Rollback strategy

---

## Phase 10: Launch! (Day 4)

### 10.1 Soft Launch

1. Email existing beta users
2. Announce on social media
3. Monitor closely (first 24 hours)
4. Have team on standby

### 10.2 Production Runbook

Keep accessible:
- Emergency contacts
- Monitoring dashboard links
- Rollback instructions
- Common issues & solutions

---

## Post-Launch Checklist

- [ ] Email notifications working
- [ ] All users can login
- [ ] Campaigns loading correctly
- [ ] Payouts processing
- [ ] No critical errors in Sentry
- [ ] Performance metrics normal
- [ ] Database backups confirmed
- [ ] SSL certificate valid
- [ ] Custom domain working
- [ ] Analytics tracking

---

## Rollback Procedure (If Needed)

### Immediate Rollback

\`\`\`bash
# In Vercel dashboard:
1. Go to Deployments
2. Find last stable deployment
3. Click the 3-dot menu
4. Select "Promote to Production"
\`\`\`

### Verify Rollback

\`\`\`bash
curl -I https://yourdomain.com
# Should return 200

# Check API
curl https://yourdomain.com/api/campaigns
\`\`\`

---

## Success Metrics

Track first week:
- Daily active users
- Signup rate
- Campaign applications
- Payout requests
- Error rate
- Page load time
- Uptime percentage

---

## Support Contacts

Keep these handy:
- Vercel Support: https://vercel.com/support
- MongoDB Support: https://support.mongodb.com
- Your team lead: [Contact info]
- On-call engineer: [Contact info]

---

## Post-Launch (Week 1-2)

### Daily
- Monitor error logs
- Check performance
- Review user feedback
- Verify backups

### Weekly
- Analyze metrics
- Plan improvements
- Security audit
- Performance optimization

---

## Celebrate Success! 🚀

Congratulations! Your influencer marketing platform is live!

Next steps after launch:
1. Gather user feedback
2. Monitor analytics
3. Plan Phase 2 features
4. Setup marketing campaigns
\`\`\`
