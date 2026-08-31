"use client"

import { useEffect, useState } from "react"

type Particle = {
  left: number
  size: number
  delay: number
  duration: number
  drift: number
  opacity: number
  red: boolean
}

export function Particles({ count = 40 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  // Generate on the client only to avoid hydration mismatch
  useEffect(() => {
    const items: Particle[] = Array.from({ length: count }, () => {
      const red = Math.random() > 0.55
      return {
        left: Math.random() * 100,
        size: red ? 2 + Math.random() * 3 : 2 + Math.random() * 4,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 120,
        opacity: 0.4 + Math.random() * 0.5,
        red,
      }
    })
    setParticles(items)
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.red
              ? "radial-gradient(circle, oklch(0.72 0.24 25), oklch(0.5 0.2 22))"
              : "radial-gradient(circle, oklch(0.99 0 0), oklch(0.85 0.02 250))",
            boxShadow: p.red
              ? "0 0 8px oklch(0.65 0.24 22 / 0.9)"
              : "0 0 6px oklch(0.95 0.02 250 / 0.8)",
            // custom props consumed by the snow-fall keyframes
            ["--snow-opacity" as string]: `${p.opacity}`,
            ["--snow-drift" as string]: `${p.drift}px`,
            animation: `snow-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
