"use client"

import { motion } from "motion/react"
import { Ticket } from "lucide-react"
import { EVENT, TICKETS } from "@/lib/event"
import { Reveal } from "@/components/reveal"
import { Countdown } from "@/components/countdown"

export function TicketsSection() {
  return (
    <section id="entradas" className="relative py-20 sm:py-28">
      <div className="mesh-red pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
           No te quedes afuera, Tu lugar en FRIDHA empieza acá
          </p>
          <h2 className="font-display text-5xl tracking-tight sm:text-7xl">Conseguí tu entrada</h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-foreground/70">
            La noche ya se está armando y vos tenés que ser parte. Conseguí tu entrada, asegurá tu lugar y preparate para brindar, bailar y arrancar la Navidad como se merece.
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
              className={`relative flex flex-col rounded-2xl p-7 ${
                t.featured ? "glow-border md:-translate-y-3 md:scale-[1.03]" : "glass"
              }`}
            >
              <h3 className="font-display text-3xl tracking-wide text-gold">{t.name}</h3>
              <p className="mt-3 flex-1 text-pretty text-base text-foreground/80">{t.note}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Precio a confirmar
              </p>

              {EVENT.ticketsAvailable ? (
                <a
                  href={EVENT.ticketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                    t.featured
                      ? "btn-cta"
                      : "border border-gold/40 text-gold hover:bg-gold/10"
                  }`}
                >
                  <Ticket className="size-4" aria-hidden="true" />
                  Comprar
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className={`mt-7 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold opacity-50 ${
                    t.featured
                      ? "btn-cta"
                      : "border border-gold/40 text-gold"
                  }`}
                >
                  <Ticket className="size-4" aria-hidden="true" />
                  Próximamente
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-14 text-center">
          {EVENT.ticketsAvailable ? (
            <a
              href={EVENT.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-bold transition-transform hover:scale-105"
            >
              <Ticket className="size-6" aria-hidden="true" />
              Comprar Entradas
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="btn-cta inline-flex cursor-not-allowed items-center gap-3 rounded-full px-10 py-5 text-lg font-bold opacity-50"
            >
              <Ticket className="size-6" aria-hidden="true" />
              Próximamente
            </button>
          )}
        </Reveal>
      </div>
    </section>
  )
}
