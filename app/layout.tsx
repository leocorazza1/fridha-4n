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
  title: 'Navidad FRIDHA 2026',
  description:
    'Una Navidad. Una noche. Una tradición. Desde 2022, FRIDHA es el reencuentro navideño en Realicó, La Pampa. Después de las 12, nos encontramos todos acá.',
  generator: 'v0.app',
  openGraph: {
    title: 'Navidad FRIDHA 2026',
    description:
      'Una Navidad. Una noche. Una tradición. Después de las 12, nos encontramos todos en FRIDHA.',
    images: ['/images/hero.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0708',
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
