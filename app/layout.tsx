import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FRIDHA — Fiesta de Navidad',
  description:
    'FRIDHA vuelve esta Navidad. Una noche de lujo, música y luces doradas. Comprá tus entradas para la fiesta del año.',
  generator: 'v0.app',
  openGraph: {
    title: 'FRIDHA — Fiesta de Navidad',
    description:
      'Una noche de lujo, música y luces doradas. Comprá tus entradas para la fiesta del año.',
    images: ['/images/hero.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a1410',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${bebas.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
