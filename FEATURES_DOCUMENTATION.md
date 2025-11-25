# Production Features Documentation

## 1. Instagram OAuth Login
**Endpoint**: `/api/auth/instagram`
**Description**: Real-time Instagram profile sync with automatic follower tracking
**Data Synced**:
- Profile info (username, name, bio, followers, following)
- Access token for API calls
- Post count and engagement metrics

## 2. Real-Time Messaging
**Endpoints**: 
- `GET /api/messages?recipientId=xxx` - Fetch conversation
- `POST /api/messages` - Send message

**Features**:
- Direct messaging between brands and influencers
- Message history tracking
- Read/unread status

## 3. Notification Center
**Endpoints**:
- `GET /api/notifications` - Fetch all notifications
- `PATCH /api/notifications` - Mark as read

**Notifications For**:
- New campaign applications
- Campaign approvals/rejections
- Message received
- Payout approved
- Content review feedback

## 4. Advanced Analytics
**Endpoint**: `GET /api/analytics`
**Real Data**:
- Instagram followers, reach, impressions
- Engagement rate (likes + comments per post)
- Post performance metrics
- Daily, weekly, monthly insights

## 5. Content Scheduling
**Endpoints**:
- `GET /api/schedule` - Fetch scheduled content
- `POST /api/schedule` - Schedule new content

**Features**:
- Schedule content for future posting
- Track scheduled vs. published
- Auto-sync with campaigns

## 6. Influencer Verification
**Endpoints**:
- `GET /api/verification` - Check verification status
- `POST /api/verification` - Submit verification documents

**Process**:
- Submit ID and brand verification docs
- Admin review and approval
- Verified badge on profile

## 7. Performance Reports
**Endpoint**: `GET /api/reports?type=monthly|quarterly|yearly`
**Reports Include**:
- Total applications received
- Approval rate
- Total earnings by period
- Average earnings per campaign
- Campaign performance trends

## All Endpoints Require JWT Authentication
Include in header: `Authorization: Bearer <token>`
