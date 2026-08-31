import { Camera, Music2, Mail } from "lucide-react"
import { EVENT } from "@/lib/event"

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/15 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-5xl leading-none tracking-tight text-gold-gradient">
              {EVENT.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {EVENT.date} · {EVENT.venue}, {EVENT.city}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:items-end">
            <div className="flex items-center gap-3">
              <a
                href={EVENT.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de FRIDHA"
                className="grid size-11 place-items-center rounded-full border border-gold/25 text-foreground/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Camera className="size-5" aria-hidden="true" />
              </a>
              <a
                href={EVENT.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de FRIDHA"
                className="grid size-11 place-items-center rounded-full border border-gold/25 text-foreground/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Music2 className="size-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${EVENT.contactEmail}`}
                aria-label="Enviar email a FRIDHA"
                className="grid size-11 place-items-center rounded-full border border-gold/25 text-foreground/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Mail className="size-5" aria-hidden="true" />
              </a>
            </div>
            <a
              href={`mailto:${EVENT.contactEmail}`}
              className="text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              {EVENT.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-gold/10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {EVENT.name}. Todos los derechos reservados. Evento para
          mayores de 18 años.
        </div>
      </div>
    </footer>
  )
}
