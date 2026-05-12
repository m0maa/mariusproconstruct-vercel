'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook } from './Icons'
import { t, companyInfo, services } from '@/lib/translations'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const contactInfo = [
    {
      icon: Phone,
      label: 'Telefon',
      value: companyInfo.phone,
      href: `tel:${companyInfo.phone}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
    {
      icon: MapPin,
      label: 'Zonă Acoperită',
      value: 'București și Ilfov',
      href: '#zone',
    },
  ]

  const quickLinks = [
    { href: '#servicii', label: 'Servicii' },
    { href: '#proiecte', label: 'Proiecte' },
    { href: '#despre', label: 'Despre Noi' },
    { href: '#zone', label: 'Zone Acoperite' },
    { href: '#contact', label: 'Contact' },
  ]

  // Use first 6 services for footer
  const constructionServices = services.slice(0, 6)

  return (
    <footer className="footer-main">
      {/* Main Footer */}
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-xl block text-secondary">
                  Marius <span className="text-accent">ProConstruct</span>
                </span>
                <span className="text-xs text-text-light tracking-widest uppercase font-semibold">
                  Ilfov
                </span>
              </div>
            </div>
            <p className="text-text-light leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href={companyInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-accent/30 bg-[#152238] hover:border-accent hover:bg-accent transition-all group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-accent group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-secondary">
              {t.footer.services}
            </h3>
            <ul className="space-y-3">
              {constructionServices.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#servicii`}
                    className="text-text-light hover:text-accent transition-colors text-sm"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-secondary">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-light hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-secondary">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <a
                    href={info.href}
                    className="flex items-start gap-3 text-text-light hover:text-accent transition-colors"
                  >
                    <info.icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                    <div>
                      <div className="text-xs text-text-light uppercase tracking-wider font-medium">
                        {info.label}
                      </div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - MANDATORY FELISTAR BRANDING */}
      <div className="footer-bottom">
        <div className="container">
          <p className="text-text-light text-sm">
            © {currentYear} {companyInfo.name}. {t.footer.copyright}
          </p>
          <p className="text-text-light text-sm mt-2">
            {t.footer.felicitar} <span className="felistar-branding">Felistar</span> ©
          </p>
        </div>
      </div>
    </footer>
  )
}
