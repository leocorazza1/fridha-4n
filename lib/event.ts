export const EVENT = {
  name: "FRIDHA",
  tagline: "Navidad Edition",
  date: "Sábado 20 de Diciembre, 2025",
  // ISO used by the countdown timer
  dateISO: "2025-12-20T23:00:00-03:00",
  time: "23:00 hs — 06:00 hs",
  venue: "Club Aurora",
  city: "Palermo, Buenos Aires",
  ticketsUrl: "https://entradas.fridha.com",
  spotifyPlaylistId: "37i9dQZF1DX0Yxoavh5qJV",
  socials: {
    instagram: "https://instagram.com/fridha",
    tiktok: "https://tiktok.com/@fridha",
  },
  contactEmail: "hola@fridha.com",
}

export const GALLERY = [
  { src: "/images/gallery-1.png", alt: "Brindis con champagne en la fiesta", span: "tall" },
  { src: "/images/gallery-2.png", alt: "DJ en cabina bajo luces doradas", span: "wide" },
  { src: "/images/gallery-3.png", alt: "Gente bailando entre confeti dorado", span: "normal" },
  { src: "/images/gallery-4.png", alt: "Cócteles con chispas en la barra", span: "tall" },
  { src: "/images/gallery-5.png", alt: "Invitada riendo bajo luces navideñas", span: "normal" },
  { src: "/images/gallery-6.png", alt: "Pista de baile llena vista desde arriba", span: "wide" },
] as const

export const TICKETS = [
  {
    name: "Early Bird",
    price: "$18.000",
    note: "Cupos limitados",
    perks: ["Acceso general", "Primera tanda", "Guardarropa incluido"],
    featured: false,
  },
  {
    name: "General",
    price: "$25.000",
    note: "La entrada clásica",
    perks: ["Acceso general", "Barra completa", "Welcome drink"],
    featured: true,
  },
  {
    name: "VIP",
    price: "$45.000",
    note: "Experiencia premium",
    perks: ["Zona VIP exclusiva", "Mesa reservada", "Botella + servicio", "Acceso prioritario"],
    featured: false,
  },
] as const
