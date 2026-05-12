'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Save, X, Phone, Mail, Calendar, Package, Lock, LogOut, Settings } from 'lucide-react'

interface Message {
  id: string
  name: string
  phone: string
  service: string
  message: string
  status: 'new' | 'read' | 'archived'
  createdAt: string
  notes?: string
}

type StatusFilter = 'all' | 'new' | 'read' | 'archived'

const statusLabels: Record<StatusFilter, string> = {
  all: 'Toate',
  new: 'Noi',
  read: 'Citite',
  archived: 'Arhivate',
}

const statusColors: Record<string, string> = {
  new: 'bg-accent/20 text-accent border-accent/30',
  read: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState('')
  const [editedStatus, setEditedStatus] = useState<Message['status']>('new')

  // Initialize default password in localStorage if not set
  useEffect(() => {
    const savedPassword = localStorage.getItem('adminPassword')
    if (!savedPassword) {
      localStorage.setItem('adminPassword', 'Admin123')
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const savedPassword = localStorage.getItem('adminPassword') || 'Admin123'
    if (password === savedPassword) {
      setIsAuthenticated(true)
      setShowLogin(false)
      setLoginError('')
      fetchMessages()
    } else {
      setLoginError('Parolă incorectă')
    }
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (newPassword.length < 6) {
      setPasswordError('Parola trebuie să aibă cel puțin 6 caractere')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Parolele nu coincid')
      return
    }

    localStorage.setItem('adminPassword', newPassword)
    setPassword(newPassword)
    setShowChangePassword(false)
    setNewPassword('')
    setConfirmPassword('')
    setPasswordSuccess('Parola a fost schimbată cu succes!')
    setTimeout(() => setPasswordSuccess(''), 3000)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowLogin(true)
    setPassword('')
  }

  async function fetchMessages() {
    setLoading(true)
    try {
      const url = filter === 'all' ? '/api/contact' : `/api/contact?status=${filter}`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateMessage(id: string, status: Message['status'], notes: string) {
    try {
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notes }),
      })
      if (res.ok) {
        setEditingId(null)
        fetchMessages()
      }
    } catch (error) {
      console.error('Failed to update message:', error)
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm('Ești sigur că vrei să ștergi acest mesaj?')) return
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  function startEditing(message: Message) {
    setEditingId(message.id)
    setEditingNotes(message.notes || '')
    setEditedStatus(message.status)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditingNotes('')
    setEditedStatus('new')
  }

  function formatDate(isoString: string) {
    return new Date(isoString).toLocaleString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredMessages = messages
  const stats = {
    all: messages.length,
    new: messages.filter((m) => m.status === 'new').length,
    read: messages.filter((m) => m.status === 'read').length,
    archived: messages.filter((m) => m.status === 'archived').length,
  }

  // Login Screen
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="card p-8">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="font-display font-bold text-2xl text-primary text-center mb-2">
              Panou Administrare
            </h1>
            <p className="text-text-muted text-center mb-6">
              Marius ProConstruct Ilfov
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-muted mb-2">
                  Parola
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introdu parola..."
                  className="w-full"
                  autoComplete="off"
                  autoFocus
                />
                {loginError && (
                  <p className="text-red-500 text-sm mt-2">{loginError}</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Intră în Panel
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

  // Main Admin Panel
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      {/* Header */}
      <div className="bg-primary text-white py-4 sticky top-0 z-10 shadow-lg">
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl">Panou Administrare</h1>
            <p className="text-white/60 text-sm">Marius ProConstruct Ilfov</p>
          </div>
          <div className="flex items-center gap-3">
            {passwordSuccess && (
              <span className="text-green-400 text-sm">{passwordSuccess}</span>
            )}
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors text-sm"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Schimbă Parola</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover rounded transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Ieșire</span>
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="container py-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card max-w-md mx-auto border-accent/50"
          >
            <h2 className="font-display font-bold text-lg text-primary mb-4">
              Schimbă Parola
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-text-muted mb-2">
                  Parolă Nouă
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minim 6 caractere..."
                  required
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-muted mb-2">
                  Confirmă Parola
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Reintrodu parola..."
                  required
                  autoComplete="new-password"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Salvează Parola Nouă
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false)
                    setNewPassword('')
                    setConfirmPassword('')
                    setPasswordError('')
                  }}
                  className="btn btn-outline"
                >
                  Anulează
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="container py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {(Object.keys(statusLabels) as StatusFilter[]).map((status) => (
            <div
              key={status}
              className={`card cursor-pointer transition-all ${
                filter === status ? 'border-accent bg-accent/5' : ''
              }`}
              onClick={() => setFilter(status)}
            >
              <div className="text-3xl font-display font-bold text-accent">
                {stats[status]}
              </div>
              <div className="text-sm text-text-muted">{statusLabels[status]}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {(Object.keys(statusLabels) as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2.5 font-medium transition-all rounded ${
                filter === status
                  ? 'bg-accent text-white'
                  : 'bg-white border-2 border-border text-text hover:border-accent'
              }`}
            >
              {statusLabels[status]}
            </button>
          ))}
        </motion.div>

        {/* Messages List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-text-muted">Se încarcă...</div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-accent" />
            </div>
            <p className="text-text-muted mb-2">Nu există mesaje în această categorie.</p>
            <p className="text-sm text-text-muted">Mesajele din formularul de contact vor apărea aici.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card"
              >
                {editingId === message.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value as Message['status'])}
                        className="bg-white border-2 border-border px-4 py-2 text-primary focus:border-accent outline-none"
                      >
                        <option value="new">Nou</option>
                        <option value="read">Citit</option>
                        <option value="archived">Arhivat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-muted mb-2">
                        Note (intern)
                      </label>
                      <textarea
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        rows={3}
                        className="w-full bg-white border-2 border-border px-4 py-3 text-primary focus:border-accent outline-none resize-none"
                        placeholder="Adaugă note interne..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateMessage(message.id, editedStatus, editingNotes)}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Salvează
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="btn btn-outline flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Anulează
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border rounded ${statusColors[message.status]}`}
                        >
                          {statusLabels[message.status as StatusFilter]}
                        </span>
                        <span className="text-text-muted text-sm flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(message)}
                          className="px-4 py-2 text-sm bg-accent/10 hover:bg-accent/20 text-accent rounded transition-colors"
                        >
                          Editează
                        </button>
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="px-3 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Șterge
                        </button>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-primary">
                        <span className="text-text-muted text-sm">Nume:</span>
                        <span className="font-semibold">{message.name}</span>
                      </div>
                      {message.service && (
                        <div className="flex items-center gap-3 text-primary">
                          <Package className="w-4 h-4 text-accent" />
                          <span className="text-text-muted text-sm">Serviciu:</span>
                          <span className="font-semibold">{message.service}</span>
                        </div>
                      )}
                      {message.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-accent" />
                          <a
                            href={`tel:${message.phone}`}
                            className="text-accent hover:text-accent-hover transition-colors font-medium"
                          >
                            {message.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div className="bg-secondary/50 rounded p-4">
                      <p className="text-primary">{message.message}</p>
                    </div>

                    {/* Notes */}
                    {message.notes && (
                      <div className="bg-accent/5 border border-accent/20 rounded p-3">
                        <div className="text-xs text-accent mb-1 uppercase tracking-wider font-semibold">
                          Note interne
                        </div>
                        <p className="text-text text-sm">{message.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
