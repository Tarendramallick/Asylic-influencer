# Asylic.in - Influencer Marketing Platform

A complete, professional web-based influencer marketing platform connecting brands with authentic creators.

## Features

### For Influencers
- **Dashboard** - Performance metrics, wallet balance, active campaigns at a glance
- **Campaign Discovery** - Browse and apply to relevant brand partnerships with smart filtering
- **Content Upload** - Manual upload or auto-detect content from Instagram
- **Earnings Management** - Track earnings, pending payments, and request payouts
- **Profile Management** - Complete profile setup and account settings
- **Real-time Analytics** - Track followers, engagement, reach, and growth trends

### For Brands
- **Campaign Creation** - Create and manage influencer marketing campaigns
- **Influencer Management** - Browse, filter, and connect with relevant creators
- **Application Management** - Review and manage influencer applications
- **Content Review** - Verify and approve campaign deliverables
- **Analytics Dashboard** - Track campaign performance and ROI
- **Payment Management** - Manage payments and payout schedules

### For Admins
- **User Management** - Manage influencers, brands, and platform users
- **Campaign Oversight** - Monitor all campaigns and manage disputes
- **Verification Queue** - Review and verify user profiles
- **Payment Processing** - Process and track all platform payments
- **System Analytics** - Platform metrics, user analytics, and health monitoring
- **Reports & Insights** - Comprehensive reporting and dispute resolution

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS v4
- **Charts & Data**: Recharts
- **Icons**: lucide-react
- **Forms**: React Hook Form with Zod validation
- **Authentication**: Role-based access control (Influencer, Brand, Admin)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
app/
├── page.tsx                 # Home landing page
├── login/                   # Authentication
│   ├── page.tsx
│   └── loading.tsx
├── influencer/              # Influencer portal
│   ├── layout.tsx
│   ├── page.tsx (dashboard)
│   ├── campaigns/
│   ├── upload/
│   ├── earnings/
│   ├── profile/
│   └── profile-setup/
├── client/                  # Brand/Client portal
│   ├── page.tsx (dashboard)
│   ├── campaigns/
│   ├── applications/
│   ├── analytics/
│   ├── payments/
│   └── settings/
└── admin/                   # Admin panel
    └── page.tsx

components/
├── influencer/             # Influencer portal components
├── client/                # Brand portal components
├── admin/                 # Admin panel components
└── ui/                    # shadcn/ui components
\`\`\`

## Authentication

The platform uses role-based authentication:

1. **Influencer** - Content creators and influencers
2. **Brand** - Companies and marketing teams
3. **Admin** - Platform administrators

Login credentials are simulated for demo purposes. Replace with your authentication backend when deploying.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Configure environment variables if needed
4. Deploy!

The app is optimized for Vercel deployment and includes Analytics.

### Environment Variables

Create a `.env.local` file (not needed for demo):

\`\`\`
# Add any required environment variables here
NEXT_PUBLIC_API_URL=your-api-url
\`\`\`

## Responsive Design

- **Mobile** - Optimized for phones and tablets with drawer navigation
- **Desktop** - Full sidebar navigation and expanded layouts
- **Tablet** - Responsive grid layouts adapt to medium screens

## Performance

- Server-side rendering for optimal SEO
- Image optimization with Next.js Image component
- CSS-in-JS with Tailwind for minimal bundle size
- Code splitting and lazy loading for routes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is proprietary software.

## Support

For support, email support@asylic.in or visit our website.

---

**Built with v0** | Powered by Vercel
