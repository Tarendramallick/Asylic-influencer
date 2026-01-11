'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type CardProps = {
  index: number;
  total: number;
  bg: string;
  title: string;
};

export default function ScrollCard({
  index,
  total,
  bg,
  title,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['120%', '0%']);

  return (
    <section
      ref={ref}
      style={{
        height: '100vh',
        margin: '10px',
        position: 'sticky',
        borderRadius:'20px',
        top: 0,
        zIndex: total - index,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
      >
        {/* LEFT CONTENT */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center' }}>
          <h2 style={{ fontSize: "clamp(36px, 8vw, 100px)", textTransform:'uppercase',  width: '90%', fontWeight: 900,lineHeight: 1.1,textAlign:'center', marginBottom: '20px' }}>{title}</h2>
        </div>
      </motion.div>
    </section>
  );
}
