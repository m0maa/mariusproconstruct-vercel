'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { t } from '@/lib/translations'
import Image from 'next/image'
import { useState, useRef } from 'react'

// All media files from client - unlabeled gallery
const allMedia = [
  { id: '1', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.25 (1).jpeg', type: 'image' },
  { id: '2', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.25 (2).jpeg', type: 'image' },
  { id: '3', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.25 (3).jpeg', type: 'image' },
  { id: '4', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.25 (4).jpeg', type: 'image' },
  { id: '5', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.25 (5).jpeg', type: 'image' },
  { id: '6', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.25 (6).jpeg', type: 'image' },
  { id: '7', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.25.jpeg', type: 'image' },
  { id: '8', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.26 (1).jpeg', type: 'image' },
  { id: '9', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.26 (2).jpeg', type: 'image' },
  { id: '10', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.26 (3).jpeg', type: 'image' },
  { id: '11', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.26 (4).jpeg', type: 'image' },
  { id: '12', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.26.jpeg', type: 'image' },
  { id: '13', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.27 (1).jpeg', type: 'image' },
  { id: '14', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.27 (2).jpeg', type: 'image' },
  { id: '15', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.27 (3).jpeg', type: 'image' },
  { id: '16', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.27 (4).jpeg', type: 'image' },
  { id: '17', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.27 (5).jpeg', type: 'image' },
  { id: '18', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.27 (6).jpeg', type: 'image' },
  { id: '19', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.27 (7).jpeg', type: 'image' },
  { id: '20', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.27.jpeg', type: 'image' },
  { id: '21', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (1).jpeg', type: 'image' },
  { id: '22', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (2).jpeg', type: 'image' },
  { id: '23', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (3).jpeg', type: 'image' },
  { id: '24', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (4).jpeg', type: 'image' },
  { id: '25', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (5).jpeg', type: 'image' },
  { id: '26', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (6).jpeg', type: 'image' },
  { id: '27', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (7).jpeg', type: 'image' },
  { id: '28', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (8).jpeg', type: 'image' },
  { id: '29', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28 (9).jpeg', type: 'image' },
  { id: '30', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.28.jpeg', type: 'image' },
  { id: '31', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.29 (1).jpeg', type: 'image' },
  { id: '32', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.29 (2).jpeg', type: 'image' },
  { id: '33', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.29 (3).jpeg', type: 'image' },
  { id: '34', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.29 (4).jpeg', type: 'image' },
  { id: '35', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.29 (5).jpeg', type: 'image' },
  { id: '36', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.29 (6).jpeg', type: 'image' },
  { id: '37', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.29 (7).jpeg', type: 'image' },
  { id: '38', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.29.jpeg', type: 'image' },
  { id: '39', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.30 (1).jpeg', type: 'image' },
  { id: '40', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.30 (2).jpeg', type: 'image' },
  { id: '41', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.30 (3).jpeg', type: 'image' },
  { id: '42', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.30 (4).jpeg', type: 'image' },
  { id: '43', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.30 (5).jpeg', type: 'image' },
  { id: '44', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.30 (6).jpeg', type: 'image' },
  { id: '45', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.30.jpeg', type: 'image' },
  { id: '46', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.31 (1).jpeg', type: 'image' },
  { id: '47', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.31 (2).jpeg', type: 'image' },
  { id: '48', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.31 (3).jpeg', type: 'image' },
  { id: '49', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.31 (4).jpeg', type: 'image' },
  { id: '50', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.31 (5).jpeg', type: 'image' },
  { id: '51', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.31 (6).jpeg', type: 'image' },
  { id: '52', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.31 (7).jpeg', type: 'image' },
  { id: '53', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.31 (8).jpeg', type: 'image' },
  { id: '54', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.31.jpeg', type: 'image' },
  { id: '55', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.32 (1).jpeg', type: 'image' },
  { id: '56', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.32 (2).jpeg', type: 'image' },
  { id: '57', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.32 (3).jpeg', type: 'image' },
  { id: '58', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.32 (4).jpeg', type: 'image' },
  { id: '59', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.32 (5).jpeg', type: 'image' },
  { id: '60', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.32 (6).jpeg', type: 'image' },
  { id: '61', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.32 (7).jpeg', type: 'image' },
  { id: '62', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.32.jpeg', type: 'image' },
  { id: '63', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.33 (1).jpeg', type: 'image' },
  { id: '64', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.33 (2).jpeg', type: 'image' },
  { id: '65', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.33 (3).jpeg', type: 'image' },
  { id: '66', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.33 (4).jpeg', type: 'image' },
  { id: '67', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.33 (5).jpeg', type: 'image' },
  { id: '68', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.33 (6).jpeg', type: 'image' },
  { id: '69', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.33 (7).jpeg', type: 'image' },
  { id: '70', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.33 (8).jpeg', type: 'image' },
  { id: '71', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.33.jpeg', type: 'image' },
  { id: '72', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.34 (1).jpeg', type: 'image' },
  { id: '73', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.34 (2).jpeg', type: 'image' },
  { id: '74', src: '/projects/WhatsApp Image 2026-05-11 at 19.02.34.jpeg', type: 'image' },
  { id: '75', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.25 (1).mp4', type: 'video' },
  { id: '76', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.25.mp4', type: 'video' },
  { id: '77', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.26 (1).mp4', type: 'video' },
  { id: '78', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.26 (2).mp4', type: 'video' },
  { id: '79', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.26 (3).mp4', type: 'video' },
  { id: '80', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.26 (4).mp4', type: 'video' },
  { id: '81', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.26.mp4', type: 'video' },
  { id: '82', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.27 (1).mp4', type: 'video' },
  { id: '83', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.27.mp4', type: 'video' },
  { id: '84', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.30 (1).mp4', type: 'video' },
  { id: '85', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.30 (2).mp4', type: 'video' },
  { id: '86', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.30 (3).mp4', type: 'video' },
  { id: '87', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.30 (4).mp4', type: 'video' },
  { id: '88', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.30 (5).mp4', type: 'video' },
  { id: '89', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.30.mp4', type: 'video' },
  { id: '90', src: '/projects/WhatsApp Video 2026-05-11 at 19.02.32.mp4', type: 'video' },
]

export default function ProjectsSection() {
  const [ref, isVisible] = useScrollAnimation()
  const [selectedMedia, setSelectedMedia] = useState<typeof allMedia[0] | null>(null)

  return (
    <>
      <section id="proiecte" ref={ref} className="py-generous bg-white">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <p className="section-subtitle">{t.projects.subtitle}</p>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="text-text-muted max-w-2xl mx-auto mt-4 text-lg">
              {t.projects.description}
            </p>
          </motion.div>

          {/* Media Grid - No labels, no filters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {allMedia.map((media, index) => (
              <motion.div
                key={media.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.5) }}
                onClick={() => setSelectedMedia(media)}
                className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
              >
                {media.type === 'image' ? (
                  <Image
                    src={media.src}
                    alt="Proiect"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 20vw, 16vw"
                  />
                ) : (
                  <video
                    src={media.src}
                    className="w-full h-full object-cover"
                    muted
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  />
                )}
                {/* Video indicator */}
                {media.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
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
              className="btn btn-primary"
            >
              Dorești un Proiect Similar?
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10"
            aria-label="Închide"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'image' ? (
              <Image
                src={selectedMedia.src}
                alt="Proiect"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain rounded-lg"
              />
            ) : (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                className="w-full max-h-[90vh] rounded-lg"
              />
            )}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = allMedia.findIndex(m => m.id === selectedMedia.id)
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : allMedia.length - 1
              setSelectedMedia(allMedia[prevIndex])
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
            aria-label="Anterior"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = allMedia.findIndex(m => m.id === selectedMedia.id)
              const nextIndex = currentIndex < allMedia.length - 1 ? currentIndex + 1 : 0
              setSelectedMedia(allMedia[nextIndex])
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
            aria-label="Următorul"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
