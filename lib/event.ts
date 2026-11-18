export const EVENT = {
  name: "FRIDHA",
  tagline: "Navidad en",
  date: "Jueves 24 de Diciembre",
  // ISO used by the countdown timer
  dateISO: "2026-12-24T23:00:00-03:00",
  time: "1:00 hs — 06:00 hs",
  venue: "Club Sportivo Realicó",
  city: "Realicó, La Pampa",
  ticketsUrl: "https://etickets.com.ar/fridha-navidad-2026/",
  ticketsAvailable: true,
  chatVisible: false,
  spotifyPlaylistId: "64oGgzEWy5owo8rBNv6Brf",
  socials: {
    instagram: "https://instagram.com/fridha.realico"
  },
  contactEmail: "hola@fridha.com",
  // International format, digits only (used in wa.me links)
  whatsappNumber: "5492302590082",
  vipReservationsOpen: false,
}

export const VIP_TIERS = [
  {
    id: "gold",
    name: "FRIDHA GOLD EXPERIENCE",
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
    tables: ["G1", "G2", "G3"],
  },
  {
    id: "platinum",
    name: "FRIDHA PLATINUM EXPERIENCE",
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
    tables: ["P1", "P2", "P3"],
  },
] as const

// Tables already booked — update by hand when a reservation is confirmed (e.g. ["P1", "G2"])
export const VIP_RESERVED_TABLES: readonly string[] = []

export const CUP_SPONSOR = {
  price: "$100.000",
  // International format, digits only (used in wa.me links)
  whatsappNumber: "5492302585429",
  viewerUrl:
    "https://ecovasos.com/qero/personalizacion_online/copo-3d?id_medida=2&toques=99&filename=1795039633271.webp",
  // Laid out as on the cup: 2 columns x 3 rows
  slots: ["1", "2", "3", "4", "5", "6"],
} as const

// Logo slots already sold — update by hand when a sponsor is confirmed (e.g. ["1", "4"])
export const CUP_TAKEN_SLOTS: readonly string[] = []

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
    price: null,
    soldOut: true,
  },
  {
    name: "General",
    note: "Tu entrada para vivir la noche completa",
    featured: true,
    price: "Lote 1 · $15.000",
    soldOut: false,
  },
] as const
