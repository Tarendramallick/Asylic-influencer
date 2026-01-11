'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <video
            src="/demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        </div>

      {/* Border Container */}
      <div className="relative z-10 h-full px-6 py-25">
        <div className="relative h-full rounded-[32px] border border-lime-300 flex flex-col items-center justify-center text-center">
          {/* Heading */}
          <h1 className="text-white font-extrabold leading-tight text-[42px] md:text-[72px] max-w-5xl px-6">
            Ready to harness the power <br className="hidden md:block" />
            of Influence?
          </h1>

          {/* Button ON BORDER */}
          <button
            className="
              absolute 
              -bottom-11
              bg-lime-300 
              text-black 
              font-semibold 
              text-[40px]
              px-12
              py-4 
              rounded-full 
              hover:scale-105 
              transition-transform
              z-20
            "
          >
            Get a demo
          </button>
        </div>
      </div>
    </section>
  );
}
