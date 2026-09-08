"use client"

import { motion } from "motion/react"
import { Sparkles, Trophy } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function RankingSection() {
  return (
    <section id="ranking" className="relative py-20 sm:py-28">
      <div className="mesh-red pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Próximamente
          </p>
          <h2 className="font-display text-5xl tracking-tight sm:text-7xl">Ranking de Promotores</h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-foreground/70">
            Ya viene el programa de promotores FRIDHA: compartí tu link, vendé entradas y subí en la
            tabla en vivo.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass glow-border mt-12 rounded-2xl px-8 py-12"
        >
          <Trophy className="mx-auto size-8 text-gold" aria-hidden="true" />
          <p className="mt-4 font-display text-2xl tracking-wide">¿Querés estar acá y ganar premios?</p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-foreground/70">
            Los que más entradas vendan van a subir en el ranking y se van a llevar premios FRIDHA.
            Sumate antes de que arranque.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            <Sparkles className="size-3.5" aria-hidden="true" />
            El #1 del ranking se corona Fridha Gold
          </div>
          <p className="mx-auto mt-4 max-w-sm text-xs text-foreground/50">
            Muy pronto contamos cómo funciona, qué premios hay y cómo anotarte.
          </p>

          <button
            disabled
            className="mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold opacity-50"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            Quiero ser promotor (próximamente)
          </button>
        </motion.div>
      </div>
    </section>
  )
}
