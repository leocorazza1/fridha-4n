"use client"

import { motion } from "motion/react"
import { Disc3 } from "lucide-react"
import { EVENT } from "@/lib/event"
import { Reveal } from "@/components/reveal"

export function SpotifySection() {
  return (
    <section id="playlist" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 12, ease: "linear" }}
                className="relative grid size-28 shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-background shadow-2xl sm:size-36"
              >
                <div className="absolute inset-2 rounded-full border border-gold/10" />
                <div className="absolute inset-6 rounded-full border border-gold/10" />
                <div className="grid size-10 place-items-center rounded-full bg-gold sm:size-12">
                  <Disc3 className="size-5 text-primary-foreground sm:size-6" aria-hidden="true" />
                </div>
              </motion.div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                  El sonido de FRIDHA
                </p>
                <h2 className="font-display text-4xl leading-none tracking-tight sm:text-6xl">
                  La playlist oficial
                </h2>
              </div>
            </div>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-foreground/75">
              Preparate para la noche. Dale play a la selección oficial de FRIDHA y viví el clima
              antes de que empiece la fiesta. House, disco y clásicos navideños con onda.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-gold/20 bg-card/60 p-3 shadow-2xl backdrop-blur-sm">
              <iframe
                title="Playlist oficial de FRIDHA en Spotify"
                className="w-full rounded-2xl"
                src={`https://open.spotify.com/embed/playlist/${EVENT.spotifyPlaylistId}?utm_source=generator&theme=0`}
                width="100%"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
