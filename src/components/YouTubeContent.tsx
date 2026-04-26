import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'

// Real titles from YouTube oEmbed — all use i.ytimg.com/vi/ID/hqdefault.jpg (always available)
const ALL_VIDEOS = [
  { id: 'gtggsPOPrPc', tag: 'SuiHub Bootcamp', title: 'SuiHub HCMC Bootcamp Intro', tagColor: '#4da2ff' },
  { id: '6SUqNc5uqYY', tag: 'SuiHub Bootcamp', title: 'SuiHub HCMC Bootcamp - Hackathon Day', tagColor: '#4da2ff' },
  { id: 'fSeOVJXqo7A', tag: 'First Movers Sprint', title: 'First Movers Sprint 2026 Teaser', tagColor: '#a78bfa' },
  { id: '1WUhie2reCk', tag: 'First Movers Sprint', title: 'First Movers Sprint 2026 Recap', tagColor: '#a78bfa' },
  { id: '_rxF1gUdy5g', tag: 'Sui Vietnam', title: 'Sui Perpetuals Night Trailer', tagColor: '#34d399' },
  { id: '66xPsjG3X3I', tag: 'Sui Vietnam', title: 'Sui Perpetuals Night Recap', tagColor: '#34d399' },
  { id: 'CcWmX4AQHOM', tag: 'Walrus', title: 'Walrus Vietnam Meetup', tagColor: '#35C9A8' },
  { id: 'gnzg0hGuwxE', tag: 'Claynosaurz', title: 'Sui x Claynosaurz Vietnam Meetup Trailer', tagColor: '#f472b6' },
  { id: 'y8a42SRJDHg', tag: 'Beep Bootcamp', title: 'Beep HCMC Bootcamp', tagColor: '#60a5fa' },
]

const FEATURED = ALL_VIDEOS.slice(0, 6)

const SCATTERED = [
  { style: { left: '0%', top: '20px' } as React.CSSProperties, width: '44%', rotate: -4, floatY: 12, floatDur: 4.8, delay: 0.05, z: 3, initialX: -60 },
  { style: { right: '0%', top: '0px' } as React.CSSProperties, width: '38%', rotate: 5, floatY: 9, floatDur: 3.7, delay: 0.18, z: 2, initialX: 60 },
  { style: { left: '8%', top: '205px' } as React.CSSProperties, width: '34%', rotate: 2, floatY: 14, floatDur: 5.2, delay: 0.32, z: 1, initialX: -50 },
  { style: { right: '6%', top: '168px' } as React.CSSProperties, width: '36%', rotate: -3, floatY: 11, floatDur: 4.1, delay: 0.42, z: 2, initialX: 50 },
  { style: { left: '2%', bottom: '10px' } as React.CSSProperties, width: '32%', rotate: 6, floatY: 16, floatDur: 4.5, delay: 0.55, z: 1, initialX: -40 },
  { style: { right: '2%', bottom: '20px' } as React.CSSProperties, width: '38%', rotate: -5, floatY: 10, floatDur: 3.9, delay: 0.65, z: 2, initialX: 40 },
]

function PlayIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function FloatingCard({ video, layout }: { video: (typeof ALL_VIDEOS)[number]; layout: (typeof SCATTERED)[number] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, x: layout.initialX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      animate={{ y: [0, -layout.floatY, 0] }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{
        opacity: { duration: 0.75, delay: layout.delay },
        x: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: layout.delay },
        y: { duration: layout.floatDur, repeat: Infinity, ease: 'easeInOut', delay: layout.delay * 2 },
        scale: { duration: 0.2 },
      } as Transition}
      style={{
        position: 'absolute', ...layout.style, width: layout.width, rotate: layout.rotate,
        zIndex: hovered ? 30 : layout.z,
        textDecoration: 'none', color: 'inherit', display: 'block',
        borderRadius: '14px', overflow: 'hidden',
        background: 'rgba(10,10,10,0.92)',
        border: `1px solid ${hovered ? video.tagColor + '60' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? `0 28px 70px rgba(0,0,0,0.7), 0 0 50px ${video.tagColor}20` : '0 16px 50px rgba(0,0,0,0.55)',
        backdropFilter: 'blur(20px)', cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        <motion.img
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 55%)' }} />
        <div style={{
          position: 'absolute', top: '8px', left: '8px',
          background: 'rgba(8,8,8,0.85)', border: `1px solid ${video.tagColor}35`,
          borderRadius: '999px', padding: '3px 9px', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center',
        }}>
          <span style={{ fontSize: '7.5px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: video.tagColor, lineHeight: 1 }}>{video.tag}</span>
        </div>
        <motion.div
          animate={{ scale: hovered ? 1.15 : 1, background: hovered ? video.tagColor : 'rgba(10,10,10,0.7)' }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', bottom: '10px', right: '10px',
            width: '34px', height: '34px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
          }}
        >
          <PlayIcon />
        </motion.div>
      </div>
      <div style={{ padding: '9px 11px' }}>
        <div style={{ fontSize: '10.5px', fontWeight: 600, lineHeight: 1.4, color: '#e8e8e8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {video.title}
        </div>
      </div>
    </motion.a>
  )
}

function SmallCard({ video }: { video: (typeof ALL_VIDEOS)[number] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        background: 'rgba(14,14,14,0.9)', borderRadius: '12px', overflow: 'hidden',
        border: `1px solid ${hovered ? video.tagColor + '45' : '#1e1e1e'}`,
        transition: 'border-color 0.3s ease', cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        <motion.img
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', top: '6px', left: '6px', background: 'rgba(8,8,8,0.85)', border: `1px solid ${video.tagColor}30`, borderRadius: '999px', padding: '3px 8px', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: video.tagColor, lineHeight: 1 }}>{video.tag}</span>
        </div>
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, background: hovered ? video.tagColor : 'rgba(10,10,10,0.65)' }}
          transition={{ duration: 0.2 }}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
        >
          <PlayIcon />
        </motion.div>
      </div>
      <div style={{ padding: '8px 10px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#d4d4d4', lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{video.title}</div>
      </div>
    </motion.a>
  )
}

export default function YouTubeContent() {
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="content" ref={sectionRef} style={{ padding: '96px 0', overflow: 'hidden', position: 'relative' }}>
      {/* Ambient glow orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '8%', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(77,162,255,0.04)', filter: 'blur(140px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 23s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '0', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(168,139,250,0.03)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 29s ease-in-out infinite reverse' }} />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        {/* Centered header like motionsites.ai */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } as Transition}
          style={{ textAlign: 'center', marginBottom: '20px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#4da2ff', marginBottom: '14px' }}>
            Visual content
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05 }}>
            Content{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>
              playground
            </em>
          </h2>
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#555', lineHeight: 1.6, maxWidth: '360px', margin: '12px auto 0' }}>
            Event recaps, community stories, and ecosystem content across the Sui Vietnam scene.
          </p>
        </motion.div>

        {!isMobile && (
          <div>
            {/* Scattered container */}
            <div style={{ position: 'relative', height: '640px', margin: '0 -32px' }}>
              {/* Center radial glow */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '320px', height: '320px',
                background: 'radial-gradient(ellipse, rgba(77,162,255,0.07) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
              }} />

              {/* Center CTA */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center', zIndex: 10, pointerEvents: 'none',
              }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.45 } as Transition}
                  style={{ pointerEvents: 'auto' }}
                >
                  <a
                    href="https://youtube.com/@williamm168"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      padding: '13px 26px',
                      background: 'rgba(10,10,10,0.88)',
                      border: '1px solid rgba(77,162,255,0.4)',
                      borderRadius: '999px', fontSize: '13px', fontWeight: 700,
                      color: '#4da2ff', textDecoration: 'none',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 0 40px rgba(77,162,255,0.12)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(77,162,255,0.14)'
                      el.style.borderColor = 'rgba(77,162,255,0.7)'
                      el.style.boxShadow = '0 0 60px rgba(77,162,255,0.28)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(10,10,10,0.88)'
                      el.style.borderColor = 'rgba(77,162,255,0.4)'
                      el.style.boxShadow = '0 0 40px rgba(77,162,255,0.12)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.8 8S21.6 6.4 20.8 5.6c-.9-.9-1.9-.9-2.4-1C15.6 4.4 12 4.4 12 4.4s-3.6 0-6.4.2c-.5.1-1.5.1-2.4 1C2.4 6.4 2.2 8 2.2 8S2 9.9 2 11.7v1.7c0 1.8.2 3.6.2 3.6s.2 1.6 1 2.4c.9.9 2.1.9 2.7 1 1.9.2 8.1.2 8.1.2s3.6 0 6.4-.2c.5-.1 1.5-.1 2.4-1 .8-.8 1-2.4 1-2.4s.2-1.9.2-3.6v-1.7C22 9.9 21.8 8 21.8 8zM9.7 15.1V9l6.6 3.1-6.6 3z" />
                    </svg>
                    View all on YouTube →
                  </a>
                  <p style={{ marginTop: '8px', fontSize: '11px', color: '#444', letterSpacing: '0.05em' }}>@williamm168</p>
                </motion.div>
              </div>

              {FEATURED.map((video, i) => (
                <FloatingCard key={video.id} video={video} layout={SCATTERED[i]} />
              ))}
            </div>

            {/* Remaining 3 in a clean row below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 } as Transition}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px' }}
            >
              {ALL_VIDEOS.slice(6).map(video => (
                <SmallCard key={video.id} video={video} />
              ))}
            </motion.div>
          </div>
        )}

        {isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {ALL_VIDEOS.map(video => (
                <SmallCard key={video.id} video={video} />
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <a
                href="https://youtube.com/@williamm168"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 22px', background: 'rgba(20,20,20,0.8)',
                  border: '1px solid rgba(77,162,255,0.3)', borderRadius: '999px',
                  fontSize: '13px', fontWeight: 700, color: '#4da2ff', textDecoration: 'none',
                }}
              >
                View all on YouTube →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
