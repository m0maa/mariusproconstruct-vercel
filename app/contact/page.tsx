import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import ContactSection from '@/components/ContactSection'
import ZonesSection from '@/components/ZonesSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact | Acoperișuri Expert - Solicită o Ofertă',
  description: 'Contactează echipa de acoperișuri pentru o ofertă. Servicii în toată România, urgențe non-stop.',
  keywords: 'contact acoperisuri, telefon acoperisuri, oferta acoperis, urgenta acoperis',
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="pt-32 pb-16 bg-gradient-to-b from-accent/10 to-secondary">
          <div className="container">
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-primary mb-4">
              Contactează-ne
            </h1>
            <p className="text-xl text-text-muted max-w-2xl">
              Suntem aici pentru a te ajuta cu proiectul tău de acoperiș.
              Solicită o ofertă sau sună pentru urgențe!
            </p>
          </div>
        </div>
        <ContactSection />
        <ZonesSection />
      </main>
      <Footer />
    </>
  )
}
