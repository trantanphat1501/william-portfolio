import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import YouTubeContent from './components/YouTubeContent'
import Building from './components/Building'
import Connect from './components/Connect'
import Footer from './components/Footer'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Lenis buttery smooth scroll — learned from Linear.app, Framer.com, Vercel
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ background: '#07090f', color: '#e6edf5' }}
        >
          <Navbar />
          <Hero />
          <Experience />
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(77,162,255,0.14), transparent)' }} />
          <Achievements />
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(77,162,255,0.10), transparent)' }} />
          <YouTubeContent />
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(77,162,255,0.10), transparent)' }} />
          <Building />
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(77,162,255,0.14), transparent)' }} />
          <Connect />
          <Footer />
        </motion.div>
      )}
    </>
  )
}
