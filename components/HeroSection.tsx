'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const heroSlides = [
  { title: 'Discover brand champions.', bg: '#5B6EE1', media: '/hero-1.jpg' },
  { title: 'Grow your community.', bg: '#6C7AF2', media: '/hero-2.jpg' },
  { title: 'Dominate your niche.', bg: '#2C8C8C', media: '/hero-3.jpg' },
];

// Mobile reels
const reels = [
  { id: 1, media: '/reel-2.jpeg', title: 'Creator Tip 1' },
  { id: 2, media: '/reel-2.jpeg', title: 'Creator Tip 2' },
  { id: 3, media: '/reel-2.jpeg', title: 'Creator Tip 3' },
];

// utility for random numbers
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [reelIndex, setReelIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const reelInterval = setInterval(() => {
      setReelIndex((prev) => (prev + 1) % reels.length);
    }, 3500); // each mobile short shows 3.5s
    return () => clearInterval(reelInterval);
  }, []);

  // generate random heart motion once
  const leftHearts = useMemo(
    () =>
      Array.from({ length: 4 }).map(() => ({
        x: rand(-12, 12),
        y: rand(-60, -90),
        delay: rand(0, 2),
        duration: rand(2.2, 3.2),
      })),
    []
  );
  const rightHearts = useMemo(
    () =>
      Array.from({ length: 3 }).map(() => ({
        x: rand(-12, 12),
        y: rand(-60, -100),
        delay: rand(0, 2),
        duration: rand(2.4, 3.4),
      })),
    []
  );

  return (
    <motion.section
      animate={{ backgroundColor: heroSlides[index].bg }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="flex justify-center mt-6 rounded-3xl mx-6 md:mx-20"
    >
      <div className="w-full max-w-7xl rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT CONTENT */}
        <div className="text-white max-w-xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={heroSlides[index].title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              {heroSlides[index].title}
            </motion.h1>
          </AnimatePresence>

          <p className="mt-6 text-lg text-white/90">
            Go beyond influencer marketing software. Upgrade to GRIN&apos;s
            AI-powered creator marketing platform.
          </p>

          <button className="mt-8 bg-lime-300 text-black font-semibold px-6 py-3 rounded-full hover:bg-lime-400 transition">
            Get started
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          {/* Desktop Hearts */}
          <div className="hidden md:block">
            {/* LEFT HEARTS */}
            <div className="absolute bottom-24 -left-16 z-20">
              {leftHearts.map((h, i) => (
                <motion.div
                  key={`lh-${i}`}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 20 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.8],
                    x: [0, h.x],
                    y: [20, h.y],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: h.duration,
                    delay: h.delay,
                    ease: 'easeOut',
                  }}
                  className="mb-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl"
                >
                  <FaHeart className="text-pink-500 text-lg" />
                </motion.div>
              ))}
            </div>

            {/* RIGHT HEARTS */}
            <div className="absolute bottom-28 -right-16 z-20">
              {rightHearts.map((h, i) => (
                <motion.div
                  key={`rh-${i}`}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 20 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.8],
                    x: [0, h.x],
                    y: [20, h.y],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: h.duration,
                    delay: h.delay,
                    ease: 'easeOut',
                  }}
                  className="mb-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl"
                >
                  <FaHeart className="text-red-500 text-lg" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* PHONE UI DESKTOP */}
          <div className="hidden md:block relative z-10 w-[260px] md:w-[300px] h-[520px] bg-black rounded-[40px] overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[index].media}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[index].media}
                  alt="Creator preview"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MOBILE REEL CAROUSEL */}
          <div className="md:hidden w-64 h-512 relative rounded-3xl overflow-hidden shadow-2xl bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={reels[reelIndex].id}
                initial={{ opacity: 0, rotateY: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 45, scale: 0.8 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={reels[reelIndex].media}
                  alt={reels[reelIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white font-semibold text-lg bg-black/50 px-3 py-1 rounded">
                  {reels[reelIndex].title}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
