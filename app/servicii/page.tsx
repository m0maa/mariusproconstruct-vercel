import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Servicii | Acoperișuri Expert - Acoperișuri care durează generații',
  description: 'Servicii profesionale de acoperișuri: montaj țiglă ceramică și metalică, tablă fălțuită, hidroizolații, reparații. Garanție extinsă.',
  keywords: 'servicii acoperisuri, montaj tigla, tabla faltuita, hidroizolatii, reparatii acoperis, acoperisuri Romania',
}

export default function ServiciiPage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="pt-32 pb-16 bg-gradient-to-b from-accent/10 to-secondary">
          <div className="container">
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-primary mb-4">
              Serviciile Noastre
            </h1>
            <p className="text-xl text-text-muted max-w-2xl">
              Oferim o gamă completă de servicii de acoperișuri pentru case și clădiri.
              Materiale premium, garanție extinsă, mesteri calificați.
            </p>
          </div>
        </div>
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
