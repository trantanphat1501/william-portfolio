import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const MARQUEE_TEXT = 'CONTENT CREATOR \u2022 COMMUNITY BUILDER \u2022 EVENT ORGANIZER \u2022 '

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

export default function Footer() {
  const videoRef = useHlsVideo(HLS_SRC)

  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Video BG (flipped, heavy overlay) */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) scaleY(-1)',
            minWidth: '100%', minHeight: '100%',
            width: 'auto', height: 'auto',
            objectFit: 'cover', zIndex: 0,
            opacity: 0.3,
          }}
        />
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.3) 30%, rgba(10,10,10,0.3) 70%, #0a0a0a 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '0 24px',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#878787', marginBottom: '20px',
          }}>
            Get in touch
          </p>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
            fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 400,
            color: '#f5f5f5', letterSpacing: '-2px', lineHeight: 1.1,
            marginBottom: '32px',
          }}>
            Let's build together
          </h2>
          <a
            href="https://t.me/williamm168"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 32px', borderRadius: '999px',
              background: 'linear-gradient(135deg, #4da2ff, #0066cc)',
              color: '#fff', fontSize: '14px', fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 0 24px rgba(77,162,255,0.3)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.opacity = '0.9'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.opacity = '1'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.6-.48.75-.97.46l-2.69-1.98-1.3 1.25c-.14.14-.27.27-.56.27l.2-2.77 5.1-4.61c.22-.2-.05-.31-.34-.11l-6.3 3.97-2.72-.85c-.59-.18-.6-.59.13-.87l10.62-4.1c.49-.18.92.12.51 1.42z"/>
            </svg>
            Message on Telegram &#8599;
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div style={{
        borderTop: '1px solid #1e1e1e',
        borderBottom: '1px solid #1e1e1e',
        overflow: 'hidden', whiteSpace: 'nowrap',
        padding: '14px 0',
        background: '#0a0a0a',
      }}>
        <div style={{
          display: 'inline-flex',
          animation: 'marquee 28s linear infinite',
        }}>
          {[0, 1].map(n => (
            <span key={n} style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#2a2a2a',
              paddingRight: '0',
            }}>
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        background: '#0a0a0a',
        borderTop: '1px solid #1e1e1e',
        padding: '20px 28px',
      }}>
        <div style={{
          maxWidth: '880px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: '#878787' }}>
            Built with care &nbsp;|&nbsp; &#169; 2026 William
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { label: 'X', href: 'https://x.com/williamm168' },
              { label: 'YouTube', href: 'https://youtube.com/@williamm168' },
              { label: 'Telegram', href: 'https://t.me/williamm168' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '12px', color: '#878787', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { ;(e.currentTarget as HTMLElement).style.color = '#f5f5f5' }}
                onMouseLeave={e => { ;(e.currentTarget as HTMLElement).style.color = '#878787' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
