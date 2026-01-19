// components/TrustedCarousel.tsx
'use client';

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { trustedLogos } from "@/lib/trusted-logos";

export default function TrustedCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: true,
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-12">
          Trusted by <span className="font-bold">1900+</span> in-house teams
        </h2>
      </div>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {trustedLogos.map((logo, i) => (
              <div className="embla__slide" key={i}>
                <div className="logo-card">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={140}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
