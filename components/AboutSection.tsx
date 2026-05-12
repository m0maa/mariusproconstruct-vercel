'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { t, companyInfo } from '@/lib/translations'
import { CheckCircle, Award, Shield, Users, Clock } from './Icons'

export default function AboutSection() {
  const [ref, isVisible] = useScrollAnimation()

  const values = t.about.values.items

  return (
    <section id="despre" ref={ref} className="py-generous section-gradient-navy relative">
      {/* Measurement pattern overlay */}
      <div className="absolute inset-0 deco-measure-lines opacity-20"></div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Visual with Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-white/5 backdrop-blur-sm rounded-lg border border-accent/20 p-8 deco-corner-brackets">
              <div className="h-full flex flex-col items-center justify-center text-center">
                {/* Large Stat */}
                <div className="mb-8">
                  <div className="font-display font-bold text-7xl sm:text-8xl text-accent">
                    {companyInfo.years}+
                  </div>
                  <p className="text-white/80 text-lg mt-2">Ani de Experiență</p>
                </div>

                {/* Sub Stats */}
                <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="font-display font-bold text-3xl text-accent">{companyInfo.teamSize}</div>
                    <p className="text-white/70 text-sm mt-1">Membri Echipă</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="font-display font-bold text-3xl text-accent">100%</div>
                    <p className="text-white/70 text-sm mt-1">Satisfacție</p>
                  </div>
                </div>

                {/* Team Badge */}
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-accent font-semibold text-sm">Echipă Stabilă</span>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-accent text-white px-6 py-3 rounded shadow-lg"
            >
              <span className="font-bold">Fără alcool la muncă</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <p className="section-subtitle">{t.about.subtitle}</p>
              <h2 className="section-title text-white">{t.about.title}</h2>
              <p className="text-white/80 mt-6 text-lg leading-relaxed">
                {t.about.description}
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-white mb-4">
                {t.about.story}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {t.about.storyText}
              </p>
            </div>

            {/* Values Grid */}
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-4">
                {t.about.values.title}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value, index) => {
                  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
                    Experiență: Award,
                    'Echipă Stabilă': Users,
                    'Fără Alcool': Shield,
                    'Finisaje Premium': CheckCircle,
                    'Prețuri Corecte': Clock,
                    Punctualitate: CheckCircle,
                  }
                  const Icon = icons[value.title] || CheckCircle

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-accent/50 transition-colors"
                    >
                      <Icon className="w-6 h-6 text-accent mb-2" />
                      <h5 className="font-semibold text-white text-sm">{value.title}</h5>
                      <p className="text-white/70 text-xs mt-1">{value.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
