import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Despre | Acoperișuri Expert - Mesteri Acoperișari',
  description: 'Echipă de mesteri acoperișari cu 15+ ani de experiență. Servicii profesionale de acoperișuri în toată România.',
  keywords: 'despre acoperisuri, mesteri acoperisari, echipa acoperisuri expert',
}

export default function DesprePage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="pt-32 pb-16 bg-gradient-to-b from-accent/10 to-secondary">
          <div className="container">
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-primary mb-4">
              Despre Noi
            </h1>
            <p className="text-xl text-text-muted max-w-2xl">
              O echipă de profesioniști dedicați, cu o experiență de peste 15 ani în domeniul
              acoperișurilor. Lucrări care durează generații.
            </p>
          </div>
        </div>
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
