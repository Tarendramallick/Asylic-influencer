import Image from 'next/image';

const brands = [
  { name: 'Honey', logo: '/brands/honey.svg' },
  { name: 'Primal', logo: '/brands/primal.svg' },
  { name: 'Ilia', logo: '/brands/ilia.svg' },
  { name: 'Loverly', logo: '/brands/lovery.svg' },
  { name: 'Liquid IV', logo: '/brands/liquidiv.svg' },
];

export default function TrustedCarousel() {
  return (
    <section className="w-full px-4 md:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto bg-[#111] rounded-3xl py-10">

        {/* Heading */}
        <p className="text-center text-sm text-gray-400 mb-8">
          Trusted by the world’s fastest growing brands
        </p>

        {/* Marquee */}
        <div className="marquee-wrapper">
          <div className="marquee gap-16">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[160px] opacity-80 hover:opacity-100 transition"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={140}
                  height={60}
                  className="object-contain grayscale hover:grayscale-0 transition"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
