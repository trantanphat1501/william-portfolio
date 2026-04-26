import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'

const ALLDAY_PROFILES = [
  { name: 'Sui allday', handle: 'Sui_allday', url: 'https://x.com/Sui_allday', followers: '20.8K', img: '/images/sui-allday.png' },
  { name: 'Solana allday', handle: 'Solana_allday', url: 'https://x.com/Solana_allday', followers: '22.9K', img: '/images/solana-allday.jpg' },
  { name: 'Base allday', handle: 'Base_allday_', url: 'https://x.com/Base_allday_', followers: '18.9K', img: '/images/base-allday.jpg' },
  { name: 'Aptos allday', handle: 'Aptos_allday_', url: 'https://x.com/Aptos_allday_', followers: '16.7K', img: '/images/aptos-allday.png' },
  { name: 'Starknet allday', handle: 'Starknet_allday', url: 'https://x.com/Starknet_allday', followers: '15.5K', img: '/images/starknet-allday.png' },
  { name: 'Bitcoin allday', handle: 'Bitcoin_allday', url: 'https://x.com/Bitcoin_allday', followers: '14.2K', img: '/images/bitcoin-allday.png' },
]

const LUMA_EVENTS = [
  { name: 'Sui Perpetuals Night', url: 'https://lu.ma/hu1q71p6', img: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=640,height=360/event-covers/8l/a983b2de-52c3-49dd-85ca-cf07e59179f7.jpg' },
  { name: 'Sui × Claynosaurz Vietnam', url: 'https://lu.ma/788ylrtr', img: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=640,height=360/event-covers/e5/0dd5a549-8a31-423b-9c24-eafa06c995c4.jpg' },
  { name: 'Move in Practice: Complete a DEX', url: 'https://lu.ma/erh7285o', img: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=640,height=360/event-covers/0t/1e16fdaa-30e0-4816-8904-002d02c0435c.jpg' },
  { name: 'Move in Practice: Part 01', url: 'https://lu.ma/x4rwgodu', img: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=640,height=360/event-covers/oi/055baa22-578d-4e81-b883-3f51252ebfd2.png' },
  { name: 'SuiVN Tour #3 — Nha Trang', url: 'https://lu.ma/j30nldex', img: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=640,height=360/event-covers/8p/9bec3bee-bd66-4475-a1cc-9b1e9aae2fe0.jpg' },
  { name: 'SuiVN Tour #3 — Đà Nẵng', url: 'https://lu.ma/ved22edk', img: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=640,height=360/event-covers/tj/7d2c9484-eb6f-4bca-a9bd-895347b02aeb.jpg' },
  { name: 'Beep HCMC Bootcamp', url: 'https://lu.ma/7snncftg', img: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=640,height=360/event-covers/st/e24fa093-4492-44e0-b079-182aaf40fd6e.jpg' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32, filter: 'blur(8px)' } as const,
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] } as Transition,
})

// Animated counter that counts up on scroll into view
function AnimatedNumber({
  target,
  format,
}: {
  target: number
  format: (n: number) => string
}) {
  const [count, setCount] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true)
          const start = performance.now()
          const duration = 1800
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, triggered])

  return <span ref={ref}>{format(count)}</span>
}

// 3D Tilt wrapper
function TiltCard({
  children,
  style,
  glowColor = 'rgba(77,162,255,0.2)',
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  glowColor?: string
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({
      x: (y - 0.5) * -10,
      y: (x - 0.5) * 10,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.12s ease, box-shadow 0.3s ease' : 'transform 0.6s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? `0 24px 80px rgba(0,0,0,0.45), 0 0 50px ${glowColor}`
          : '0 4px 24px rgba(0,0,0,0.2)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

function AlldaySlider() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = (dir: number) => {
    setCurrent(c => (c + dir + ALLDAY_PROFILES.length) % ALLDAY_PROFILES.length)
  }

  useEffect(() => {
    if (isHovered) return
    timerRef.current = setInterval(() => advance(1), 2200)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isHovered])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative' }}
    >
      <div style={{
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        aspectRatio: '16/9', background: '#0a0a0a',
        border: '1px solid #1e1e1e',
        marginBottom: '12px',
      }}>
        {ALLDAY_PROFILES.map((p, i) => (
          <div
            key={p.handle}
            style={{
              position: 'absolute', inset: 0,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <img
              src={p.img}
              alt={p.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 50%)',
            }} />
            <div style={{
              position: 'absolute', bottom: '16px', left: '16px', right: '16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
              <div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#f5f5f5', textDecoration: 'none' }}
                >
                  {p.name}
                </a>
                <span style={{ fontSize: '11px', color: '#878787' }}>@{p.handle}</span>
              </div>
              <div style={{
                background: 'rgba(77,162,255,0.15)', border: '1px solid rgba(77,162,255,0.3)',
                borderRadius: '999px', padding: '4px 12px',
                fontSize: '12px', fontWeight: 700, color: '#4da2ff',
              }}>
                {p.followers} followers
              </div>
            </div>
          </div>
        ))}

        {[{dir:-1,pos:'left'},{dir:1,pos:'right'}].map(({dir, pos}) => (
          <button
            key={pos}
            onClick={() => advance(dir)}
            style={{
              position: 'absolute', top: '50%', [pos]: '12px',
              transform: 'translateY(-50%)',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#f5f5f5', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', zIndex: 2, transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(77,162,255,0.3)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,10,10,0.7)' }}
          >
            {dir === -1 ? '←' : '→'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
        {ALLDAY_PROFILES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '20px' : '6px', height: '6px',
              borderRadius: '999px', border: 'none', cursor: 'pointer',
              background: i === current ? '#4da2ff' : '#333',
              transition: 'all 0.3s ease', padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function LumaSlider() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = (dir: number) => {
    setCurrent(c => (c + dir + LUMA_EVENTS.length) % LUMA_EVENTS.length)
  }

  useEffect(() => {
    if (isHovered) return
    timerRef.current = setInterval(() => advance(1), 2600)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isHovered])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative' }}
    >
      <div style={{
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        aspectRatio: '16/9', background: '#0a0a0a',
        border: '1px solid #1e1e1e',
        marginBottom: '12px',
      }}>
        {LUMA_EVENTS.map((ev, i) => (
          <a
            key={ev.url}
            href={ev.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute', inset: 0, display: 'block',
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.5s ease',
              textDecoration: 'none',
            }}
          >
            <img
              src={ev.img}
              alt={ev.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 50%)',
            }} />
            <div style={{
              position: 'absolute', bottom: '14px', left: '16px', right: '16px',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f5f5f5', display: 'block' }}>
                {ev.name}
              </span>
              <span style={{ fontSize: '10px', color: '#4da2ff', fontWeight: 600 }}>View on Luma →</span>
            </div>
          </a>
        ))}

        {[{ dir: -1, pos: 'left' }, { dir: 1, pos: 'right' }].map(({ dir, pos }) => (
          <button
            key={pos}
            onClick={(e) => { e.preventDefault(); advance(dir) }}
            style={{
              position: 'absolute', top: '50%', [pos]: '12px',
              transform: 'translateY(-50%)',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#f5f5f5', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', zIndex: 2, transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(77,162,255,0.3)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,10,10,0.7)' }}
          >
            {dir === -1 ? '←' : '→'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
        {LUMA_EVENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '20px' : '6px', height: '6px',
              borderRadius: '999px', border: 'none', cursor: 'pointer',
              background: i === current ? '#4da2ff' : '#333',
              transition: 'all 0.3s ease', padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" style={{ padding: '96px 0', background: 'rgba(20,20,20,0.5)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '-100px', right: '-60px', width: '460px', height: '460px', borderRadius: '50%', background: 'rgba(77,162,255,0.045)', filter: 'blur(150px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 18s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '380px', height: '380px', borderRadius: '50%', background: 'rgba(245,158,11,0.03)', filter: 'blur(130px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 26s ease-in-out infinite reverse' }} />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div {...fadeUp()} style={{ marginBottom: '56px' }}>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#4da2ff' }}>
              Track record
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.05 }}>
            Key{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>
              achievements
            </em>
          </h2>
        </motion.div>

        {/* Card 1: $10K Writing Competition (full width) */}
        <motion.div {...fadeUp(0.05)} style={{ marginBottom: '16px' }}>
          <TiltCard
            glowColor="rgba(77,162,255,0.25)"
            style={{ borderRadius: '24px' }}
          >
            <a
              href="https://x.com/SuiNetwork/status/2029920028741750792"
              target="_blank"
              rel="noopener noreferrer"
              className="r-single"
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '0', textDecoration: 'none', color: 'inherit',
                background: 'linear-gradient(135deg, rgba(77,162,255,0.09) 0%, rgba(0,102,204,0.05) 100%)',
                border: '1px solid rgba(77,162,255,0.22)',
                borderRadius: '24px', overflow: 'hidden',
                position: 'relative',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,162,255,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,162,255,0.22)' }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, #4da2ff, #0066cc)',
              }} />
              {/* Left: text */}
              <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4da2ff', marginBottom: '16px' }}>
                  🏆 Global Competition
                </span>
                <div style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-3px', lineHeight: 1, marginBottom: '12px' }}>
                  <span style={{ color: '#4da2ff' }}>$</span>
                  <span style={{ color: '#f5f5f5' }}>
                    <AnimatedNumber target={10000} format={n => n.toLocaleString()} />
                  </span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#f5f5f5', marginBottom: '10px' }}>
                  Winner, Sui Writing Competition
                </div>
                <p style={{ fontSize: '13px', color: '#878787', lineHeight: 1.7, marginBottom: '20px' }}>
                  Took first place in Sui Foundation's global writing competition out of 500+ entries.
                  Recognized for exceptional storytelling and content quality.
                </p>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#4da2ff', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  View announcement →
                </span>
              </div>
              {/* Right: image */}
              <div className="r-10k-img" style={{ position: 'relative', overflow: 'hidden', minHeight: '280px' }}>
                <img
                  src="/images/sui-writing.png"
                  alt="Sui Writing Competition"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, rgba(10,10,10,0.3) 0%, transparent 30%)',
                }} />
              </div>
            </a>
          </TiltCard>
        </motion.div>

        {/* Row: Meetups + Hackathons */}
        <div className="r-single" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>

          {/* Meetups */}
          <motion.div {...fadeUp(0.1)}>
            <TiltCard
              glowColor="rgba(77,162,255,0.2)"
              style={{ borderRadius: '20px', height: '100%' }}
            >
              <a
                href="https://lu.ma/user/williamm168"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', textDecoration: 'none', color: 'inherit',
                  background: 'rgba(20,20,20,0.7)', border: '1px solid #1e1e1e',
                  borderRadius: '20px', overflow: 'hidden', height: '100%',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,162,255,0.35)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e' }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <LumaSlider />
                </div>
                <div style={{ padding: '24px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4da2ff' }}>
                    🌍 Community
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', margin: '8px 0' }}>
                    <span style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-2px', color: '#4da2ff', lineHeight: 1 }}>
                      <AnimatedNumber target={100} format={n => String(n)} />
                    </span>
                    <span style={{ fontSize: '32px', fontWeight: 900, color: '#4da2ff', lineHeight: 1 }}>+</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#f5f5f5', marginBottom: '8px' }}>Meetups and Workshops</div>
                  <p style={{ fontSize: '12px', color: '#878787', lineHeight: 1.6, marginBottom: '12px' }}>
                    Organized 100+ Sui community events across Vietnam, building the local ecosystem one gathering at a time.
                  </p>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#4da2ff' }}>View on Luma →</span>
                </div>
              </a>
            </TiltCard>
          </motion.div>

          {/* Hackathons */}
          <motion.div {...fadeUp(0.15)}>
            <TiltCard
              glowColor="rgba(77,162,255,0.2)"
              style={{ borderRadius: '20px', height: '100%' }}
            >
              <div
                style={{
                  background: 'rgba(20,20,20,0.7)', border: '1px solid #1e1e1e',
                  borderRadius: '20px', overflow: 'hidden', height: '100%',
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,162,255,0.35)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e' }}
              >
{
                  /* Mosaic: 1 big left + 2 stacked right */
                }
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gridTemplateRows: '1fr 1fr', gap: '3px', aspectRatio: '16/9', overflow: 'hidden' }}>
                  {/* Left — spans both rows */}
                  <a href="https://lu.ma/kjjresc4" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', gridRow: '1 / 3', overflow: 'hidden' }}>
                    <img src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=600,height=720/event-covers/2g/fa75eddf-5169-453c-b630-a86ea81be64a.jpg" alt="SuiHub HCMC Bootcamp"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                  </a>
                  {/* Right top */}
                  <a href="https://lu.ma/first-movers-sprint" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', overflow: 'hidden' }}>
                    <img src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=480,height=270/event-covers/zm/a26ea38f-c7fe-4434-afc7-db69736b5c4b.png" alt="First Movers Sprint 2026"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                  </a>
                  {/* Right bottom */}
                  <a href="https://lu.ma/commandoss-hh-hcmc" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', overflow: 'hidden' }}>
                    <img src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=85,width=480,height=270/event-covers/i5/214ac6fc-f6dd-4317-8b2b-b560af90db4a.png" alt="CommandOSS Hacker House HCMC"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                  </a>
                </div>
                <div style={{ padding: '24px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4da2ff' }}>
                    🎬 Events Produced
                  </span>
                  <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-2px', color: '#4da2ff', lineHeight: 1, margin: '8px 0' }}>
                    <AnimatedNumber target={3} format={n => String(n)} />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#f5f5f5', marginBottom: '8px' }}>Biggest Sui Hackathons in Vietnam</div>
                  <p style={{ fontSize: '12px', color: '#878787', lineHeight: 1.6 }}>
                    <strong style={{ color: '#f5f5f5' }}>SuiHub HCMC Bootcamp</strong>,{' '}
                    <strong style={{ color: '#f5f5f5' }}>First Movers Sprint 2026</strong>, and{' '}
                    <strong style={{ color: '#f5f5f5' }}>CommandOSS Hacker House HCMC</strong>, with full video production.
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Card 4: Allday Profiles (full width, slider) */}
        <motion.div {...fadeUp(0.2)}>
          <TiltCard
            glowColor="rgba(245,158,11,0.2)"
            style={{ borderRadius: '20px' }}
          >
            <div
              style={{
                background: 'rgba(20,20,20,0.7)', border: '1px solid #1e1e1e',
                borderRadius: '20px', overflow: 'hidden',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.25)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e' }}
            >
              <div className="r-single" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                <div style={{ padding: '28px' }}>
                  <AlldaySlider />
                </div>
                <div className="r-border-top" style={{ padding: '36px 32px', borderLeft: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#f59e0b', marginBottom: '16px' }}>
                    📱 Social Growth
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '8px' }}>
                    <span style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-2px', color: '#f59e0b', lineHeight: 1 }}>
                      <AnimatedNumber target={10000} format={n => n >= 1000 ? `${Math.round(n / 1000)}K` : String(n)} />
                    </span>
                    <span style={{ fontSize: '36px', fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>+</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#878787', marginLeft: '8px' }}>per profile</span>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#f5f5f5', marginBottom: '12px' }}>
                    Ecosystem X Profiles Built at allday Network
                  </div>
                  <p style={{ fontSize: '13px', color: '#878787', lineHeight: 1.7, marginBottom: '20px' }}>
                    Built the multi-chain social media presence for allday Network across 6 ecosystems.
                    Each profile grew to 10K+ followers with consistently high engagement.
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {ALLDAY_PROFILES.map(p => (
                      <a
                        key={p.handle}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '11px', fontWeight: 600, color: '#f59e0b',
                          background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
                          padding: '4px 10px', borderRadius: '999px', textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.18)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.08)' }}
                      >
                        {p.followers} {p.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </section>
  )
}
