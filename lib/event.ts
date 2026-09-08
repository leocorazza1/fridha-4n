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
  promotersSectionVisible: true,
  chatVisible: false,
  spotifyPlaylistId: "64oGgzEWy5owo8rBNv6Brf",
  socials: {
    instagram: "https://instagram.com/fridha.realico"
  },
  contactEmail: "hola@fridha.com",
}

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
