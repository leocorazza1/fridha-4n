"use client"

import { useState, useEffect } from "react"

function getParts(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff / 3600000) % 24),
    min: Math.floor((diff / 60000) % 60),
    seg: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown({ dateISO }: { dateISO: string }) {
  const target = new Date(dateISO).getTime()
  const [parts, setParts] = useState(() => getParts(target))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setParts(getParts(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const items = [
    { label: "Días", value: parts.dias },
    { label: "Horas", value: parts.horas },
    { label: "Min", value: parts.min },
    { label: "Seg", value: parts.seg },
  ]

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center">
          <div className="grid min-w-[3.75rem] place-items-center rounded-xl border border-gold/25 bg-card/70 px-3 py-3 sm:min-w-[5rem] sm:py-4">
            <span className="font-display text-4xl leading-none text-gold-gradient sm:text-6xl tabular-nums">
              {mounted ? String(it.value).padStart(2, "0") : "--"}
            </span>
          </div>
          <span className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  )
}
