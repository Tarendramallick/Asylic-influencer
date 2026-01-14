'use client';
import { motion, Variants, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface PushLetterProps {
  char: string;
  delay: number;
  fontSize?: number;
  color?: string;
  startAnimation: boolean;
}

const PushLetter = ({ char, delay, fontSize = 200, color = 'white', startAnimation }: PushLetterProps) => {
  const topVariants: Variants = {
    hidden: { y: '-100%' },
    visible: { y: '0%' },
  };

  const bottomVariants: Variants = {
    hidden: { y: '0%' },
    visible: { y: '100%' },
  };

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        height: fontSize,
        width: fontSize,
      }}
    >
      <motion.span
        initial="hidden"
        animate={startAnimation ? 'visible' : 'hidden'}
        variants={topVariants}
        transition={{ duration: 0.5, delay, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          fontSize,
          color,
          fontWeight: 900,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        {char}
      </motion.span>

      <motion.span
        initial="hidden"
        animate={startAnimation ? 'visible' : 'hidden'}
        variants={bottomVariants}
        transition={{ duration: 0.5, delay, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          fontSize,
          color,
          fontWeight: 900,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {char}
      </motion.span>
    </div>
  );
};

interface PushWordProps {
  text: string;
  fontSize?: number;
  color?: string;
  letterSpacing?: number;
  delayStep?: number;
}

export const PushWord = ({
  text,
  fontSize = 200,
  color = 'white',
  letterSpacing = 10,
  delayStep = 0.15,
}: PushWordProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-100px 0px -100px 0px' }); // triggers early and repeatedly
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden'); // reset when out of view
    }
  }, [inView, controls]);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: letterSpacing,
        whiteSpace: 'nowrap',
      }}
    >
      {text.split('').map((char, i) => (
        <PushLetter
          key={i}
          char={char}
          delay={i * delayStep}
          fontSize={fontSize}
          color={color}
          startAnimation={inView}
        />
      ))}
    </div>
  );
};
