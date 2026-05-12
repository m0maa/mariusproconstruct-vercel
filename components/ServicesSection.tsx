'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { services, t } from '@/lib/translations'

// Icon components for construction services
const Icons = {
  Home: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  Squares: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
    </svg>
  ),
  Layers: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Grid3x3: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Paintbrush: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  Building: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  BrickWall: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h16M4 9h16M4 13h16M4 17h16M4 21h16M8 5v4M12 5v4M16 5v4M20 9v4M8 13v4M12 13v4M16 13v4M8 17v4M12 17v4M16 17v4" />
    </svg>
  ),
  Wall: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Minus: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: Icons.Home,
  Squares: Icons.Squares,
  Layers: Icons.Layers,
  Grid3x3: Icons.Grid3x3,
  Paintbrush: Icons.Paintbrush,
  Building: Icons.Building,
  BrickWall: Icons.BrickWall,
  Wall: Icons.Wall,
  Minus: Icons.Minus,
  Sparkles: Icons.Sparkles,
}

export default function ServicesSection() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="servicii" ref={ref} className="py-generous relative section-gradient-light">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header"
        >
          <p className="section-subtitle">{t.services.subtitle}</p>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="text-text-muted max-w-2xl mx-auto mt-4 text-lg">
            {t.services.description}
          </p>
        </motion.div>

        {/* Services Grid - Staggered */}
        <div className="grid-services">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Icons.Home

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="card group"
              >
                {/* Icon */}
                <div className="service-icon">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl mb-3 text-primary group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                <p className="text-text-muted text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Price with Unit Label */}
                {service.priceFrom && service.priceFrom !== 'La cerere' && (
                  <div className="flex items-center flex-wrap gap-1.5 mb-3">
                    <span className="text-text-muted text-sm">{t.services.priceFrom}</span>
                    <span className="text-accent font-bold text-lg">{service.priceFrom}</span>
                    <span className="text-accent-dark text-xs font-medium">
                      ({service.priceType === 'mp' ? 'metru pătrat' : service.priceType === 'ml' ? 'metru liniar' : service.priceType === 'proiect' ? 'proiect' : 'lucrare'})
                    </span>
                  </div>
                )}

                {service.priceFrom === 'La cerere' && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-lg mb-3">
                    <span className="text-accent font-semibold text-sm">Preț la cerere</span>
                  </div>
                )}

                {/* Service-specific CTA */}
                <a
                  href={`#contact?service=${service.id}`}
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium text-sm transition-colors group/cta"
                >
                  <span>Cere o ofertă pentru {service.title.toLowerCase()}</span>
                  <svg className="w-4 h-4 transform group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="btn btn-primary inline-flex"
          >
            {t.services.requestService || 'Solicită o Ofertă'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
