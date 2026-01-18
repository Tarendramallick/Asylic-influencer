'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHidden(true);
      } else {
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
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed top-0 left-0 w-full z-50 flex justify-center"
        >
          <div className="mt-4 w-[95%] max-w-8xl bg-[#141414] rounded-full px-6 md:px-8 py-4 md:py-6 flex items-center justify-between shadow-xl backdrop-blur-md relative">

            {/* Logo */}
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                ●
              </span>
              Asylic
            </div>

            {/* Desktop Navigation (UNCHANGED) */}
            <nav className="hidden md:flex items-center gap-8 text-lg font-semibold text-white">
              <Link href="#">Solutions</Link>
              <Link href="#">Programs</Link>
              <Link href="#">Customers</Link>
              <Link href="#">Insights</Link>
              <Link href="#">Why Asylic</Link>
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

              {/* Hamburger (Mobile Only) */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col justify-center items-center gap-1.5 ml-2"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-6 h-0.5 bg-white transition ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-white transition ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-white transition ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-full left-0 mt-4 w-full bg-[#141414] rounded-3xl shadow-2xl md:hidden overflow-hidden"
                >
                  <nav className="flex flex-col divide-y divide-white/10 text-white text-lg font-medium">
                    {[
                      'Solutions',
                      'Programs',
                      'Customers',
                      'Insights',
                      'Why Asylic',
                    ].map((item) => (
                      <Link
                        key={item}
                        href="#"
                        onClick={() => setMenuOpen(false)}
                        className="px-6 py-4 hover:bg-white/5 transition"
                      >
                        {item}
                      </Link>
                    ))}

                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="px-6 py-4 hover:bg-white/5 transition"
                    >
                      Login
                    </Link>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
