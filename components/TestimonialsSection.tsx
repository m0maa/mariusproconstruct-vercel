'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { testimonials, t } from '@/lib/translations'
import { Star } from './Icons'

export default function TestimonialsSection() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section ref={ref} className="py-generous relative overflow-hidden bg-gradient-to-b from-secondary to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 deco-measure-lines opacity-10"></div>

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle">{t.testimonials.subtitle}</p>
          <h2 className="section-title title-align-left">{t.testimonials.title}</h2>
          <p className="text-text-muted max-w-2xl mx-auto mt-4 text-lg">
            {t.testimonials.description}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="testimonial-card"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent" filled />
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-muted text-sm mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-primary text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-text-muted">
                    {testimonial.service}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="mt-4 pt-4 border-t border-border text-xs text-text-muted">
                {testimonial.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
