"use client"

import { useEffect, useRef } from "react"

interface Ripple {
  x: number
  y: number
  r: number
  maxR: number
  alpha: number
  speed: number
}

export function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const lastTimeRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const onMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTimeRef.current < 50) return  // чаще создаём капли
      lastTimeRef.current = now

      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        maxR: 70 + Math.random() * 50,  // больше радиус
        alpha: 0.6,                      // ярче
        speed: 1.5 + Math.random() * 1, // быстрее
      })

      if (ripplesRef.current.length > 50) {
        ripplesRef.current.shift()
      }
    }

    window.addEventListener("mousemove", onMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rp = ripplesRef.current[i]
        rp.r += rp.speed
        rp.alpha *= 0.97  // медленнее затухает

        if (rp.r > rp.maxR || rp.alpha < 0.005) {
          ripplesRef.current.splice(i, 1)
          continue
        }

        // Кольцо-волна — ярче
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(16, 185, 129, ${rp.alpha * 0.2})`
        ctx.lineWidth = 0.3
        ctx.stroke()

        // Заполнение — заметнее
        const grad = ctx.createRadialGradient(
          rp.x, rp.y, rp.r * 0.3,
          rp.x, rp.y, rp.r
        )
        grad.addColorStop(0, `rgba(16, 185, 129, ${rp.alpha * 0.3})`)
        grad.addColorStop(0.6, `rgba(16, 185, 129, ${rp.alpha * 0.04})`)
        grad.addColorStop(1, `rgba(16, 185, 129, ${rp.alpha * 0.5})`)
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}