import { useEffect, useRef, useState } from 'react'
import styles from './ParticleBackground.module.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

const DARK_ACCENT_RGB  = '224, 122, 74'
const LIGHT_ACCENT_RGB = '180, 90, 35'
const CONNECTION_DIST = 130

function initParticles(w: number, h: number): Particle[] {
  const count = w < 768 ? 45 : 80
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 1.5 + 0.8,
    opacity: Math.random() * 0.4 + 0.15,
  }))
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(false)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const sync = () =>
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = initParticles(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const accentRgb = isDark ? DARK_ACCENT_RGB : LIGHT_ACCENT_RGB
    const dotOpacityScale  = isDark ? 1 : 0.55
    const lineOpacityScale = isDark ? 0.18 : 0.10

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const ps = particlesRef.current

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentRgb}, ${p.opacity * dotOpacityScale})`
        ctx.fill()

        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECTION_DIST) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${accentRgb}, ${(1 - d / CONNECTION_DIST) * lineOpacityScale})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  )
}
