"use client"

import { Camera } from "lucide-react"
import { EVENT } from "@/lib/event"
import { Reveal } from "@/components/reveal"

const handle = EVENT.socials.instagram.split("/").pop()

export function InstagramSection() {
  return (
    <section id="instagram" className="relative py-20 sm:py-28">
      <div className="mesh-red pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              @{handle}
            </p>
            <h2 className="font-display text-4xl leading-none tracking-tight sm:text-6xl">
              Seguinos en Instagram
            </h2>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-foreground/75">
              Novedades, line up, sorteos y todo lo que pasa en FRIDHA, primero en nuestro Instagram.
            </p>
            <a
              href={EVENT.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-[1.03]"
            >
              <Camera className="size-5" aria-hidden="true" />
              Ver perfil
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass @container mx-auto max-w-md rounded-3xl p-3 shadow-2xl">
              <iframe
                title={`Perfil de Instagram de @${handle}`}
                className="w-full rounded-2xl bg-white"
                // Embed = fixed ~146px profile header + 2 rows of a 3-column square grid
                style={{ height: "calc(146px + 66.67cqi)" }}
                src={`https://www.instagram.com/${handle}/embed`}
                frameBorder="0"
                scrolling="no"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
