"use client"

import { useState, type FormEvent } from "react"
import { MessageCircle, Sparkles } from "lucide-react"
import { CUP_SPONSOR, CUP_TAKEN_SLOTS } from "@/lib/event"
import { Reveal } from "@/components/reveal"

const inputClass =
  "w-full rounded-xl border border-gold/20 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors focus:border-gold/60"

export function CupSection() {
  const [slot, setSlot] = useState<string | null>(null)
  const [brand, setBrand] = useState("")
  const [contact, setContact] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!slot) return setError("Elegí una ubicación primero.")
    if (!brand.trim() || !contact.trim()) return setError("Completá marca y nombre de contacto.")
    setError(null)

    const message = [
      `¡Hola FRIDHA! Quiero poner mi logo en el vaso 🥤`,
      ``,
      `Ubicación: Lugar ${slot}`,
      `Marca: ${brand.trim()}`,
      `Contacto: ${contact.trim()}`,
    ].join("\n")

    window.open(
      `https://wa.me/${CUP_SPONSOR.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <section id="vaso" className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Solo 6 lugares — Sumá tu marca
          </p>
          <h2 className="font-display text-5xl tracking-tight sm:text-7xl">Tu logo en el vaso</h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-foreground/70">
            El vaso oficial de FRIDHA va a estar en la mano de todos toda la noche. Poné tu logo y
            que tu marca sea parte de la Navidad.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="glass rounded-2xl p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="font-display text-2xl tracking-wide">1. Elegí la ubicación</p>
              <p className="mt-1 text-sm text-foreground/60">Girá el vaso para ver dónde va cada logo.</p>

              <div className="mt-6 overflow-hidden rounded-xl border border-gold/15 bg-background/30">
                <iframe
                  src={CUP_SPONSOR.viewerUrl}
                  title="Vaso FRIDHA en 3D"
                  loading="lazy"
                  className="block h-80 w-full sm:h-96"
                />
              </div>

              <div className="mt-6 rounded-xl border border-gold/15 bg-background/30 p-5">
                <div className="mx-auto grid w-fit grid-cols-2 gap-4">
                  {CUP_SPONSOR.slots.map((id) => {
                    const taken = CUP_TAKEN_SLOTS.includes(id)
                    const selected = slot === id
                    return (
                      <button
                        key={id}
                        type="button"
                        disabled={taken}
                        onClick={() => {
                          setSlot(id)
                          setError(null)
                        }}
                        aria-pressed={selected}
                        aria-label={`Lugar ${id}${taken ? " (vendido)" : ""}`}
                        className={`flex size-16 flex-col items-center justify-center rounded-lg border text-sm font-bold transition-all sm:size-20 ${
                          taken
                            ? "cursor-not-allowed border-foreground/10 text-foreground/25 line-through"
                            : selected
                              ? "scale-110 border-gold bg-gold text-background shadow-[0_0_30px_-4px] shadow-gold/70"
                              : "border-gold/40 text-foreground/80 hover:scale-105 hover:bg-gold/10"
                        }`}
                      >
                        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] opacity-70">
                          Logo
                        </span>
                        {id}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 whitespace-nowrap text-[11px] text-foreground/50">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm border border-gold/50" /> Disponible
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-gold" /> Tu elección
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm border border-foreground/15" /> Vendido
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col">
              <p className="font-display text-2xl tracking-wide">2. Tus datos</p>
              <p className="mt-1 text-sm text-foreground/60">
                Te abrimos WhatsApp con la solicitud lista para enviar.
              </p>

              <div className="mt-6 flex items-end justify-between gap-4 rounded-xl border border-gold/30 bg-gradient-to-r from-gold/15 to-gold/5 px-5 py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
                    Precio por logo
                  </p>
                  <p className="font-display text-4xl leading-none tracking-wide text-gold">
                    {CUP_SPONSOR.price}
                  </p>
                </div>
                <p className="text-sm">
                  {slot ? (
                    <span className="inline-flex items-center gap-1.5 text-gold">
                      <Sparkles className="size-4" aria-hidden="true" />
                      Lugar {slot}
                    </span>
                  ) : (
                    <span className="text-foreground/50">Sin ubicación</span>
                  )}
                </p>
              </div>

              <label className="mt-5 block">
                <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-foreground/60">
                  Marca / Empresa
                </span>
                <input
                  className={inputClass}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  autoComplete="organization"
                  placeholder="Tu marca"
                />
              </label>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-foreground/60">
                  Nombre de contacto
                </span>
                <input
                  className={inputClass}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  autoComplete="name"
                  placeholder="Juan Pérez"
                />
              </label>

              <p className="mt-5 rounded-xl border border-crimson/30 bg-crimson/10 px-4 py-3 text-xs text-foreground/75">
                <span className="font-semibold text-foreground">Importante:</span> el lugar se
                confirma con el pago. Por WhatsApp te pedimos el logo y te pasamos los datos.
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
                Quiero mi logo en el vaso
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
