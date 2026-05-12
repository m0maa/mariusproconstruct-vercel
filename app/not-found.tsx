import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Pagina nu a fost găsită</h2>
        <p className="text-text-muted mb-8">Pagina pe care o cauutați nu există sau a fost mutată.</p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-accent text-white font-bold hover:bg-accent-hover transition-colors"
        >
          Înapoi la Pagina Principală
        </Link>
      </div>
    </div>
  )
}
