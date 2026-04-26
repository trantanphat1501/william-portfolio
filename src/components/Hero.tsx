import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Hls from 'hls.js'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const ROLES = ['Content Creator', 'Community Builder', 'Event Organizer', 'Marketing Lead']
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function scrambleTo(target: string, el: HTMLElement, duration = 420) {
  const start = performance.now()
  const raf = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const revealed = Math.floor(progress * target.length)
    const tail = target.slice(revealed).replace(/[^ ]/g, () =>
      SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    )
    el.textContent = target.slice(0, revealed) + tail
    if (progress < 1) requestAnimationFrame(raf)
    else el.textContent = target
  }
  requestAnimationFrame(raf)
}

function useHlsVideo(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let hls: Hls | null = null
    if (Hls.isSupported()) {
      hls = new Hls({ startLevel: -1 })
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    }
    return () => { hls?.destroy() }
  }, [src])
  return videoRef
}

function useRoleCycle() {

  useEffect(() => {
    let i = 0
    const setI = (v: number) => {
      const el = document.getElementById('role-text')
      if (el) scrambleTo(ROLES[v], el)
    }
    setI(i)
    const t = setInterval(() => { i = (i + 1) % ROLES.length; setI(i) }, 2400)
    return () => clearInterval(t)
  }, [])
  return null
}

export default function Hero() {
  const videoRef = useHlsVideo(HLS_SRC)
  useRoleCycle()
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 50 })
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouseGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.name-reveal', {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3,
      })
      gsap.from('.blur-in', {
        y: 20, opacity: 0, filter: 'blur(10px)',
        stagger: 0.12, duration: 0.9, ease: 'power2.out', delay: 0.5,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative', width: '100%', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Mouse-follow radial glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `radial-gradient(600px circle at ${mouseGlow.x}% ${mouseGlow.y}%, rgba(77,162,255,0.08) 0%, transparent 60%)`,
        pointerEvents: 'none',
        transition: 'background 0.1s ease',
      }} />

      {/* Dot grid overlay — learned from Linear.app, Vercel.com, Supabase */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />
      {/* HLS Video Background */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        poster="https://image.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g/thumbnail.jpg?time=3"
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%', minHeight: '100%',
          width: 'auto', height: 'auto',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'rgba(0,0,0,0.35)',
      }} />

      {/* Bottom fade to bg */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        height: '240px',
        background: 'linear-gradient(to top, #07090f 0%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
        padding: isMobile ? '80px 20px 24px' : '0 24px',
        maxWidth: '800px', width: '100%',
      }}>
        {/* Avatar with spinning ring */}
        <div className="blur-in" style={{ marginBottom: '24px' }}>
          <div style={{ position: 'relative', width: '96px', height: '96px' }}>
            {/* Spinning gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: '-3px', borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #4da2ff, #0066cc, #4da2ff)',
                zIndex: 0,
              }}
            />
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              borderRadius: '50%', padding: '3px',
              background: '#0a0a0a',
              overflow: 'hidden',
            }}>
              <img
                src="https://unavatar.io/twitter/williamm168"
                alt="William"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="blur-in" style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(20,20,20,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px', padding: '6px 16px',
            backdropFilter: 'blur(10px)',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#22c55e', display: 'inline-block',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '12px', color: '#878787', fontWeight: 500 }}>
              Open to new opportunities
            </span>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="blur-in" style={{
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.35em', textTransform: 'uppercase',
          color: '#878787', marginBottom: '12px',
        }}>
          WEB3 BUILDER '26
        </p>

        {/* Name */}
        <h1
          className="name-reveal"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 10vw, 112px)',
            fontWeight: 400,
            color: '#f5f5f5',
            letterSpacing: '-3px',
            lineHeight: 1,
            marginBottom: '20px',
          }}
        >
          William
        </h1>

        {/* Role cycling */}
        <p className="blur-in" style={{
          fontSize: '18px', fontWeight: 400,
          color: 'rgba(245,245,245,0.6)', marginBottom: '20px',
          minHeight: '28px',
        }}>
          <span id="role-text" style={{ transition: 'opacity 0.4s ease' }}>Content Creator</span>
        </p>

        {/* Bio */}
        <p className="blur-in" style={{
          fontSize: isMobile ? '14px' : '16px', lineHeight: 1.7,
          color: 'rgba(245,245,245,0.5)', maxWidth: '520px',
          marginBottom: '28px', fontWeight: 300,
        }}>
          Building the Sui community in Vietnam, from grassroots meetups and hackathons
          to foundation-scale content and ecosystem growth.
        </p>

        {/* Stats row */}
        <div className="blur-in r-stats" style={{
          display: 'flex', gap: '0', marginBottom: '36px',
          background: 'rgba(20,20,20,0.55)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
        }}>
          {[
            { value: '4+', label: 'Years Web3' },
            { value: '100+', label: 'Events' },
            { value: '$10K', label: 'Competition Won' },
            { value: '10K+', label: 'Followers Profiles Built' },
            { value: '4.1K+', label: 'Followers on X' },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              style={{
                flex: 1, padding: '12px 12px', textAlign: 'center',
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div style={{
                fontSize: '15px', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.2,
                background: 'linear-gradient(135deg, #ffffff 0%, #4da2ff 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '9.5px', color: '#878787', marginTop: '2px', letterSpacing: '0.02em', lineHeight: 1.3 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="blur-in" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="#experience"
            style={{
              position: 'relative', overflow: 'hidden',
              padding: '12px 28px', borderRadius: '999px',
              background: 'linear-gradient(135deg, #4da2ff 0%, #0066cc 100%)',
              color: '#fff', fontSize: '14px', fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 0 24px rgba(77,162,255,0.3)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.opacity = '0.9'
              el.style.transform = 'translateY(-2px)'
              const shimmer = el.querySelector('.btn-shimmer') as HTMLElement | null
              if (shimmer) shimmer.style.animation = 'shimmer 0.7s ease forwards'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
              const shimmer = el.querySelector('.btn-shimmer') as HTMLElement | null
              if (shimmer) shimmer.style.animation = 'none'
            }}
          >
            {/* Shimmer sweep — learned from Stripe.com, Linear.app CTA buttons */}
            <span
              className="btn-shimmer"
              style={{
                position: 'absolute', top: 0, left: '-60%', width: '50%', height: '100%',
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 60%, transparent 80%)',
                backgroundSize: '200% 100%', pointerEvents: 'none',
              }}
            />
            View my work
          </a>
          <a
            href="https://t.me/williamm168"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 28px', borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(20,20,20,0.6)',
              backdropFilter: 'blur(10px)',
              color: '#f5f5f5', fontSize: '14px', fontWeight: 500,
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,162,255,0.4)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            Say hi ↗
          </a>
        </div>
      </div>

      {/* Scroll indicator - desktop only */}
      {!isMobile && <div style={{
        position: 'absolute', bottom: '36px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      }}>
        <p style={{ fontSize: '10px', color: '#878787', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll
        </p>
        <div style={{
          width: '1px', height: '40px', background: '#1e1e1e', overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            width: '100%', height: '40%',
            background: 'linear-gradient(to bottom, #4da2ff, transparent)',
            position: 'absolute', top: 0,
            animation: 'scroll-down 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>}
    </section>
  )
}
