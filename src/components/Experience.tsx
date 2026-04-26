import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'

const EXP = [
  {
    role: 'Content Marketing',
    company: 'Sui Foundation',
    url: 'https://x.com/SuiNetwork',
    period: 'Nov 2025 - Now',
    tags: ['Content Strategy', 'Web3 Narratives', 'Ecosystem Growth'],
    logo: 'https://unavatar.io/twitter/SuiNetwork',
    color: '#4da2ff',
    colorBg: 'rgba(77,162,255,0.1)',
    spotlightBg: 'rgba(77,162,255,0.08)',
    desc: 'Crafting narratives and content strategies that communicate the Sui ecosystem story to global audiences.',
  },
  {
    role: 'Community Builder & Event Organizer',
    company: 'Sui Foundation',
    url: 'https://x.com/SuiNetwork',
    period: 'Dec 2024 - Nov 2025',
    tags: ['100+ Events', 'Hackathons', 'Vietnam'],
    logo: 'https://unavatar.io/twitter/SuiNetwork',
    color: '#4da2ff',
    colorBg: 'rgba(77,162,255,0.1)',
    spotlightBg: 'rgba(77,162,255,0.08)',
    desc: 'Organized 100+ meetups, workshops, and two major hackathons for the Sui ecosystem in Vietnam.',
  },
  {
    role: 'Marketing Lead',
    company: 'allday Network',
    url: 'https://x.com/allday_Network',
    period: 'Apr 2023 - Apr 2025',
    tags: ['Multi-chain Growth', 'Social Strategy', 'Brand Building'],
    logo: 'https://unavatar.io/twitter/allday_Network',
    color: '#f59e0b',
    colorBg: 'rgba(245,158,11,0.1)',
    spotlightBg: 'rgba(245,158,11,0.07)',
    desc: 'Built and scaled multi-chain X profiles across Sui, Aptos, Bitcoin, Solana, Base, and Starknet - each reaching 10K+ followers.',
  },
  {
    role: 'Marketing Executive',
    company: 'The Insider Group',
    url: 'https://x.com/insidergroup_',
    period: 'Nov 2022 - Apr 2023',
    tags: ['Marketing', 'Campaigns', 'Web3'],
    logo: 'https://unavatar.io/twitter/insidergroup_',
    color: '#8b5cf6',
    colorBg: 'rgba(139,92,246,0.1)',
    spotlightBg: 'rgba(139,92,246,0.07)',
    desc: 'First role in Web3 marketing, executing campaigns and community initiatives.',
  },
]

function ExperienceCard({
  item,
  delay,
}: {
  item: (typeof EXP)[number]
  delay: number
}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } as Transition}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ x: isMobile ? 0 : 5 }}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '44px 1fr' : '52px 1fr auto',
        gap: isMobile ? '14px' : '20px',
        alignItems: 'start',
        background: hovered
          ? `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, ${item.spotlightBg} 0%, rgba(20,20,20,0.6) 65%)`
          : 'rgba(20,20,20,0.6)',
        border: `1px solid ${hovered ? item.color + '35' : '#1e1e1e'}`,
        borderRadius: '16px',
        padding: isMobile ? '16px' : '22px 24px',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${item.color}12` : 'none',
        transition: 'background 0.12s ease, border-color 0.25s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Left accent line */}
      <div style={{
        position: 'absolute', left: 0, top: '20%', bottom: '20%',
        width: '2px', borderRadius: '1px',
        background: `linear-gradient(to bottom, transparent, ${item.color}, transparent)`,
        opacity: hovered ? 0.8 : 0.4,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Company logo */}
      <div style={{
        width: isMobile ? '44px' : '52px',
        height: isMobile ? '44px' : '52px',
        borderRadius: '12px',
        background: item.colorBg,
        border: `1px solid ${item.color}33`,
        overflow: 'hidden',
        flexShrink: 0, marginTop: '2px',
      }}>
        <img
          src={item.logo}
          alt={item.company}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => {
            const el = e.currentTarget as HTMLImageElement
            el.style.display = 'none'
            const parent = el.parentElement!
            parent.style.display = 'flex'
            parent.style.alignItems = 'center'
            parent.style.justifyContent = 'center'
            parent.innerHTML = `<span style="font-family:'Instrument Serif',serif;font-style:italic;font-size:13px;color:${item.color}">${item.company.slice(0, 2)}</span>`
          }}
        />
      </div>

      {/* Content */}
      <div style={{ minWidth: 0 }}>
        {/* Role title */}
        <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 700, color: '#f5f5f5', lineHeight: 1.3, marginBottom: '4px' }}>
          {item.role}
        </div>
        {/* Company + period badge row on mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: item.color }}>
            {item.company}
          </span>
          {isMobile && (
            <span style={{
              fontSize: '10px', fontWeight: 500, color: '#878787',
              background: 'rgba(255,255,255,0.04)', border: '1px solid #1e1e1e',
              padding: '2px 8px', borderRadius: '999px', whiteSpace: 'nowrap',
            }}>
              {item.period}
            </span>
          )}
        </div>
        <div style={{ fontSize: '13px', color: '#878787', lineHeight: 1.6, marginBottom: '12px' }}>
          {item.desc}
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '10.5px', fontWeight: 600, color: '#878787',
              background: 'rgba(255,255,255,0.04)', border: '1px solid #1e1e1e',
              padding: '2px 10px', borderRadius: '999px',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Period — desktop only (3rd column) */}
      {!isMobile && (
        <div style={{
          fontSize: '11.5px', fontWeight: 500, color: '#878787',
          background: 'rgba(255,255,255,0.04)', border: '1px solid #1e1e1e',
          padding: '4px 12px', borderRadius: '999px', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {item.period}
        </div>
      )}
    </motion.a>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '-120px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(77,162,255,0.05)', filter: 'blur(150px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 20s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '380px', height: '380px', borderRadius: '50%', background: 'rgba(77,162,255,0.03)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 28s ease-in-out infinite reverse' }} />
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 28px)', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } as Transition}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ marginBottom: '12px' }}>
            <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#4da2ff' }}>
              Where I've been
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.05 }}>
            Featured{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>
              experience
            </em>
          </h2>
        </motion.div>

        {/* Timeline + Cards */}
        <div style={{ position: 'relative', paddingLeft: '48px' }}>
          {/* Animated vertical timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.6, ease: 'easeInOut' } as Transition}
            style={{
              position: 'absolute',
              left: '19px',
              top: '8px',
              bottom: '8px',
              width: '1px',
              background: 'linear-gradient(to bottom, #4da2ff 0%, rgba(77,162,255,0.3) 70%, transparent 100%)',
              transformOrigin: 'top center',
            }}
          />

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {EXP.map((item, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: '3px' }}>
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.12 } as Transition}
                  style={{
                    position: 'absolute',
                    left: '-33px',
                    top: '28px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: item.color,
                    boxShadow: `0 0 10px ${item.color}70, 0 0 20px ${item.color}30`,
                    zIndex: 2,
                  }}
                />
                <ExperienceCard item={item} delay={0.05 + i * 0.1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
