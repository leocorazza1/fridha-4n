"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { Calendar, MapPin, Clock, Ticket } from "lucide-react"
import { EVENT } from "@/lib/event"
import { Particles } from "@/components/particles"

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Background moves slower than scroll (parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <Image
          src="/fridha/Fridha_portada.jpg"
          alt="Fiesta de Navidad FRIDHA con luces doradas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        {/* Crimson mesh wash for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,oklch(0.58_0.24_25/0.35),transparent_68%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,oklch(0.45_0.2_350/0.35),transparent_60%)] mix-blend-screen" />
        {/* Dark vignette behind the headline column so the red/white title stays legible over bright red photo highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_78%_at_50%_48%,oklch(0.05_0_0/0.6),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--background)_135%)]" />
      </motion.div>

      {/* Floating snow / sparks */}
      <Particles count={46} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur-sm"
        >
          {EVENT.tagline}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-gold-gradient animate-hero-glow font-display text-[22vw] leading-[0.82] tracking-tight sm:text-[16rem]"
        >
          {EVENT.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 max-w-xl text-balance text-lg text-foreground/85 sm:text-xl"
        >
          Brindá en casa. <span className="text-gold">Festejá con nosotros.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex flex-col items-center gap-3 text-sm text-foreground/90 sm:flex-row sm:gap-6"
        >
          <span className="inline-flex items-center gap-2">
            <Calendar className="size-4 text-gold" aria-hidden="true" />
            {EVENT.date}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-gold" aria-hidden="true" />
            {EVENT.venue}, {EVENT.city}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-4 text-gold" aria-hidden="true" />
            {EVENT.time}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 w-full max-w-sm overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <div className="flex w-max animate-marquee">
            {[0, 1].map((rep) => (
              <span
                key={rep}
                className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-3 text-xs font-medium uppercase tracking-[0.3em] text-gold/70"
              >
                <span>{EVENT.date}</span>
                <span aria-hidden="true">✦</span>
                <span>{EVENT.venue}</span>
                <span aria-hidden="true">✦</span>
                <span>Cupos limitados</span>
                <span aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative mt-8 inline-flex"
        >
          <span
            className="animate-cta-pulse absolute inset-0 rounded-full bg-gold/60 blur-2xl"
            aria-hidden="true"
          />
          {EVENT.ticketsAvailable ? (
            <motion.a
              href={EVENT.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-cta relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold"
            >
              <Ticket className="size-5" aria-hidden="true" />
              Comprar Entradas
            </motion.a>
          ) : (
            <button
              type="button"
              disabled
              className="btn-cta relative inline-flex cursor-not-allowed items-center gap-2 rounded-full px-8 py-4 text-base font-semibold opacity-50"
            >
              <Ticket className="size-5" aria-hidden="true" />
              Próximamente Entradas
            </button>
          )}
        </motion.div>
      </motion.div>

      <motion.a
        href="#video"
        aria-label="Bajar a la siguiente sección"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gold"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold/80">
          Descubrí más
        </span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-gold/50 p-1.5">
          <span className="animate-scroll-dot size-1.5 rounded-full bg-gold" />
        </span>
      </motion.a>
    </section>
  )
}
