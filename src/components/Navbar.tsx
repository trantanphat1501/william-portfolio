import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Content', href: '#content' },
  { label: 'Building', href: '#building' },
  { label: 'Connect', href: '#connect' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Experience')
  const [hoverSayHi, setHoverSayHi] = useState(false)
  const [hoverLogo, setHoverLogo] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { once: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 50, display: 'flex', justifyContent: 'center',
        paddingTop: '20px', paddingLeft: '16px', paddingRight: '16px',
        flexDirection: 'column', alignItems: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            borderRadius: '999px',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(20,20,20,0.9)',
            padding: '6px',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.6)' : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Logo */}
          <a href="#top" style={{ textDecoration: 'none' }}>
            <div
              onMouseEnter={() => setHoverLogo(true)}
              onMouseLeave={() => setHoverLogo(false)}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: hoverLogo
                  ? 'linear-gradient(315deg, #4da2ff, #0066cc)'
                  : 'linear-gradient(135deg, #4da2ff, #0066cc)',
                padding: '1.5px',
                transform: hoverLogo ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.2s ease, background 0.4s ease',
              }}
            >
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: '#0a0a0a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic', fontSize: '14px', color: '#f5f5f5',
              }}>
                W
              </div>
            </div>
          </a>

          {!isMobile && <>
            {/* Divider */}
            <div style={{ width: '1px', height: '20px', background: '#1e1e1e', margin: '0 2px' }} />

            {/* Nav links */}
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setActive(label)}
                style={{
                  fontSize: '13px', fontWeight: 500,
                  padding: '7px 14px', borderRadius: '999px',
                  textDecoration: 'none', transition: 'all 0.2s ease',
                  color: active === label ? '#f5f5f5' : '#878787',
                  background: active === label ? 'rgba(255,255,255,0.06)' : 'transparent',
                }}
                onMouseEnter={e => {
                  if (active !== label) {
                    ;(e.currentTarget as HTMLElement).style.color = '#f5f5f5'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                  }
                }}
                onMouseLeave={e => {
                  if (active !== label) {
                    ;(e.currentTarget as HTMLElement).style.color = '#878787'
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  }
                }}
              >
                {label}
              </a>
            ))}

            {/* Divider */}
            <div style={{ width: '1px', height: '20px', background: '#1e1e1e', margin: '0 2px' }} />
          </>}

          {/* Hamburger — mobile only */}
          {isMobile && (
            <>
              <div style={{ width: '1px', height: '20px', background: '#1e1e1e', margin: '0 2px' }} />
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Menu"
                style={{
                  width: '36px', height: '36px', borderRadius: '999px',
                  background: menuOpen ? 'rgba(77,162,255,0.12)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '4px',
                  transition: 'background 0.2s ease',
                }}
              >
                <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} style={{ display: 'block', width: '14px', height: '1.5px', background: '#f5f5f5', borderRadius: '1px', transformOrigin: 'center' }} />
                <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: 'block', width: '14px', height: '1.5px', background: '#f5f5f5', borderRadius: '1px' }} />
                <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} style={{ display: 'block', width: '14px', height: '1.5px', background: '#f5f5f5', borderRadius: '1px', transformOrigin: 'center' }} />
              </button>
              <div style={{ width: '1px', height: '20px', background: '#1e1e1e', margin: '0 2px' }} />
            </>
          )}

          {/* Say hi button */}
          <a
            href="https://t.me/williamm168"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoverSayHi(true)}
            onMouseLeave={() => setHoverSayHi(false)}
            style={{
              position: 'relative',
              fontSize: '13px', fontWeight: 500,
              padding: '7px 16px', borderRadius: '999px',
              textDecoration: 'none', color: '#f5f5f5',
              background: 'rgba(20,20,20,0.9)',
              transition: 'all 0.2s ease',
            }}
          >
            {hoverSayHi && (
              <span style={{
                position: 'absolute', inset: '-1.5px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #4da2ff, #0066cc)',
                zIndex: -1,
              }} />
            )}
            Say hi ↗
          </a>
        </motion.div>

        {/* Mobile dropdown drawer */}
        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                marginTop: '8px',
                background: 'rgba(18,18,18,0.97)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                backdropFilter: 'blur(20px)',
                padding: '8px',
                display: 'flex', flexDirection: 'column', gap: '2px',
                minWidth: '200px',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              }}
            >
              {LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => { setActive(label); setMenuOpen(false) }}
                  style={{
                    display: 'block',
                    fontSize: '15px', fontWeight: 500,
                    padding: '12px 16px', borderRadius: '12px',
                    textDecoration: 'none',
                    color: active === label ? '#f5f5f5' : '#878787',
                    background: active === label ? 'rgba(77,162,255,0.1)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
