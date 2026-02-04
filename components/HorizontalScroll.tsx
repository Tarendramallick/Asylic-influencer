"use client";

import { useEffect, useRef } from "react";

const reels = [
  {
    name: "Daiki Shino",
    brand: "Marriott",
    video: "reel/REEL.mp4",
  },
  {
    name: "Saje Nicole",
    brand: "Mori",
    video: "reel/reel2.mp4", 
  },
  {
    name: "Joy Green",
    brand: "See’s Candies",
    video: "reel/reel3.mp4",
  },
  {
    name: "Vanessa Alvarez",
    brand: "Olly",
    video: "reel/REEl2.mp4",
  },
  {
    name: "Hunter Woodhall",
    brand: "Dick’s",
    video: "reel/REEL.mp4", 
  },
   {
    name: "Daiki Shino",
    brand: "Marriott",
    video: "reel/REEL.mp4",
  },
  {
    name: "Saje Nicole",
    brand: "Mori",
    video: "reel/reel2.mp4", 
  },
  {
    name: "Joy Green",
    brand: "See’s Candies",
    video: "reel/reel3.mp4",
  },
  {
    name: "Vanessa Alvarez",
    brand: "Olly",
    video: "reel/REEl2.mp4",
  },
  {
    name: "Hunter Woodhall",
    brand: "Dick’s",
    video: "reel/REEL.mp4", 
  },
];

export default function ReelsHorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const track = trackRef.current!;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        Math.max(-rect.top / (rect.height - window.innerHeight), 0),
        1
      );

      const maxTranslate = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-10 px-24 will-change-transform"
        >
          {reels.map((reel, index) => (
            <div
                key={index}
                className="
                    relative
                    min-w-[280px]
                    sm:min-w-[320px]
                    lg:min-w-[360px]
                    aspect-[9/16]
                    flex
                    items-center
                    justify-center
                "
                >
                {/* SCREEN */}
                <div
                    className="
                    absolute
                    top-
                    left-[8.5%]
                    w-[83%]
                    h-[99%]
                    text-center
                    flex
                    flex-col
                    justify-center
                    items-center
                    rounded-[50px]
                    overflow-hidden
                    bg-black
                    z-10
                    "
                >
                    <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={reel.video}
                    className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/10" />

                    <div className="absolute top-14 justify-center text-white text-xl font-anton">
                    {reel.brand}
                    </div>

                    <div className="absolute bottom-4 justify-center text-center text-white text-sm font-medium">
                    {reel.name}
                    </div>
                </div>

                {/* FRAME */}
                <img
                    src="/iphone.png"
                    alt="Phone Frame"
                    className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
                />
            </div>

          ))}
        </div>
      </div>
    </section>
  );
}
