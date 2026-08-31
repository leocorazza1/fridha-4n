"use client"

type Props = {
  count?: number
  className?: string
  flip?: boolean
}

// A swagged string of Christmas bulbs drawn as SVG.
// The wire dips between anchor points and a bulb hangs at each dip.
const COLORS = [
  "oklch(0.62 0.22 25)", // red
  "oklch(0.82 0.15 86)", // gold
  "oklch(0.55 0.13 150)", // green
  "oklch(0.9 0.05 90)", // warm white
]

export function ChristmasLights({ count = 14, className, flip = false }: Props) {
  const width = 1000
  const height = 70
  const step = width / count
  const dip = 30

  // Build a wavy wire path made of quadratic swags between anchors.
  let d = `M 0 ${flip ? height - 8 : 8}`
  for (let i = 0; i < count; i++) {
    const x1 = i * step
    const x2 = (i + 1) * step
    const cx = (x1 + x2) / 2
    const anchorY = flip ? height - 8 : 8
    const dipY = flip ? height - 8 - dip : 8 + dip
    d += ` Q ${cx} ${dipY} ${x2} ${anchorY}`
  }

  const bulbs = Array.from({ length: count }, (_, i) => {
    const cx = i * step + step / 2
    const cy = (flip ? height - 8 - dip : 8 + dip) + (flip ? -2 : 2)
    const color = COLORS[i % COLORS.length]
    return { cx, cy, color, delay: (i % 6) * 0.28 }
  })

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke="oklch(0.4 0.03 150)" strokeWidth={2} />
      {bulbs.map((b, i) => (
        <g
          key={i}
          className="animate-bulb"
          style={{ animationDelay: `${b.delay}s`, transformOrigin: `${b.cx}px ${b.cy}px` }}
        >
          {/* socket */}
          <rect
            x={b.cx - 2.5}
            y={flip ? b.cy + 3 : b.cy - 9}
            width={5}
            height={7}
            rx={1}
            fill="oklch(0.35 0.02 150)"
          />
          {/* glow */}
          <circle cx={b.cx} cy={b.cy} r={12} fill={b.color} opacity={0.28} />
          {/* bulb */}
          <circle cx={b.cx} cy={b.cy} r={5.5} fill={b.color} />
          {/* highlight */}
          <circle cx={b.cx - 1.6} cy={b.cy - 1.6} r={1.6} fill="oklch(1 0 0)" opacity={0.7} />
        </g>
      ))}
    </svg>
  )
}
