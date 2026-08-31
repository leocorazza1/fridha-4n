"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { Play } from "lucide-react"

export function VideoSection() {
  const ref = useRef<HTMLElement>(null)
  const [playing, setPlaying] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const posterY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])

  return (
    <section id="video" ref={ref} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/20 shadow-2xl">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&rel=0"
              title="Aftermovie FRIDHA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <motion.div style={{ y: posterY }} className="absolute inset-0 scale-110">
                <Image
                  src="/images/video-poster.png"
                  alt="Aftermovie de FRIDHA"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-background/40" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="font-display text-5xl tracking-tight text-foreground sm:text-7xl"
                >
                  Vení a vivirlo
                </motion.p>
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group inline-flex items-center gap-3 rounded-full bg-gold/95 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-primary-foreground/15">
                    <Play className="size-4 fill-current" aria-hidden="true" />
                  </span>
                  Ver el aftermovie
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
