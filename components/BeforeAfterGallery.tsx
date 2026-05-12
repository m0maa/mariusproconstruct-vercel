'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Calendar, MapPin } from './Icons'

interface BeforeAfterProject {
  id: string
  title: string
  category: string
  beforeImage: string
  afterImage: string
  description: string
  location?: string
  date: string
}

interface BeforeAfterGalleryProps {
  projects?: BeforeAfterProject[]
  categories?: { id: string; name: string }[]
}

// Before/After projects - using client photos
const beforeAfterProjects: BeforeAfterProject[] = [
  {
    id: '1',
    title: 'Renovare Completă - Apartament 3 Camere',
    category: 'finisaje-interioare',
    beforeImage: '/projects/WhatsApp Image 2026-05-11 at 19.02.27 (4).jpeg',
    afterImage: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (7).jpeg',
    description: 'Renovare completă apartament: rigips, gletuit, vopsire, parchet, gresie și faianță.',
    location: 'București, Sectorul 1',
    date: 'Noiembrie 2023',
  },
  {
    id: '2',
    title: 'Montaj Gresie și Faianță - Baie Premium',
    category: 'gresie-faianza',
    beforeImage: '/projects/WhatsApp Image 2026-05-11 at 19.02.26 (4).jpeg',
    afterImage: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (8).jpeg',
    description: 'Montaj gresie porțelanată și faianță decorativă în baie. Finisaje de calitate.',
    location: 'Voluntari, Ilfov',
    date: 'Martie 2024',
  },
  {
    id: '3',
    title: 'Rigips și Gletuit - Pereți Noi',
    category: 'rigips-gletuit',
    beforeImage: '/projects/WhatsApp Image 2026-05-11 at 19.02.26 (3).jpeg',
    afterImage: '/projects/WhatsApp Image 2026-05-11 at 19.02.29.jpeg',
    description: 'Sistem complet rigips cu gletuire și finisaje pentru vopsire. Pereți perfecți.',
    location: 'Pantelimon, Ilfov',
    date: 'Februarie 2024',
  },
  {
    id: '4',
    title: 'Parchet Stratificat - Living Spațios',
    category: 'parchet',
    beforeImage: '/projects/WhatsApp Image 2026-05-11 at 19.02.27 (5).jpeg',
    afterImage: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (2).jpeg',
    description: 'Montaj parchet stratificat stejar, finisaj premium cu plinți asortate.',
    location: 'Buftea, Ilfov',
    date: 'Ianuarie 2024',
  },
]

const categories = [
  { id: 'all', name: 'Toate' },
  { id: 'finisaje-interioare', name: 'Finisaje Interioare' },
  { id: 'gresie-faianza', name: 'Gresie și Faianță' },
  { id: 'rigips-gletuit', name: 'Rigips și Gletuit' },
  { id: 'parchet', name: 'Parchet' },
]

// Before/After Card Component with Slider
function BeforeAfterCard({
  beforeImage,
  afterImage,
  title,
  description,
  location,
  date,
}: BeforeAfterProject) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [showBefore, setShowBefore] = useState(false)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const position = ((x - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  // Keyboard support for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        setSliderPosition(Math.max(0, sliderPosition - 5))
        e.preventDefault()
        break
      case 'ArrowRight':
        setSliderPosition(Math.min(100, sliderPosition + 5))
        e.preventDefault()
        break
      case 'Home':
        setSliderPosition(0)
        e.preventDefault()
        break
      case 'End':
        setSliderPosition(100)
        e.preventDefault()
        break
    }
  }

  const toggleView = () => {
    setShowBefore(!showBefore)
    setSliderPosition(showBefore ? 100 : 0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card overflow-hidden"
    >
      {/* Before/After Image Container */}
      <div
        className="relative aspect-[4/3] overflow-hidden select-none cursor-ew-resize focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 rounded-t-lg"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleMove}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Comparare înainte și după. Folosește săgețile stânga/dreapta pentru a ajusta."
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={sliderPosition < 50 ? 'În principal înainte' : sliderPosition > 50 ? 'În principal după' : 'Jumătate înainte, jumătate după'}
      >
        {/* Before Image (Background) */}
        <div className="absolute inset-0 bg-gray-100">
          <Image
            src={beforeImage}
            alt="Înainte - lucrarea în starea inițială"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 text-white text-xs font-bold rounded-lg">
            ÎNAINTE
          </div>
        </div>

        {/* After Image (Foreground, clipped) */}
        <div
          className="absolute inset-0 bg-gray-100 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          aria-hidden="true"
        >
          <Image
            src={afterImage}
            alt="După - lucrarea finisată"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-3 right-3 px-3 py-1 bg-accent text-white text-xs font-bold rounded-lg">
            DUPĂ
          </div>
        </div>

        {/* Slider Handle - Increased touch target to 44px */}
        <div
          className="absolute top-0 bottom-0 left-0 right-0 w-full max-w-[44px] mx-auto cursor-ew-resize z-10 flex items-center justify-center group"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-1 h-full bg-white/80 group-hover:bg-white transition-colors"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-accent/20">
            <div className="flex gap-0.5">
              <ArrowLeft className="w-4 h-4 text-gray-600" />
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Keyboard Toggle Buttons */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
          <button
            type="button"
            onClick={toggleView}
            className="px-4 py-2 bg-white/90 text-primary text-xs font-semibold rounded-lg shadow-lg hover:bg-white transition-colors"
            aria-label="Arată imaginea completă înainte"
          >
            Înainte
          </button>
          <button
            type="button"
            onClick={toggleView}
            className="px-4 py-2 bg-accent text-white text-xs font-semibold rounded-lg shadow-lg hover:bg-accent-hover transition-colors"
            aria-label="Arată imaginea completă după"
          >
            După
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg mb-2 text-primary">{title}</h3>
        <p className="text-text-muted text-sm mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-text-muted">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function BeforeAfterGallery({
  projects = beforeAfterProjects,
  categories: customCategories,
}: BeforeAfterGalleryProps) {
  const [ref, isVisible] = useScrollAnimation()
  const categoryList = customCategories || categories
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="inainte-dupa" ref={ref} className="py-generous bg-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle">Transformări</p>
          <h2 className="section-title">Înainte și După</h2>
          <p className="text-text-muted max-w-2xl mx-auto mt-4 text-lg">
            Vezi diferența pe care o putem face. Trage glide-ul pentru comparație între starea inițială și finisajul final.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categoryList.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              aria-label={`Filtrează proiectele: ${category.name}`}
              aria-pressed={activeCategory === category.id}
              className={`px-5 py-2.5 font-medium transition-all text-sm rounded-lg ${
                activeCategory === category.id
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-gray-100 text-text-muted hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <BeforeAfterCard key={project.id} {...project} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="btn btn-primary inline-flex"
          >
            Dorești un Proiect Similar?
          </a>
        </motion.div>
      </div>
    </section>
  )
}
