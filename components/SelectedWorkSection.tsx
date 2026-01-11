'use client';
import { motion } from 'framer-motion';

interface PushLetterProps {
  char: string;
  delay: number;
}

function PushLetter({ char, delay }: PushLetterProps) {
  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        height: '200px', // make it match your font-size
        width: '180px',  // width to fit the letter
      }}
    >
      {/* Top letter */}
      <motion.span
        initial={{ y: '-100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, delay, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          color: 'white',
          fontWeight: 900,
          fontSize: '200px', // BIG letters
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        {char}
      </motion.span>

      {/* Bottom letter */}
      <motion.span
        initial={{ y: '0%' }}
        animate={{ y: '100%' }}
        transition={{ duration: 0.8, delay, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          color: 'white',
          fontWeight: 900,
          fontSize: '200px', // BIG letters
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
}

function PushWord({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', gap: '10px', whiteSpace: 'nowrap' }}>
      {text.split('').map((char, i) => (
        <PushLetter key={i} char={char} delay={i * 0.15} />
      ))}
    </div>
  );
}

export default function SelectedWorkSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'black',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <PushWord text="SELECTED" />
        <PushWord text="WORK" />
      </div>
    </section>
  );
}
