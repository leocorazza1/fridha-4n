import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { EVENT } from "@/lib/event"

export const maxDuration = 30

const SYSTEM_PROMPT = `Sos el asistente virtual de FRIDHA, una fiesta navideña.
Datos del evento:
- Fecha: ${EVENT.date}
- Horario: ${EVENT.time}
- Lugar: ${EVENT.venue}, ${EVENT.city}
- Entradas: ${EVENT.ticketsUrl}
- Instagram: ${EVENT.socials.instagram}
- Es para mayores de 18 años, documento obligatorio.

Respondé en español rioplatense, de forma breve y amigable. Si no sabés algo, derivá a Instagram.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
