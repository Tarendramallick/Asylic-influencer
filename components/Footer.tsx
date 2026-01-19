import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-gray-400 pt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* LOCATIONS */}
          <div className="space-y-10">
            <div>
              <h4 className="text-white font-semibold mb-2">Toronto, CA</h4>
              <p className="text-sm">
                140 Simcoe St, Toronto<br />
                ON M5H 4E9 Canada
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Tallinn, EE</h4>
              <p className="text-sm">
                Aia tn 10a–9, 10111<br />
                Tallinn, Estonia
              </p>
            </div>

            {/* SOCIALS */}
            <div className="flex gap-4 pt-4">
              <Link href="#" className="hover:text-white">LinkedIn</Link>
              <Link href="#" className="hover:text-white">YouTube</Link>
              <Link href="#" className="hover:text-white">TikTok</Link>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">ROI Newsletter</Link></li>
              <li className="flex items-center gap-2">
                <Link href="#">Careers</Link>
                <span className="text-xs bg-pink-500 text-black px-2 py-0.5 rounded-full">
                  Hiring
                </span>
              </li>
              <li><Link href="#">Our Data</Link></li>
              <li><Link href="#">API</Link></li>
              <li><Link href="#">Switch to Asylic</Link></li>
            </ul>
          </div>

          {/* FEATURES */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-3">
              <li><Link href="#">Discover</Link></li>
              <li><Link href="#">Manage</Link></li>
              <li><Link href="#">Track</Link></li>
              <li><Link href="#">Pay</Link></li>
              <li><Link href="#">Shopify Integration</Link></li>
              <li><Link href="#">Email Integration</Link></li>
            </ul>
          </div>

          {/* MORE TOOLS */}
          <div>
            <h4 className="text-white font-semibold mb-4">More tools</h4>
            <ul className="space-y-3">
              <li><Link href="#">Fake Follower Check</Link></li>
              <li><Link href="#">Influencer Database</Link></li>
              <li><Link href="#">Engagement Rate Calculator</Link></li>
              <li><Link href="#">Find Influencers</Link></li>
              <li><Link href="#">Influencer Marketing API</Link></li>
              <li><Link href="#">Influencer Lookalike Tool</Link></li>
              <li><Link href="#">Sponsored Content Examples</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link href="#">Product Tour</Link></li>
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Ask a Question</Link></li>
              <li><Link href="#">Book a Call</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* BIG BACKGROUND TEXT */}
      <div className="relative mt-28">
        <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[18vw] font-bold text-white/10 select-none leading-none">
          Asylic
        </h1>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 border-t border-white/10 mt-32">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2026 Asylic. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#">Terms & Service</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
