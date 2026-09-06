"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Crown, Medal, Sparkles } from "lucide-react"
import { EVENT } from "@/lib/event"
import { getPromotersRanking, type Promoter } from "@/services"
import { Reveal } from "@/components/reveal"

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

const PODIUM_STYLE: Record<number, { order: string; height: string; card: string; icon: string }> = {
  0: { order: "sm:order-2", height: "sm:pb-10", card: "glow-border sm:scale-105", icon: "text-gold" },
  1: { order: "sm:order-1", height: "", card: "glass", icon: "text-foreground/70" },
  2: { order: "sm:order-3", height: "", card: "glass", icon: "text-foreground/50" },
}

function Podium({ promoters }: { promoters: Promoter[] }) {
  const top3 = promoters.slice(0, 3)
  const leaderTickets = top3[0]?.ticketsSold ?? 1

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {top3.map((promoter, i) => {
        const style = PODIUM_STYLE[i]
        return (
          <motion.div
            key={promoter.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex flex-col items-center rounded-2xl p-6 text-center ${style.order} ${style.height} ${style.card}`}
          >
            {i === 0 ? (
              <Crown className={`mb-2 size-7 ${style.icon}`} aria-hidden="true" />
            ) : (
              <Medal className={`mb-2 size-6 ${style.icon}`} aria-hidden="true" />
            )}
            <div className="grid size-16 place-items-center rounded-full bg-gold/15 font-display text-2xl tracking-wide text-gold">
              {getInitials(promoter.name)}
            </div>
            <p className="mt-3 font-display text-xl tracking-wide">{promoter.name}</p>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              #{i + 1} del ranking
            </p>
            <p className="mt-3 font-display text-3xl text-gold">{promoter.ticketsSold}</p>
            <p className="text-xs text-foreground/60">entradas vendidas</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gold"
                style={{ width: `${(promoter.ticketsSold / leaderTickets) * 100}%` }}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function RankingListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-xl bg-secondary/40" />
      ))}
    </div>
  )
}

export function RankingSection() {
  const [promoters, setPromoters] = useState<Promoter[] | null>(null)

  useEffect(() => {
    let active = true
    getPromotersRanking().then((data) => {
      if (active) setPromoters(data)
    })
    return () => {
      active = false
    }
  }, [])

  const rest = promoters?.slice(3) ?? []
  const leaderTickets = promoters?.[0]?.ticketsSold ?? 1

  return (
    <section id="ranking" className="relative py-20 sm:py-28">
      <div className="mesh-red pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Sumate al equipo
          </p>
          <h2 className="font-display text-5xl tracking-tight sm:text-7xl">Ranking de Promotores</h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-foreground/70">
            Los que más movieron a FRIDHA. Compartí tu link, vendé entradas y subí en la tabla.
          </p>
        </Reveal>

        {promoters === null ? (
          <RankingListSkeleton />
        ) : (
          <>
            <Reveal delay={0.1} className="mb-10">
              <Podium promoters={promoters} />
            </Reveal>

            <div className="space-y-2">
              {rest.map((promoter, i) => (
                <motion.div
                  key={promoter.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="glass flex items-center gap-4 rounded-xl px-4 py-3"
                >
                  <span className="w-6 shrink-0 text-center font-display text-lg text-foreground/50">
                    {i + 4}
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/10 text-sm font-semibold text-gold">
                    {getInitials(promoter.name)}
                  </span>
                  <span className="flex-1 truncate text-sm font-medium">{promoter.name}</span>
                  <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-secondary sm:block">
                    <div
                      className="h-full rounded-full bg-gold/70"
                      style={{ width: `${(promoter.ticketsSold / leaderTickets) * 100}%` }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-sm font-semibold text-foreground/80">
                    {promoter.ticketsSold}
                  </span>
                </motion.div>
              ))}
            </div>
          </>
        )}

        <Reveal delay={0.15} className="mt-14 text-center">
          <a
            href={`mailto:${EVENT.contactEmail}?subject=Quiero%20ser%20promotor%20FRIDHA`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-transform hover:scale-[1.03] hover:bg-gold/10"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            Quiero ser promotor
          </a>
        </Reveal>
      </div>
    </section>
  )
}
