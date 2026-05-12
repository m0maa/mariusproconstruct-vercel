'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Phone, ArrowRight, CheckCircle, Shield, Award, Users } from './Icons'
import { t, companyInfo, heroStats } from '@/lib/translations'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/projects/WhatsApp Image 2026-05-11 at 19.02.28 (7).jpeg"
          alt="Marius ProConstruct - Șantier construcții"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
      </div>

      {/* Construction Measurement Pattern */}
      <div className="absolute inset-0 deco-measure-lines opacity-30"></div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -60 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 border border-accent/30"
            >
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight text-white"
            >
              Construim Casa Ta în {companyInfo.location}
              <span className="block text-accent mt-3">{companyInfo.years} de Ani Experiență</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-white/80 max-w-xl leading-relaxed"
            >
              {companyInfo.name} — Constructor profesionist cu {companyInfo.years} ani experiență.
              Echipă stabilă de {companyInfo.teamSize} profesioniști serioși. Finisaje premium. Fără alcool la muncă.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-5 h-5 text-accent" />
                <span className="font-medium">Finisaje Premium</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-5 h-5 text-accent" />
                <span className="font-medium">Echipă Stabilă</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="font-medium">Seriozitate Garantată</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href={`tel:${companyInfo.phone}`}
                className="btn btn-primary text-lg px-10 py-5"
              >
                <Phone className="w-6 h-6" />
                {t.hero.cta}
              </a>
              <a
                href="#proiecte"
                className="btn bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-primary text-base px-6 py-4"
              >
                {t.hero.viewProjects}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-12 pt-8 border-t border-white/20"
            >
              {heroStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="font-display font-bold text-3xl sm:text-4xl text-accent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 60 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <div className="relative bg-white/95 backdrop-blur-sm p-8 border border-accent/20 deco-corner-brackets">
              <div className="relative text-center">
                {/* Building Icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>

                <h3 className="font-display font-bold text-2xl text-primary mb-3">
                  Vrei o Ofertă Gratuită?
                </h3>
                <p className="text-text-muted mb-6 max-w-xs mx-auto">
                  Construim casa ta de la 0 la cheie. Sună acum pentru o ofertă în 15 minute.
                </p>

                {/* Contact Info */}
                <div className="bg-primary rounded p-5 mb-4">
                  <p className="text-white/70 text-sm mb-2">Sună Acum — Rapid și Gratuit</p>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="block text-accent font-display font-bold text-2xl hover:text-accent-hover transition-colors"
                  >
                    {companyInfo.phone}
                  </a>
                </div>

                <div className="space-y-2 text-left text-sm">
                  <div className="flex items-center gap-2 text-text">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>20 ani experiență</span>
                  </div>
                  <div className="flex items-center gap-2 text-text">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Echipă de 7 profesioniști</span>
                  </div>
                  <div className="flex items-center gap-2 text-text">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Finisaje premium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card - Experience */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-accent/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-bold text-primary text-sm">Experiență</div>
                  <div className="text-xs text-text-muted">20+ ani în domeniu</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card - Team */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-accent/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-bold text-primary text-sm">Echipă Completă</div>
                  <div className="text-xs text-text-muted">7 profesioniști</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ArrowRight className="w-5 h-5 text-accent rotate-90" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
