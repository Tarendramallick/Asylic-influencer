'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.header
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="fixed top-0 left-0 w-full z-50 flex justify-center"
        >
          <div className="mt-4 w-[95%] max-w-8xl bg-[#141414] rounded-full px-8 py-6 flex items-center justify-between shadow-xl backdrop-blur-md">

            {/* Logo */}
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                ●
              </span>
              Asylic
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-lg font-semibold text-white">
              <Link href="#" className="hover:text-white">Solutions</Link>
              <Link href="#" className="hover:text-white">Programs</Link>
              <Link href="#" className="hover:text-white">Customers</Link>
              <Link href="#" className="hover:text-white">Insights</Link>
              <Link href="#" className="hover:text-white">Why Asylic</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="hidden md:block px-5 py-2 rounded-full border border-gray-500 text-gray-300 hover:text-white hover:border-white transition"
              >
                Login
              </Link>

              <Link
                href="#"
                className="px-5 py-2 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
              >
                Get started
              </Link>
            </div>

          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
