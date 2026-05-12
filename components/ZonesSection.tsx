'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { coverageZones, t } from '@/lib/translations'
import { MapPin } from './Icons'

export default function ZonesSection() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section ref={ref} className="py-generous bg-primary relative">
      {/* Background pattern */}
      <div className="absolute inset-0 deco-copper-lines opacity-10"></div>

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle">{t.zones.subtitle}</p>
          <h2 className="section-title text-white">{t.zones.title}</h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-4 text-lg">
            {t.zones.description}
          </p>
        </motion.div>

        {/* Zones Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {coverageZones.map((zone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
              className="px-6 py-3 bg-primary-light border border-white/20 hover:border-accent hover:text-accent transition-all rounded-xl flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-accent" />
              <span className="font-medium text-white">{zone}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-10 text-white/60 max-w-xl mx-auto"
        >
          <p className="text-sm">
            Acoperim toată România. Pentru localitățile din mediul rural, costurile de deplasare se discută separat.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
