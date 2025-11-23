# Testing Guide - MVP Influencer Platform

## Pre-Testing Setup

### 1. Ensure Environment Variables Are Set
\`\`\`bash
# Check .env.local exists and contains:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/influencer_platform
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 2. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

### 3. Access the Application
Navigate to: http://localhost:3000

## Test Scenarios

### Test 1: User Registration - Influencer

**Steps:**
1. Click "Get Started" on home page
2. Click "Join as Influencer"
3. Click "Sign up" at bottom of login form
4. Select "Influencer" option
5. Fill form:
   - Name: "Test Influencer"
   - Email: "influencer@example.com"
   - Password: "Password123!"
   - Confirm: "Password123!"
6. Click "Create Account"

**Expected Result:**
- Account created
- Redirected to /influencer dashboard
- Welcome message displays
- Token stored in localStorage

**Failure Points to Check:**
- Email validation (try invalid email)
- Password strength
- Duplicate email handling

---

### Test 2: User Registration - Brand

**Steps:**
1. Go to home page
2. Click "Sign in as Brand"
3. Click "Sign up" at bottom
4. Select "Brand" option
5. Fill form:
   - Name: "Test Brand"
   - Email: "brand@example.com"
   - Password: "Password123!"
6. Click "Create Account"

**Expected Result:**
- Brand account created
- Redirected to /client dashboard
- Proper role assigned

---

### Test 3: User Login - Influencer

**Steps:**
1. Go to /login
2. Click "Join as Influencer"
3. Enter email: "influencer@example.com"
4. Enter password: "Password123!"
5. Click "Sign In"

**Expected Result:**
- Login successful
- Redirected to /influencer
- Dashboard loads with user data

**Edge Cases:**
- Wrong password → Error message
- Non-existent email → Error message
- Empty fields → Form validation

---

### Test 4: View Dashboard

**Steps (as Influencer):**
1. Login as influencer
2. Wait for dashboard to load
3. Verify elements:
   - Welcome message with user name
   - KPI cards (followers, engagement, reach, wallet)
   - Performance chart
   - Wallet balance card
   - Active campaigns section

**Expected Result:**
- All data loads correctly
- Real data from database displays
- Charts render properly

---

### Test 5: Browse Campaigns

**Steps:**
1. Login as influencer
2. Navigate to Campaigns section
3. Filter by category (All, Travel, Tech, etc.)
4. View campaign details
5. Click "Apply Now"

**Expected Result:**
- Campaigns load from database
- Categories filter works
- Application submitted successfully
- Success message displays

**Error Handling:**
- Duplicate application attempt → Error message
- Network error → Retry option
- 401 Unauthorized → Redirect to login

---

### Test 6: Upload Content

**Steps:**
1. Login as influencer
2. Go to Upload Content
3. Select campaign from dropdown
4. Choose upload method (Manual or Instagram Sync)
5. Enter content details
6. Click "Submit Content"

**Expected Result:**
- Content uploaded to database
- Status shows "pending_review"
- Confirmation message displays
- Redirects to upload success page

**Validation:**
- Empty campaign → Error
- Invalid content URL → Error
- File size limits respected

---

### Test 7: Earnings & Wallet

**Steps:**
1. Login as influencer
2. Go to Earnings page
3. View wallet balance
4. View transaction history
5. Filter by status (All, Pending, Paid)
6. Click "Request Payout"

**Expected Result:**
- Wallet data displays
- Balance calculation correct
- Payout form appears
- Request submitted successfully

**Validation:**
- Insufficient balance → Error message
- Invalid bank details → Error message
- Minimum payout amount enforced

---

### Test 8: Profile Management

**Steps:**
1. Login as influencer
2. Go to Profile section
3. Edit profile information
4. Update stats (followers, engagement rate)
5. Change niche
6. Save changes

**Expected Result:**
- Profile updates saved to database
- Changes reflect immediately
- Success message displays

---

### Test 9: Logout

**Steps:**
1. Login to dashboard
2. Click user menu
3. Click "Logout"

**Expected Result:**
- Token removed from localStorage
- Redirected to home page
- Cannot access protected routes

**Verify:**
- Try accessing /influencer directly
- Should redirect to /login

---

### Test 10: Create Campaign (Brand)

**Steps:**
1. Login as brand user
2. Go to "Create Campaign"
3. Fill campaign details:
   - Title: "Summer Fashion Campaign"
   - Description: "Looking for 5 fashion influencers..."
   - Budget: ₹50,000
   - Deadline: 2025-12-31
   - Category: Fashion
   - Hashtags: #summer #fashion
   - Deliverables: 1 Reel, 2 Stories
4. Click "Create"

**Expected Result:**
- Campaign created in database
- Brand redirected to campaigns list
- Campaign appears in influencer browse
- Success notification

---

## Performance Testing

### Load Test
1. Open DevTools (F12)
2. Go to Network tab
3. Perform actions:
   - Load dashboard
   - Filter campaigns
   - Upload content
4. Check metrics:
   - Page load time: < 2 seconds
   - API response time: < 500ms
   - JavaScript bundle: < 200kb (gzipped)

### Mobile Testing
1. Open DevTools
2. Click device emulation (Ctrl+Shift+M)
3. Test with iPhone 12 / Android devices
4. Verify:
   - Responsive layout
   - Touch interactions work
   - Forms are usable
   - Images scale properly

---

## Security Testing

### Authentication
1. Try accessing `/influencer` without login
   - Should redirect to /login
2. Try API call without Authorization header
   - Should return 401
3. Try API call with invalid token
   - Should return 401

### Input Validation
1. Try SQLi payload in login form
   - Should be sanitized
2. Try XSS payload in profile bio
   - Should be escaped
3. Try very long inputs
   - Should be validated and limited

### Password Security
1. Verify passwords are hashed in database
   - Connect to MongoDB and check
2. Verify password never sent in response
3. Try weak password ("123")
   - Should show validation error

---

## Data Integrity Testing

### Test with MongoDB
\`\`\`bash
# Connect to MongoDB
mongosh "mongodb+srv://user:password@cluster.mongodb.net/"

# Verify collections exist
show collections

# Check user data
db.users.findOne()

# Verify indexes
db.users.getIndexes()
\`\`\`

---

## API Testing with cURL

### Register User
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Password123!",
    "role": "influencer"
  }'
\`\`\`

### Login User
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
\`\`\`

### Get User Profile
\`\`\`bash
curl -X GET http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

### Get Campaigns
\`\`\`bash
curl -X GET "http://localhost:3000/api/campaigns?category=all" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

---

## Common Issues & Solutions

### Issue: "MongoDB connection failed"
**Solution:**
1. Verify MONGODB_URI in .env.local
2. Check MongoDB Atlas IP whitelist
3. Verify database user exists
4. Test connection with mongosh

### Issue: "Invalid token"
**Solution:**
1. Ensure JWT_SECRET is set
2. Login again to get new token
3. Clear localStorage
4. Check token format (Bearer prefix)

### Issue: "Campaign not showing"
**Solution:**
1. Verify campaign is in database
2. Check campaign.status = "active"
3. Verify user role permissions
4. Check category filter

### Issue: "Payout request failed"
**Solution:**
1. Check user wallet balance
2. Verify minimum payout amount
3. Validate bank details format
4. Check database transaction

---

## Sign-Off Checklist

- [ ] All registration flows work
- [ ] Login/logout functional
- [ ] Dashboard displays user data
- [ ] Campaign browsing works
- [ ] Campaign apply works
- [ ] Content upload works
- [ ] Earnings page loads
- [ ] Payout requests work
- [ ] Profile updates save
- [ ] Mobile responsive
- [ ] API authentication working
- [ ] Error messages display
- [ ] No console errors
- [ ] Database data persists
- [ ] Performance acceptable

---

## Next Testing Phase

After MVP approval:
1. Unit tests for API routes
2. Integration tests for workflows
3. E2E tests with Cypress/Playwright
4. Performance testing with k6
5. Security audit by third party
6. Load testing before production
