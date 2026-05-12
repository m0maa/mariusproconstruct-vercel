'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, ChevronRight } from './Icons'
import { t, companyInfo } from '@/lib/translations'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#servicii', label: 'Servicii' },
    { href: '#proiecte', label: 'Proiecte' },
    { href: '#despre', label: 'Despre' },
    { href: '#zone', label: 'Zone' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`nav-fixed ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-lg block text-secondary group-hover:text-accent transition-colors">
                  Marius <span className="text-accent">ProConstruct</span>
                </span>
                <span className="text-xs text-text-light tracking-widest uppercase font-medium block">Ilfov</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-secondary/80 hover:text-accent transition-colors font-medium text-sm group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{companyInfo.phone}</span>
              </a>
              <a
                href="#contact"
                className="btn btn-primary text-sm py-2 px-4"
              >
                {t.nav.getQuote}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-secondary hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-primary/98 backdrop-blur-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
            <div className="mb-8 text-center">
              <span className="font-display font-bold text-2xl block text-secondary">
                Marius <span className="text-accent">ProConstruct</span>
              </span>
              <span className="text-sm text-text-light tracking-widest uppercase">Ilfov</span>
            </div>
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-display font-bold text-secondary hover:text-accent transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-3 text-accent text-xl font-semibold mt-4"
            >
              <Phone className="w-6 h-6" />
              {companyInfo.phone}
            </a>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-secondary hover:text-accent"
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>
      )}
    </>
  )
}
