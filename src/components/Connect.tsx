import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'

// SVG icons
const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const TelegramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const CONTACTS = [
  {
    icon: <EmailIcon />,
    name: 'Email',
    sub: 'trantanphat1501@gmail.com',
    href: 'mailto:trantanphat1501@gmail.com',
    color: '#4da2ff',
  },
  {
    icon: <XIcon />,
    name: 'X (Twitter)',
    sub: '@williamm168',
    href: 'https://x.com/williamm168',
    color: '#f5f5f5',
  },
  {
    icon: <YouTubeIcon />,
    name: 'YouTube',
    sub: '@williamm168',
    href: 'https://www.youtube.com/@williamm168',
    color: '#ff0000',
  },
  {
    icon: <LinkedInIcon />,
    name: 'LinkedIn',
    sub: 'tan-phat-8619203a7',
    href: 'https://www.linkedin.com/in/tan-phat-8619203a7/',
    color: '#0077b5',
  },
  {
    icon: <TelegramIcon />,
    name: 'Telegram',
    sub: '@williamm168',
    href: 'https://t.me/williamm168',
    color: '#2aabee',
  },
]

export default function Connect() {
  return (
    <section id="connect" style={{ padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '15%', right: '-120px', width: '480px', height: '480px', borderRadius: '50%', background: 'rgba(77,162,255,0.05)', filter: 'blur(160px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 25s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', left: '-100px', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(77,162,255,0.035)', filter: 'blur(130px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 32s ease-in-out infinite reverse' }} />
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } as Transition}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <div style={{ marginBottom: '12px' }}>
            <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#4da2ff' }}>
              Get in touch
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.05 }}>
            Let's{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>
              connect
            </em>
          </h2>
          <p style={{ marginTop: '12px', fontSize: '15px', color: '#878787' }}>
            Always open to collaborations, events, and great ideas.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {CONTACTS.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                background: 'rgba(20,20,20,0.7)', border: '1px solid #1e1e1e',
                borderRadius: '16px', padding: '24px 16px',
                textDecoration: 'none', color: 'inherit',
                transition: 'all 0.25s ease', textAlign: 'center',
              }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(77,162,255,0.3)',
                background: 'rgba(20,20,20,0.9)',
              }}
            >
              <div style={{ color: c.color, opacity: 0.9 }}>
                {c.icon}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f5f5f5', marginBottom: '4px' }}>
                  {c.name}
                </div>
                <div style={{ fontSize: '11px', color: '#878787', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                  {c.sub}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
