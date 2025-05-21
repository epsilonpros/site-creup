import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '../components/Button'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-9xl font-bold text-primary-500">404</h1>
          <p className="mb-2 text-2xl font-semibold text-gray-900">Page non trouvée</p>
          <p className="text-gray-600">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" icon={Home}>
              Retour à l'accueil
            </Button>
          </Link>
          <Button variant="ghost" size="lg" icon={ArrowLeft} onClick={() => window.history.back()}>
            Page précédente
          </Button>
        </div>
      </div>
    </main>
  )
}
