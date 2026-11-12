"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Ticket } from "lucide-react"
import { EVENT, TICKETS } from "@/lib/event"

const ticket = TICKETS.find((t) => !t.soldOut && t.price)

export function MobileBuyBar() {
  const [pastHero, setPastHero] = useState(false)
  const [overlapping, setOverlapping] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    // Hide while the tickets section or the footer is on screen — the bar would be redundant / cover content
    const targets = [document.getElementById("entradas"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null,
    )
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
      }
      setOverlapping(visible.size > 0)
    })
    targets.forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [])

  if (!EVENT.ticketsAvailable) return null

  return (
    <AnimatePresence>
      {pastHero && !overlapping && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-background/85 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg md:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-display text-lg leading-tight tracking-wide text-gold">
                {ticket ? `${ticket.name} · ${ticket.price}` : EVENT.name}
              </p>
              <p className="truncate text-xs text-foreground/60">{EVENT.date}</p>
            </div>
            <a
              href={EVENT.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
            >
              <Ticket className="size-4" aria-hidden="true" />
              Comprar
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
