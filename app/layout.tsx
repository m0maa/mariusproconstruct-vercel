import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const outfit = Outfit({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Marius ProConstruct | Constructor în București și Ilfov | 0727 400 613',
  description: 'Constructor profesionist cu 20 ani experiență în București și Ilfov. Construim case la cheie, finisaje premium: montaj gresie faianță, rigips, parchet. Telefon: 0727 400 613.',
  keywords: 'constructor Bucuresti, constructor Ilfov, constructii case la cheie, finisaje, montaj gresie, montaj faianță, rigips, parchet, renovari, tencuiala, 0727 400 613',
  openGraph: {
    title: 'Marius ProConstruct | Constructor în București și Ilfov | 0727 400 613',
    description: 'Constructor profesionist cu 20 ani experiență. Servicii complete de construcții și finisaje în București și Ilfov. Sună acum: 0727 400 613',
    type: 'website',
    locale: 'ro_RO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* LocalBusiness Schema for Construction Contractor */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Marius ProConstruct Ilfov",
              "description": "Constructor profesionist cu 20 ani experiență. Construcții case la cheie, finisaje premium în București și Ilfov.",
              "telephone": "+40-727-400-613",
              "email": "banmarius18@gmail.com",
              "areaServed": ["București", "Ilfov"],
              "priceRange": "€€",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "07:00",
                "closes": "19:00"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg"
        >
          Sari la conținut
        </a>
        <main id="main-content">
          {children}
        </main>

        {/* Floating phone button - mobile only */}
        <a
          href="tel:+40727400613"
          className="lg:hidden fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-accent to-accent-hover text-white shadow-lg flex items-center justify-center animate-float rounded-full"
          aria-label="Sună acum: 0727 400 613"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
          </svg>
        </a>

        {/* WhatsApp floating button - all devices with pulse */}
        <a
          href="https://wa.me/40727400613?text=Salut!%20Aș%20dori%20o%20ofertă%20pentru%20un%20proiect%20de%20construcție."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-green-500 text-white shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors rounded-full animate-pulse-slow"
          aria-label="Contactează-ne pe WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52.075-.149.669-1.612.912-2.207.242-.599.486-.494.643-.494.198 0 .399-.01.644-.01.223 0 .55.149.92.946.572 1.256 1.124 2.623 1.124 2.623s3.098 4.736 4.47 5.787c.197.149.371.223.644.223.273 0 .874-.348.997-.644.149-.297.149-.546.1-.644-.05-.099-.446-.722-.644-.967zM12.025 22c-5.523 0-10-4.477-10-10S6.502 2 12.025 2 22 6.477 22 12s-4.477 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"/>
          </svg>
        </a>
      </body>
    </html>
  )
}
