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
      <div className="mx-auto max-w-sm px-6">
        <div className="relative aspect-9/16 w-full overflow-hidden rounded-2xl border border-gold/20 shadow-2xl">
          {playing ? (
            <video
              ref={(node) => {
                if (!node) return
                const el = node as HTMLVideoElement & { webkitEnterFullscreen?: () => void }
                if (el.requestFullscreen) {
                  el.requestFullscreen().catch(() => {})
                } else if (el.webkitEnterFullscreen) {
                  el.webkitEnterFullscreen()
                }
              }}
              className="absolute inset-0 h-full w-full object-cover"
              src="/fridha/aftermovie.mp4"
              autoPlay
              controls
              playsInline
            />
          ) : (
            <>
              <motion.div style={{ y: posterY }} className="absolute inset-0 scale-110">
                <Image
                  src="/fridha/7.jpg"
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
