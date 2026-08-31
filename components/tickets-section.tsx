"use client"

import { motion } from "motion/react"
import { Check, Ticket, Star } from "lucide-react"
import { EVENT, TICKETS } from "@/lib/event"
import { Reveal } from "@/components/reveal"
import { Countdown } from "@/components/countdown"

export function TicketsSection() {
  return (
    <section id="entradas" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            No te la pierdas
          </p>
          <h2 className="font-display text-5xl tracking-tight sm:text-7xl">Conseguí tu entrada</h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-foreground/70">
            Los cupos vuelan. Asegurá tu lugar antes de que arranque la cuenta regresiva final.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mb-16">
          <Countdown dateISO={EVENT.dateISO} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {TICKETS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                t.featured
                  ? "border-gold/60 bg-gradient-to-b from-secondary/60 to-card shadow-[0_0_50px_-14px_var(--gold)]"
                  : "border-gold/15 bg-card/60"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Star className="size-3 fill-current" aria-hidden="true" />
                  Más elegida
                </span>
              )}
              <h3 className="font-display text-3xl tracking-wide text-gold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.note}</p>
              <p className="mt-5 font-display text-5xl tracking-tight">{t.price}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>

              <a
                href={EVENT.ticketsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                  t.featured
                    ? "bg-gold text-primary-foreground"
                    : "border border-gold/40 text-gold hover:bg-gold/10"
                }`}
              >
                <Ticket className="size-4" aria-hidden="true" />
                Comprar
              </a>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-14 text-center">
          <a
            href={EVENT.ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-lg font-bold text-primary-foreground shadow-[0_0_50px_-10px_var(--gold)] transition-transform hover:scale-105"
          >
            <Ticket className="size-6" aria-hidden="true" />
            Comprar Entradas
          </a>
        </Reveal>
      </div>
    </section>
  )
}
