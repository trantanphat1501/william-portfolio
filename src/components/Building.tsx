import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'

const PROJECTS = [
  {
    name: 'SuiNS Treasury',
    filename: 'treasury.ts',
    url: 'https://github.com/trantanphat1501/suinstreasury',
    lang: 'TypeScript',
    langColor: '#3178c6',
    tags: ['Sui', 'SuiNS', 'Dashboard'],
    desc: 'Track and visualize on-chain assets within the Sui Name Service ecosystem.',
    lines: [
      { tokens: [{ t: 'comment', v: '// Track & visualize SuiNS on-chain assets' }] },
      { tokens: [] },
      { tokens: [{ t: 'keyword', v: 'import' }, { t: 'plain', v: ' { Sui } ' }, { t: 'keyword', v: 'from' }, { t: 'string', v: " '@mysten/sui'" }] },
      { tokens: [] },
      { tokens: [{ t: 'keyword', v: 'const' }, { t: 'plain', v: ' treasury = {' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'prop', v: 'name' }, { t: 'plain', v: ': ' }, { t: 'string', v: '"SuiNS Treasury"' }, { t: 'plain', v: ',' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'prop', v: 'chain' }, { t: 'plain', v: ': ' }, { t: 'string', v: '"Sui"' }, { t: 'plain', v: ',' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'prop', v: 'status' }, { t: 'plain', v: ': ' }, { t: 'green', v: '"active"' }, { t: 'plain', v: ',' }], cursor: true },
      { tokens: [{ t: 'indent', v: '' }, { t: 'prop', v: 'totalNames' }, { t: 'plain', v: ': ' }, { t: 'keyword', v: 'await' }, { t: 'plain', v: ' suins.totalNames(),' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'prop', v: 'revenue' }, { t: 'plain', v: ': ' }, { t: 'keyword', v: 'await' }, { t: 'plain', v: ' suins.totalRevenue(),' }] },
      { tokens: [{ t: 'plain', v: '}' }] },
      { tokens: [] },
      { tokens: [{ t: 'keyword', v: 'export async function' }, { t: 'plain', v: ' ' }, { t: 'prop', v: 'getDashboard' }, { t: 'plain', v: '() {' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'keyword', v: 'return' }, { t: 'plain', v: ' ' }, { t: 'prop', v: 'SuiClient' }, { t: 'plain', v: '.getObject(treasury)' }] },
      { tokens: [{ t: 'plain', v: '}' }] },
    ],
  },
  {
    name: 'EjectBar',
    filename: 'EjectDrivesView.swift',
    url: 'https://github.com/trantanphat1501/EjectBar',
    lang: 'Swift',
    langColor: '#f05138',
    tags: ['macOS', 'Menu Bar', 'Utility'],
    desc: 'A macOS menu bar utility to quickly eject external drives and volumes.',
    lines: [
      { tokens: [{ t: 'keyword', v: 'import' }, { t: 'plain', v: ' AppKit' }] },
      { tokens: [] },
      { tokens: [{ t: 'keyword', v: 'struct' }, { t: 'plain', v: ' ' }, { t: 'prop', v: 'EjectDrivesView' }, { t: 'plain', v: ': ' }, { t: 'prop', v: 'View' }, { t: 'plain', v: ' {' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'keyword', v: '@State var' }, { t: 'plain', v: ' volumes = ' }, { t: 'prop', v: 'mountedVolumes' }, { t: 'plain', v: '()' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'keyword', v: 'var' }, { t: 'plain', v: ' body: ' }, { t: 'keyword', v: 'some' }, { t: 'plain', v: ' ' }, { t: 'prop', v: 'View' }, { t: 'plain', v: ' {' }], cursor: true },
      { tokens: [{ t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'prop', v: 'VStack' }, { t: 'plain', v: '(spacing: 6) {' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'prop', v: 'ForEach' }, { t: 'plain', v: '(volumes, id: ' }, { t: 'keyword', v: '\\.self' }, { t: 'plain', v: ') { vol in' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'prop', v: 'Button' }, { t: 'plain', v: '(vol.lastPathComponent) {' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'prop', v: 'NSWorkspace' }, { t: 'plain', v: '.shared' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'plain', v: '.unmountAndEjectDevice(at: vol)' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'plain', v: '} }' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'indent', v: '' }, { t: 'plain', v: '}.padding(8)' }] },
      { tokens: [{ t: 'indent', v: '' }, { t: 'plain', v: '} }' }] },
      { tokens: [] },
      { tokens: [{ t: 'comment', v: '// Ejects external drives safely from macOS menu bar' }] },
    ],
  },
]

const TOKEN_COLORS: Record<string, string> = {
  keyword: '#c084fc',
  string: '#86efac',
  comment: '#6b7280',
  prop: '#93c5fd',
  plain: '#d1d5db',
  green: '#4ade80',
  indent: '',
}

function BlinkingCursor() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setOn(v => !v), 530)
    return () => clearInterval(t)
  }, [])
  return (
    <span style={{
      display: 'inline-block', width: '7px', height: '13px',
      background: on ? '#4da2ff' : 'transparent',
      verticalAlign: 'text-bottom', marginLeft: '1px',
      borderRadius: '1px',
      transition: 'background 0.05s',
    }} />
  )
}

function TerminalCard({ proj, delay }: { proj: (typeof PROJECTS)[number]; delay: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: ny * -9, y: nx * 9 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } as Transition}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease, box-shadow 0.3s ease' : 'transform 0.7s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? '0 28px 80px rgba(0,0,0,0.55), 0 0 50px rgba(77,162,255,0.1)'
          : '0 8px 40px rgba(0,0,0,0.3)',
        borderRadius: '14px',
        height: '100%',
      }}
    >
      <a
        href={proj.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', textDecoration: 'none', color: 'inherit', borderRadius: '14px', overflow: 'hidden', height: '100%' }}
      >
        {/* Window chrome */}
        <div style={{
          background: '#111111',
          border: `1px solid ${hovered ? 'rgba(77,162,255,0.22)' : '#222222'}`,
          borderRadius: '14px',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease',
          height: '100%',
        }}>
          {/* Title bar */}
          <div style={{
            background: '#1a1a1a',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderBottom: '1px solid #222',
          }}>
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
            </div>
            {/* Filename */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#555', fontFamily: "'SF Mono', 'Fira Code', monospace" }}>
                {proj.filename}
              </span>
            </div>
            {/* Lang badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: proj.langColor }} />
              <span style={{ fontSize: '10px', color: '#555', fontFamily: "'SF Mono', 'Fira Code', monospace" }}>
                {proj.lang}
              </span>
            </div>
          </div>

          {/* Code area */}
          <div style={{
            background: '#0d0d0d',
            padding: '18px 0',
            fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
            fontSize: '12px',
            lineHeight: 1.85,
          }}>
            {proj.lines.map((line, li) => (
              <div
                key={li}
                style={{ display: 'flex', paddingLeft: '16px', paddingRight: '16px' }}
              >
                {/* Line number */}
                <span style={{ color: '#333', fontSize: '10px', minWidth: '24px', marginRight: '16px', userSelect: 'none', paddingTop: '1px' }}>
                  {li + 1}
                </span>
                {/* Tokens */}
                <span>
                  {line.tokens.map((tok, ti) =>
                    tok.t === 'indent' ? (
                      <span key={ti} style={{ marginLeft: '20px' }} />
                    ) : (
                      <span key={ti} style={{ color: TOKEN_COLORS[tok.t] ?? '#d1d5db', fontStyle: tok.t === 'comment' ? 'italic' : 'normal' }}>
                        {tok.v}
                      </span>
                    )
                  )}
                  {line.cursor && <BlinkingCursor />}
                </span>
              </div>
            ))}
          </div>

          {/* Footer bar */}
          <div style={{
            background: '#141414',
            padding: '14px 20px',
            borderTop: '1px solid #222',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            {/* Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {proj.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '10px', fontWeight: 600, color: '#4da2ff',
                  background: 'rgba(77,162,255,0.08)', border: '1px solid rgba(77,162,255,0.18)',
                  padding: '2px 9px', borderRadius: '999px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
            {/* GitHub arrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#555', fontSize: '11px', fontFamily: 'monospace' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View source ↗
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

export default function Building() {
  return (
    <section id="building" style={{ padding: '96px 0', background: 'rgba(20,20,20,0.5)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '-80px', left: '-60px', width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(77,162,255,0.04)', filter: 'blur(140px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 22s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-60px', right: '-80px', width: '340px', height: '340px', borderRadius: '50%', background: 'rgba(245,158,11,0.03)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0, animation: 'orb-drift 30s ease-in-out infinite reverse' }} />
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } as Transition}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ marginBottom: '12px' }}>
            <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#4da2ff' }}>
              I also build things
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.05 }}>
            Side{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>
              projects
            </em>
          </h2>
          <p style={{ marginTop: '12px', fontSize: '15px', color: '#878787', maxWidth: '520px', lineHeight: 1.7 }}>
            IT background, built with a little help from Claude, ChatGPT, and Gemini.
            A couple of things I shipped because I needed them.
          </p>
        </motion.div>

        {/* Terminal cards grid */}
        <div className="r-single" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', alignItems: 'stretch' }}>
          {PROJECTS.map((proj, i) => (
            <TerminalCard key={proj.name} proj={proj} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
