"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { Calendar, MapPin, Clock, ChevronDown, Ticket } from "lucide-react"
import { EVENT } from "@/lib/event"
import { ChristmasLights } from "@/components/christmas-lights"

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
          src="/images/hero.png"
          alt="Fiesta de Navidad FRIDHA con luces doradas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-background" />
        {/* Santa-red wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,oklch(0.5_0.2_25/0.4),transparent_70%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--background)_140%)]" />
      </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Top garland draped over the title */}
          <ChristmasLights
            count={12}
            className="pointer-events-none absolute -top-6 left-1/2 h-16 w-[112%] -translate-x-1/2 sm:-top-8 sm:h-20"
          />

          <h1 className="text-gold-gradient font-display text-[22vw] leading-[0.82] tracking-tight drop-shadow-[0_0_35px_oklch(0.6_0.2_25/0.35)] sm:text-[16rem]">
            {EVENT.name}
          </h1>

          {/* Bottom garland hanging under the title */}
          <ChristmasLights
            count={12}
            flip
            className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-[108%] -translate-x-1/2 sm:-bottom-10 sm:h-20"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 max-w-xl text-balance text-base text-foreground/80 sm:text-lg"
        >
          La fiesta de Navidad del año. Una noche de lujo, luces doradas y la mejor música
          hasta el amanecer.
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

        <motion.a
          href={EVENT.ticketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_0_40px_-8px_var(--gold)] transition-shadow hover:shadow-[0_0_60px_-6px_var(--gold)]"
        >
          <Ticket className="size-5" aria-hidden="true" />
          Comprar Entradas
        </motion.a>
      </motion.div>

      <motion.a
        href="#video"
        aria-label="Bajar a la siguiente sección"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="size-7" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  )
}
