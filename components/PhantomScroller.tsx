'use client'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const cards = [
  { id: 1, bg: 'bg-[#ffd13f]', title: 'NFTs', img: '/nft.png' },
  { id: 2, bg: 'bg-[#3c315b]', title: 'Swap', img: '/swap.png' },
  { id: 3, bg: 'bg-[#ffdadc]', title: 'Earn', img: '/earn.png' },
  { id: 4, bg: 'bg-[#e9e8ea]', title: 'Wallet', img: '/wallet.png' },
  { id: 5, bg: 'bg-[#ffffc4]', title: 'Explore', img: '/explore.png' },
]

export default function FeatureCardScroller() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  /**
   * Spread values (overlapping fan)
   * Adjust numbers to increase/decrease overlap
   */
  const xTransforms = [
    useTransform(scrollYProgress, [0.6, 1], [0, -420]),
    useTransform(scrollYProgress, [0.6, 1], [0, 10]),
    useTransform(scrollYProgress, [0.6, 1], [0, 440]),
    useTransform(scrollYProgress, [0.6, 1], [0, 870]),
    useTransform(scrollYProgress, [0.6, 1], [0, 1300]),
  ]

  const scale = useTransform(scrollYProgress, [0.6, 1], [0.95, 1])

  return (
    <section className="relative py-4 overflow-hidden">
      {/* Scroll trigger */}
      <div ref={ref} className="absolute top-1/2 h-[1px] w-full" />

      {/* Cards */}
      <div className="relative">
        <div className="flex justify-center overflow-x-auto px-24 gap-0 hide-scrollbar py-20">
          {cards.map((card, i) => {
            const bounceX = useMotionValue(0)
            const bounceY = useMotionValue(0)
            const handleMouseEnter = (e: React.PointerEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect()

              const mouseX = e.clientX - rect.left
              const mouseY = e.clientY - rect.top

              const centerX = rect.width / 2
              const centerY = rect.height / 2

              let dx = mouseX - centerX
              let dy = mouseY - centerY

              const length = Math.sqrt(dx * dx + dy * dy) || 1
              dx /= length
              dy /= length

              const bounceDistance = 7

              bounceX.set(-dx * bounceDistance)
              bounceY.set(-dy * bounceDistance) // 👈 FIX

              animate(bounceX, 0, {
                type: 'spring',
                stiffness: 120,
                damping: 26,
                mass: 1.2,
              })

              animate(bounceY, 0, {
                type: 'spring',
                stiffness: 120,
                damping: 26,
                mass: 1.2,
              })
            }

            return (
              <motion.div
                key={card.id}
                style={{
                  x: xTransforms[i],
                  scale,
                  translateX: bounceX,
                  translateY: bounceY,
                  zIndex: 10 - Math.abs(0 - i),
                }}
                onPointerEnter={handleMouseEnter}
                className={`
                  ${card.bg}
                  w-[420px]
                  h-[580px]
                  rounded-3xl
                  shrink-0
                  -ml-100
                  first:ml-0
                  shadow-xl
                  flex flex-col justify-between p-6
                  cursor-pointer
                  will-change-transform
                `}
              >
                <h3 className="text-xl font-semibold text-black">
                  {card.title}
                </h3>

                <div className="relative w-full flex-1 rounded-xl overflow-hidden bg-black/10">
                  <Image src={card.img} alt="" fill className="object-cover" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
