import { motion, useScroll, useTransform } from "framer-motion";

export default function MetaMaskHeroMorph() {
  const { scrollYProgress } = useScroll();

  // scale from full width to phone size
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.38]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.35], [0, 28]);
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 180]);

  return (
    <section className="relative min-h-[200vh]">
      {/* sticky wrapper */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          style={{ scale, borderRadius, y }}
          className="w-screen h-screen bg-black overflow-hidden"
        >
          {/* background image / video */}
          <img
            src="/hero.png"
            alt="hero"
            className="w-full h-full object-cover"
          />

          {/* headline overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white font-extrabold text-[clamp(3rem,8vw,7rem)] leading-none text-center">
              GET MORE<br />OUT OF<br />CRYPTO
            </h1>
          </div>
        </motion.div>
      </div>

      {/* cards section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-40 -mt-32">
        <div className="rounded-3xl bg-indigo-900 text-white p-8">Connect to crypto dapps</div>
        <div className="rounded-3xl bg-white p-8 text-center">Middle content</div>
        <div className="rounded-3xl bg-emerald-900 text-white p-8">Collect & trade NFTs</div>
      </div>
    </section>
  );
}
