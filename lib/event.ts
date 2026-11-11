export const EVENT = {
  name: "FRIDHA",
  tagline: "Navidad en",
  date: "Jueves 24 de Diciembre",
  // ISO used by the countdown timer
  dateISO: "2026-12-24T23:00:00-03:00",
  time: "1:00 hs — 06:00 hs",
  venue: "Club Sportivo Realicó",
  city: "Realicó, La Pampa",
  ticketsUrl: "https://entradas.fridha.com",
  ticketsAvailable: false,
  chatVisible: false,
  spotifyPlaylistId: "64oGgzEWy5owo8rBNv6Brf",
  socials: {
    instagram: "https://instagram.com/fridha.realico"
  },
  contactEmail: "hola@fridha.com",
  // International format, digits only (used in wa.me links)
  whatsappNumber: "5492302502668",
}

export const VIP_TIERS = [
  {
    id: "experience",
    name: "FRIDHA GOLD EXPERIENCE",
    tagline: "La noche se disfruta mejor con amigos",
    featured: false,
    perks: [
      "10 ingresos VIP",
      "Sector exclusivo y delimitado para tu grupo",
      "1 botella de Fernet + Coca-Cola",
      "2 botellas de Smirnoff + Speed",
      "1 botella de Gin Gordon's + tónicas",
      "2 botellas de Champagne",
      "2 botellas de vino blanco",
      "2 six packs de cerveza",
      "10 aguas",
    ],
    // TODO: placeholder price
    price: "$1",
    tables: ["E1", "E2", "E3"],
  },
  {
    id: "platinum",
    name: "FRIDHA PLATINUM EXPERIENCE",
    tagline: "La experiencia premium de la noche",
    featured: true,
    perks: [
      "10 ingresos VIP",
      "Sector exclusivo y delimitado para tu grupo",
      "Acceso a baños exclusivos",
      "1 botella de Fernet Branca + Coca-Cola",
      "2 botellas de Absolut + Speed",
      "1 botella de Gin Beefeater + tónicas",
      "2 botellas de Chandon",
      "2 botellas de Santa Julia",
      "2 packs de Corona",
      "10 aguas",
    ],
    // TODO: placeholder price
    price: "$1",
    tables: ["P1", "P2", "P3"],
  },
] as const

// Tables already booked — update by hand when a reservation is confirmed (e.g. ["E1", "P2"])
export const VIP_RESERVED_TABLES: readonly string[] = []

export const GALLERY = [
  { src: "/fridha/fridha_gente.jpg", alt: "Gente disfrutando de FRIDHA", span: "wide" },
  { src: "/fridha/95.jpg", alt: "Edición anterior de FRIDHA", span: "tall" },
  { src: "/fridha/fridha_si.jpg", alt: "Momento de FRIDHA", span: "tall" },
  { src: "/fridha/14.jpg", alt: "Edición anterior de FRIDHA", span: "tall" },
  { src: "/fridha/fridha_leo_moises.jpg", alt: "Edición anterior de FRIDHA", span: "tall" },
  { src: "/fridha/90.jpg", alt: "Edición anterior de FRIDHA", span: "wide" },
  { src: "/fridha/143.jpg", alt: "Edición anterior de FRIDHA", span: "tall" },
  { src: "/fridha/Fridha_portada.jpg", alt: "Edición anterior de FRIDHA", span: "wide" },
  { src: "/fridha/trex.jpg", alt: "Edición anterior de FRIDHA", span: "tall" },
  { src: "/fridha/vaso.jpg", alt: "Edición anterior de FRIDHA", span: "tall" },
] as const

export const TICKETS = [
  {
    name: "Early Bird",
    note: "Para los que no se quedan esperando",
    featured: false,
  },
  {
    name: "General",
    note: "Tu entrada para vivir la noche completa",
    featured: true,
  },
  {
    name: "VIP",
    note: "La experiencia más exclusiva de la noche",
    featured: false,
  },
] as const
