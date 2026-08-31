"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"
import { EVENT } from "@/lib/event"

type Message = { role: "bot" | "user"; text: string }

const SUGGESTIONS = ["¿Cuál es el dress code?", "¿Dónde es?", "¿A qué hora abre?", "¿Cómo compro entradas?"]

function botReply(input: string): string {
  const q = input.toLowerCase()
  if (/(dress|vestir|ropa|codigo|código|outfit)/.test(q))
    return "El dress code es elegante festivo. Sumate al clima navideño con dorados, rojos o negro. Nada de shorts ni ojotas."
  if (/(donde|dónde|ubicaci|lugar|direcci|como llego|cómo llego)/.test(q))
    return `Nos vemos en ${EVENT.venue}, ${EVENT.city}. Te recomendamos llegar en taxi o app de viajes.`
  if (/(hora|horario|abre|cierra|empieza|termina)/.test(q))
    return `Abrimos ${EVENT.time}. Te sugerimos llegar temprano para aprovechar el Early Bird y evitar filas.`
  if (/(entrada|ticket|comprar|precio|cuesta|vale|cuanto|cuánto)/.test(q))
    return `Podés comprar tus entradas online en ${EVENT.ticketsUrl}. Hay Early Bird, General y VIP mientras haya cupo.`
  if (/(fecha|cuando|cuándo|dia|día)/.test(q))
    return `FRIDHA es el ${EVENT.date}. ¡Marcá el calendario!`
  if (/(edad|menor|18|mayor)/.test(q))
    return "El evento es para mayores de 18 años. Traé tu documento, es obligatorio para ingresar."
  if (/(hola|buenas|hey|holis)/.test(q))
    return "¡Hola! Soy el asistente de FRIDHA. Preguntame por el dress code, ubicación, horarios o entradas."
  return "Buena pregunta. Para eso mejor escribinos por Instagram @fridha y te respondemos al toque. ¿Algo más sobre dress code, ubicación u horarios?"
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "¡Hola! Soy el asistente de FRIDHA. ¿En qué te puedo ayudar?" },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: "user", text: trimmed }])
    setInput("")
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: botReply(trimmed) }])
    }, 450)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    e.preventDefault()
    send(input)
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar chat" : "Abrir chat de preguntas"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-gold text-primary-foreground shadow-[0_0_35px_-6px_var(--gold)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="size-6" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="size-6" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[30rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-gold/25 bg-card/95 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3 border-b border-gold/15 bg-secondary/40 px-4 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-gold text-primary-foreground">
                <Sparkles className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-lg leading-none tracking-wide">Asistente FRIDHA</p>
                <p className="text-xs text-muted-foreground">Respondemos tus dudas al instante</p>
              </div>
            </div>

            <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-gold text-primary-foreground"
                        : "rounded-bl-sm bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gold/15 p-3">
              <div className="no-scrollbar mb-2 flex gap-2 overflow-x-auto">
                {SUGGESTIONS.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => send(s)}
                    className="whitespace-nowrap rounded-full border border-gold/30 px-3 py-1 text-xs text-foreground/80 transition-colors hover:bg-gold/10 hover:text-gold"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Escribí tu pregunta..."
                  aria-label="Escribí tu pregunta"
                  className="flex-1 rounded-full border border-gold/20 bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-gold/50"
                />
                <button
                  type="button"
                  onClick={() => send(input)}
                  aria-label="Enviar"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-primary-foreground transition-transform hover:scale-105"
                >
                  <Send className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
