export type Promoter = {
  id: string
  name: string
  ticketsSold: number
}

const MOCK_PROMOTERS: Promoter[] = [
  { id: "1", name: "Moises Funes", ticketsSold: 87 },
  { id: "2", name: "Cande Rios", ticketsSold: 74 },
  { id: "3", name: "Fran Alvarez", ticketsSold: 61 },
  { id: "4", name: "Sol Medina", ticketsSold: 48 },
  { id: "5", name: "Tomi Ledesma", ticketsSold: 42 },
  { id: "6", name: "Vale Gimenez", ticketsSold: 35 },
  { id: "7", name: "Nico Farias", ticketsSold: 29 },
  { id: "8", name: "Agus Peralta", ticketsSold: 21 },
]

// TODO: swap for `fetch(ENDPOINTS.promotersRanking)` once the ticketing API exposes this data
export async function getPromotersRanking(): Promise<Promoter[]> {
  await new Promise((resolve) => setTimeout(resolve, 350))
  return [...MOCK_PROMOTERS].sort((a, b) => b.ticketsSold - a.ticketsSold)
}
