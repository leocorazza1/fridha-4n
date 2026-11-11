"use client"

import { useState, type FormEvent } from "react"
import { motion } from "motion/react"
import { Check, Crown, MessageCircle, Sparkles } from "lucide-react"
import { EVENT, VIP_RESERVED_TABLES, VIP_TIERS } from "@/lib/event"
import { Reveal } from "@/components/reveal"

type Tier = (typeof VIP_TIERS)[number]

const inputClass =
  "w-full rounded-xl border border-gold/20 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors focus:border-gold/60"

function tierOfTable(table: string): Tier | undefined {
  return VIP_TIERS.find((t) => (t.tables as readonly string[]).includes(table))
}

export function VipSection() {
  const [table, setTable] = useState<string | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dni, setDni] = useState("")
  const [error, setError] = useState<string | null>(null)

  const tier = table ? tierOfTable(table) : undefined

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const cleanDni = dni.replace(/\D/g, "")
    if (!table || !tier) return setError("Elegí una mesa primero.")
    if (!firstName.trim() || !lastName.trim()) return setError("Completá nombre y apellido.")
    if (!/^\d{7,8}$/.test(cleanDni)) return setError("Ingresá un DNI válido (7 u 8 números).")
    setError(null)

    const message = [
      `¡Hola FRIDHA! Quiero reservar una mesa VIP 🍾`,
      ``,
      `Experiencia: ${tier.name}`,
      `Mesa: ${table}`,
      `Nombre: ${firstName.trim()} ${lastName.trim()}`,
      `DNI: ${cleanDni}`,
    ].join("\n")

    window.open(
      `https://wa.me/${EVENT.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <section id="vip" className="relative py-20 sm:py-28">
      <div className="mesh-red pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Cupos limitados — Asegurá tu mesa
          </p>
          <h2 className="font-display text-5xl tracking-tight sm:text-7xl">Mesas VIP</h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-foreground/70">
            Tu grupo, tu espacio exclusivo y las mejores bebidas para disfrutar toda la noche. Dos
            experiencias, una noche inolvidable.
          </p>
        </Reveal>

        {/* Tiers */}
        <div className="grid gap-6 md:grid-cols-2">
          {VIP_TIERS.map((t, i) => {
            const active = tier?.id === t.id
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col rounded-2xl p-7 transition-shadow ${
                  t.featured ? "glow-border" : "glass"
                } ${active ? "ring-2 ring-gold/70" : ""}`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-background">
                    <Crown className="size-3" aria-hidden="true" />
                    Premium
                  </span>
                )}
                <h3 className="font-display text-3xl tracking-wide text-gold">{t.name}</h3>
                <p className="mt-2 text-sm text-foreground/70">{t.tagline}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-end justify-between gap-4 rounded-xl border border-gold/30 bg-gradient-to-r from-gold/15 to-gold/5 px-5 py-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
                      Precio por mesa
                    </p>
                    <p className="font-display text-4xl leading-none tracking-wide text-gold">
                      {t.price}
                    </p>
                  </div>
                  <p className="text-right text-[11px] text-foreground/55">10 personas</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Table picker + form */}
        <Reveal delay={0.1} className="glass mt-12 rounded-2xl p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="font-display text-2xl tracking-wide">1. Elegí tu mesa</p>
              <p className="mt-1 text-sm text-foreground/60">3 mesas por experiencia.</p>
              <p className="mt-1 text-xs italic text-foreground/45">
                * La ubicación de las mesas es ilustrativa, no corresponde al plano definitivo.
              </p>

              <div className="mt-6 rounded-xl border border-gold/15 bg-background/30 p-5">
                <div className="mx-auto mb-6 w-2/3 rounded-md border border-gold/30 bg-gold/10 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Escenario
                </div>
                <div className="space-y-5">
                  {VIP_TIERS.map((t) => (
                    <div key={t.id}>
                      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">
                        {t.name}
                      </p>
                      <div className="flex justify-center gap-4">
                        {t.tables.map((id) => {
                          const reserved = VIP_RESERVED_TABLES.includes(id)
                          const selected = table === id
                          return (
                            <button
                              key={id}
                              type="button"
                              disabled={reserved}
                              onClick={() => {
                                setTable(id)
                                setError(null)
                              }}
                              aria-pressed={selected}
                              aria-label={`Mesa ${id} — ${t.name}${reserved ? " (reservada)" : ""}`}
                              className={`flex size-16 flex-col items-center justify-center rounded-full border text-sm font-bold transition-all sm:size-20 ${
                                reserved
                                  ? "cursor-not-allowed border-foreground/10 text-foreground/25 line-through"
                                  : selected
                                    ? "scale-110 border-gold bg-gold text-background shadow-[0_0_30px_-4px] shadow-gold/70"
                                    : t.featured
                                      ? "border-gold/50 text-gold hover:scale-105 hover:bg-gold/10"
                                      : "border-gold/25 text-foreground/80 hover:scale-105 hover:bg-gold/10"
                              }`}
                            >
                              {t.featured && !reserved && (
                                <Crown className="size-3" aria-hidden="true" />
                              )}
                              {id}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 whitespace-nowrap text-[11px] text-foreground/50">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full border border-gold/50" /> Disponible
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-gold" /> Tu elección
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full border border-foreground/15" /> Reservada
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col">
              <p className="font-display text-2xl tracking-wide">2. Tus datos</p>
              <p className="mt-1 text-sm text-foreground/60">
                Te abrimos WhatsApp con la reserva lista para enviar.
              </p>

              <div className="mt-6 rounded-xl border border-gold/15 bg-gold/5 px-4 py-3 text-sm">
                {tier && table ? (
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <Sparkles className="size-4 text-gold" aria-hidden="true" />
                    <span className="text-gold">{tier.name}</span>
                    <span className="whitespace-nowrap text-foreground/60">· Mesa {table}</span>
                  </p>
                ) : (
                  <p className="text-foreground/50">Todavía no elegiste mesa.</p>
                )}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-foreground/60">
                    Nombre
                  </span>
                  <input
                    className={inputClass}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    placeholder="Juan"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-foreground/60">
                    Apellido
                  </span>
                  <input
                    className={inputClass}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    placeholder="Pérez"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-foreground/60">
                  DNI
                </span>
                <input
                  className={inputClass}
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  inputMode="numeric"
                  placeholder="12345678"
                />
              </label>

              <p className="mt-5 rounded-xl border border-crimson/30 bg-crimson/10 px-4 py-3 text-xs text-foreground/75">
                <span className="font-semibold text-foreground">Importante:</span> una vez reservada,
                la mesa se confirma abonando una seña. Te pasamos los datos por WhatsApp.
              </p>

              {error && (
                <p role="alert" className="mt-4 text-sm text-crimson">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-cta mt-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-[1.02] max-lg:mt-8"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Reservar por WhatsApp
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
