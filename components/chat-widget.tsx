"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { motion, AnimatePresence } from "motion/react"
import { Gift, X, Send, Sparkles } from "lucide-react"

const SUGGESTIONS = ["¿Dónde es?", "¿A qué hora abre?", "¿Cómo compro entradas?", "Poneme en contacto con un promotor"]

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [{ type: "text", text: "¡Hey! 🪩 ¿Listo para FRIDHA? Preguntame lo que quieras sobre la fiesta." }],
  },
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: INITIAL_MESSAGES,
  })

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || status === "streaming" || status === "submitted") return
    sendMessage({ text: trimmed })
    setInput("")
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    e.preventDefault()
    send(input)
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        {!open && (
          <span
            className="animate-cta-pulse absolute inset-0 rounded-full bg-gold/60 blur-2xl"
            aria-hidden="true"
          />
        )}
        <motion.button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar chat" : "Abrir chat de preguntas"}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative grid size-14 place-items-center rounded-full bg-gold text-primary-foreground shadow-[0_0_35px_-6px_var(--gold)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="size-6" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Gift className="size-6" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

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
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-gold text-primary-foreground"
                        : "rounded-bl-sm bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {m.parts.map((part, i) => (part.type === "text" ? <span key={i}>{part.text}</span> : null))}
                  </div>
                </div>
              ))}
              {status === "submitted" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2 text-sm text-secondary-foreground">
                    Escribiendo…
                  </div>
                </div>
              )}
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
