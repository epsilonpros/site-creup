import React, { useEffect, useState } from 'react'
import {
  BarChart3,
  Check,
  Clock,
  icons,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { Button } from '../components/Button'
import { servicesApi } from '../api'
import type { Service } from '../types'
import { Link } from 'react-router-dom'

const processSteps = [
  {
    icon: Target,
    title: 'Analyse des besoins',
    description: 'Nous étudions vos objectifs et votre marché pour définir la meilleure stratégie.',
  },
  {
    icon: Lightbulb,
    title: 'Proposition sur mesure',
    description: 'Nous élaborons une solution personnalisée adaptée à vos enjeux.',
  },
  {
    icon: TrendingUp,
    title: 'Mise en œuvre',
    description: 'Nous déployons la stratégie et assurons un suivi régulier.',
  },
  {
    icon: MessageSquare,
    title: 'Optimisation continue',
    description:
      'Nous analysons les résultats et ajustons la stratégie pour maximiser les performances.',
  },
]

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll().catch(() => [])
        setServices(data['hydra:member'] || [])
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des services')
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500"></div>
          <p className="text-gray-600">Chargement des services...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      </div>
    )
  }

  return (
    <main className="">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-br from-[#0D3640] via-[#0A2A32] to-[#071F24]">
        <div className="absolute inset-0">
          <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="absolute left-10 top-20 h-64 w-64 animate-float rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 animate-float rounded-full bg-primary-400/10 blur-3xl delay-1000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-left">
              <h1 className="mb-6 animate-fade-in-up text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                <span className="block">Transformez votre</span>
                <span className="mt-2 block text-primary-300">communication</span>
              </h1>

              <p className="mb-8 max-w-lg animate-fade-in-up-delay text-xl text-primary-100">
                Des solutions innovantes et personnalisées pour développer votre présence digitale
                et accélérer votre croissance.
              </p>

              <div className="flex animate-fade-in-up-delay-2 flex-col gap-4 sm:flex-row">
                <Link to="/appointment" className="block w-full">
                  <Button variant="secondary" size="lg" icon={MessageSquare}>
                    Prendre rendez-vous
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative mt-12 grid animate-fade-in-up-delay-3 grid-cols-2 gap-6 p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/10 p-2">
                  <Target className="h-5 w-5 text-primary-200" />
                </div>
                <span className="text-primary-100">Stratégie personnalisée</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/10 p-2">
                  <Users className="h-5 w-5 text-primary-200" />
                </div>
                <span className="text-primary-100">Équipe dédiée</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/10 p-2">
                  <Zap className="h-5 w-5 text-primary-200" />
                </div>
                <span className="text-primary-100">Résultats mesurables</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/10 p-2">
                  <BarChart3 className="h-5 w-5 text-primary-200" />
                </div>
                <span className="text-primary-100">ROI optimisé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
              Nos Solutions
            </span>
            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Des services adaptés à vos besoins
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Découvrez nos offres personnalisées pour développer votre présence digitale et
              accélérer votre croissance
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service) => {
              const Icon = icons[service.icon]
              return (
                <div
                  key={service.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 opacity-50 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative p-8">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="inline-flex rounded-xl bg-primary-50 p-3 text-primary-600 transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="mb-8 space-y-3">
                      {service.fields.split('\n').map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-gray-600 transition-transform group-hover:translate-x-1"
                        >
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-primary-50 p-2 text-primary-600">
                  <Target className="h-5 w-5" />
                </span>
                <h4 className="font-semibold text-gray-900">Sur mesure</h4>
              </div>
              <p className="text-gray-600">
                Des solutions adaptées à vos objectifs et votre budget
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-primary-50 p-2 text-primary-600">
                  <Users className="h-5 w-5" />
                </span>
                <h4 className="font-semibold text-gray-900">Expertise</h4>
              </div>
              <p className="text-gray-600">Une équipe d'experts dédiée à votre réussite</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-primary-50 p-2 text-primary-600">
                  <Zap className="h-5 w-5" />
                </span>
                <h4 className="font-semibold text-gray-900">Résultats</h4>
              </div>
              <p className="text-gray-600">Des performances mesurables et un ROI optimisé</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Notre processus</h2>
            <p className="mt-4 text-xl text-gray-600">
              Une approche structurée pour garantir le succès de vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className="group relative rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
                >
                  <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="mt-4">
                    <Icon className="mb-4 h-8 w-8 text-primary-500" />
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary-600 p-8 text-center md:p-16">
            <Sparkles className="mx-auto mb-6 h-12 w-12 text-primary-200" />
            <h2 className="mb-4 text-3xl font-bold text-white">
              Prêt à transformer votre communication ?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-100">
              Discutons de vos projets et objectifs. Notre équipe d'experts est là pour vous
              accompagner.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/appointment" className="block w-full">
                <Button variant="white" size="lg" icon={Clock}>
                  Prendre rendez-vous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
