import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Proiecte | Acoperișuri Expert - Galerie Acoperișuri',
  description: 'Galerie proiecte acoperișuri: țiglă ceramică, tablă fălțuită, țiglă metalică, reparații. Vezi lucrările noastre din toată România.',
  keywords: 'proiecte acoperisuri, galerie acoperisuri, lucrari tigla, montaj acoperisuri',
}

export default function ProiectePage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="pt-32 pb-16 bg-gradient-to-b from-accent/10 to-secondary">
          <div className="container">
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-primary mb-4">
              Proiecte Recente
            </h1>
            <p className="text-xl text-text-muted max-w-2xl">
              Descoperă câteva dintre lucrările noastre recente. Fiecare acoperiș
              este realizat cu profesionalism și materiale premium.
            </p>
          </div>
        </div>
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
