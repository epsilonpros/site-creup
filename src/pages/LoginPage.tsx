import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { Button } from '../components/Button'
import { Logo } from '../components/Logo'
import { authApi } from '../api/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await authApi.login(email, password)
      localStorage.setItem('token', response.token)
      localStorage.setItem('isAuthenticated', 'true')

      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    } catch (err) {
      setError('Email ou mot de passe incorrect')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo className="h-12 w-auto" color="dark" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Connexion au tableau de bord
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  id="email"
                  name="username"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pl-10 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                />
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pl-10 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                />
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Besoin d'aide ?</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <div className="text-sm">
                <a
                  href="mailto:support@creup-group.com"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Contactez le support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
