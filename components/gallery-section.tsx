"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { GALLERY } from "@/lib/event"
import { Reveal } from "@/components/reveal"

const spanClass: Record<string, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  normal: "",
}

export function GallerySection() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    [],
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [active, close, next, prev])

  return (
    <section id="galeria" className="relative py-20 sm:py-28">
      <div className="mesh-red pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            La experiencia
          </p>
          <h2 className="font-display text-5xl tracking-tight sm:text-7xl">Ediciones anteriores</h2>
        </Reveal>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-3">
          {GALLERY.map((photo, i) => (
            <motion.button
              type="button"
              key={photo.src}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-xl border border-gold/15 ${spanClass[photo.span]}`}
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Foto ampliada"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-gold/30 bg-background/60 text-foreground transition-colors hover:text-gold"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Anterior"
              className="absolute left-4 grid size-11 place-items-center rounded-full border border-gold/30 bg-background/60 text-foreground transition-colors hover:text-gold sm:left-8"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative h-[75vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY[active].src || "/placeholder.svg"}
                alt={GALLERY[active].alt}
                fill
                sizes="90vw"
                className="rounded-xl object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Siguiente"
              className="absolute right-4 grid size-11 place-items-center rounded-full border border-gold/30 bg-background/60 text-foreground transition-colors hover:text-gold sm:right-8"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
