import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { onComplete: () => void }

const WORDS = ['Build', 'Create', 'Connect']
const DURATION_MS = 2700

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [wordIdx, setWordIdx] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 900)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / DURATION_MS, 1)
      setCount(Math.floor(progress * 100))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      else setTimeout(onComplete, 400)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top-left label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'absolute', top: '32px', left: '32px' }}
      >
        <span style={{
          color: '#878787', fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.3em', textTransform: 'uppercase',
        }}>
          Portfolio
        </span>
      </motion.div>

      {/* Center word */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={wordIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(52px, 10vw, 96px)',
              color: 'rgba(245,245,245,0.75)',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            {WORDS[wordIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <div style={{ position: 'absolute', bottom: '40px', right: '40px' }}>
        <span style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(72px, 12vw, 120px)',
          color: '#f5f5f5',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-4px',
          lineHeight: 1,
        }}>
          {String(count).padStart(3, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '3px', background: 'rgba(30,30,30,0.5)',
      }}>
        <motion.div
          style={{
            height: '100%',
            transformOrigin: 'left',
            scaleX: count / 100,
            background: 'linear-gradient(90deg, #4da2ff 0%, #0066cc 100%)',
            boxShadow: '0 0 8px rgba(77,162,255,0.4)',
          }}
        />
      </div>
    </motion.div>
  )
}
