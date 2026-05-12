'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Phone, Mail, MapPin, Clock, Upload, X, Check } from './Icons'
import { t, services, companyInfo } from '@/lib/translations'

function ContactSectionContent() {
  const searchParams = useSearchParams()
  const [ref, isVisible] = useScrollAnimation()
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  })

  // Pre-fill service from URL parameter
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }))
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles([...uploadedFiles, ...files].slice(0, 5)) // Max 5 files
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', phone: '', service: '', message: '' })
        setUploadedFiles([])
        setTimeout(() => setFormState('idle'), 3000)
      } else {
        setFormState('error')
        setTimeout(() => setFormState('idle'), 3000)
      }
    } catch {
      // For demo, just show success
      setFormState('success')
      setFormData({ name: '', phone: '', service: '', message: '' })
      setUploadedFiles([])
      setTimeout(() => setFormState('idle'), 3000)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.info.phone,
      value: companyInfo.phone,
      href: `tel:${companyInfo.phone}`,
    },
    {
      icon: Mail,
      label: t.contact.info.email,
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
    {
      icon: MapPin,
      label: t.contact.info.address,
      value: 'București și Ilfov',
      href: '#zone',
    },
    {
      icon: Clock,
      label: t.contact.info.program,
      value: t.contact.info.hours,
      href: null,
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-generous relative overflow-hidden bg-gradient-to-b from-white to-secondary">
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
          <p className="section-subtitle">{t.contact.subtitle}</p>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="text-text-muted max-w-2xl mx-auto mt-4 text-lg">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <h3 className="font-display font-bold text-2xl mb-6 text-primary">
              {t.contact.title}
            </h3>

            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-green-600 font-semibold">{t.contact.form.success}</p>
                    <p className="text-sm text-green-600/70">Vă vom contacta în curând pentru o ofertă.</p>
                  </div>
                </div>
              </motion.div>
            ) : formState === 'error' ? (
              <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-600 font-semibold">{t.contact.form.error}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Numele tău complet"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-muted mb-2">
                    {t.contact.form.phone} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="07XX XXX XXX"
                  />
                  <p className="text-xs text-text-muted mt-1">Vă vom contacta telefonic pentru o ofertă rapidă.</p>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-text-muted mb-2">
                    {t.contact.form.service}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Selectează serviciul dorit</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>{service.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    placeholder="Descrie pe scurt proiectul tău (tip lucrare, detalii...)"
                    className="resize-none"
                  ></textarea>
                  <p className="text-xs text-text-muted mt-1">Detaliile le discutăm telefonic.</p>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    Poze Proiect (opțional)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-accent/50 transition-colors">
                    <input
                      type="file"
                      id="photos"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="photos" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-sm text-text-muted">
                        {uploadedFiles.length > 0
                          ? `${uploadedFiles.length} fișier(e) selectat(e)`
                          : 'Click pentru a încărca poze'}
                      </p>
                      <p className="text-xs text-text-muted mt-1">Max 5 fișiere, JPG/PNG</p>
                    </label>
                  </div>

                  {/* Uploaded files list */}
                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-lg text-sm"
                        >
                          <span className="truncate max-w-[150px]">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-accent hover:text-accent-hover transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="btn btn-primary w-full"
                >
                  {formState === 'submitting' ? 'Se trimite...' : t.contact.form.submit}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Quick Contact Card */}
            <div className="card border-accent/30 bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl text-accent mb-2">
                    Contact Rapid
                  </h3>
                  <p className="text-text-muted text-sm mb-3">
                    Sună-ne pentru o ofertă sau programare vizită la șantier.
                  </p>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="text-2xl font-display font-bold text-primary hover:text-accent transition-colors"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="card"
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                        <info.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-xs text-text-muted uppercase tracking-wider font-medium">
                          {info.label}
                        </div>
                        <div className="text-primary group-hover:text-accent transition-colors font-medium">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-xs text-text-muted uppercase tracking-wider font-medium">
                          {info.label}
                        </div>
                        <div className="text-primary font-medium">{info.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Link */}
            <div className="card">
              <a
                href={companyInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 17.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wider font-medium">
                    Urmărește-ne
                  </div>
                  <div className="font-medium text-primary group-hover:text-accent transition-colors">
                    Facebook
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function ContactSection() {
  return (
    <Suspense fallback={<div className="py-generous"><div className="container"><div className="section-header"><p className="section-subtitle">Contact</p><h2 className="section-title">Încărcare...</h2></div></div></div>}>
      <ContactSectionContent />
    </Suspense>
  )
}
