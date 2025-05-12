import React, { useEffect, useState } from 'react'
import {
  BarChart3,
  Clock,
  icons,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Button } from '../components/Button'
import { genericApi } from '../api'
import { Stats, TeamMember } from '../types.ts'
import { Link } from 'react-router-dom'

export function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [stats, setStats] = useState<Stats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamData, statsData] = await Promise.all([
          genericApi.get<TeamMember>('/api/users'),
          genericApi.get<Stats>('/api/stats'),
        ])
        setTeamMembers(teamData['hydra:member'] || [])
        setStats(statsData?.member || [])
        console.log(teamData)
      } catch (err) {
        // setError('Une erreur est survenue lors du chargement des données');
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500"></div>
          <p className="text-gray-600">Chargement...</p>
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

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Nous explorons constamment de nouvelles approches pour vous démarquer',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Nous travaillons en étroite collaboration avec nos clients',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: "Nous visons l'excellence dans chaque projet",
    },
    {
      icon: TrendingUp,
      title: 'Performance',
      description: 'Nous mesurons et optimisons chaque action',
    },
  ]

  const features = [
    {
      icon: Target,
      title: 'Expertise reconnue',
      description:
        'Nos équipes sont composées de professionnels passionnés et expérimentés dans le domaine de la communication.',
    },
    {
      icon: Sparkles,
      title: 'Créativité sans limite',
      description:
        'Nous vous proposons des solutions innovantes et originales pour vous démarquer.',
    },
    {
      icon: Users,
      title: 'Approche personnalisée',
      description: 'Nous adaptons nos services à vos besoins spécifiques et à vos objectifs.',
    },
    {
      icon: BarChart3,
      title: 'Résultats concrets',
      description:
        'Nous vous accompagnons vers la réussite de vos projets et vous aidons à atteindre vos objectifs de communication.',
    },
  ]

  return (
    <main className="">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#0D3640] via-[#0A2A32] to-[#071F24] py-24 pt-28 lg:pt-24 2xl:min-h-[90vh]">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
          <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="absolute left-10 top-20 h-64 w-64 animate-float rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 animate-float rounded-full bg-primary-400/10 blur-3xl delay-1000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left column - Text content */}
            <div className="text-left">
              <h1 className="mb-6 animate-fade-in-up text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                <span className="block">Qui sommes</span>
                <span className="mt-2 block animate-gradient-x bg-gradient-to-r from-primary-200 via-primary-300 to-primary-400 bg-clip-text text-transparent">
                  nous ?
                </span>
              </h1>

              <p className="mb-8 max-w-lg animate-fade-in-up-delay text-xl text-primary-100">
                CreUp Group SARL est votre partenaire privilégié pour transformer votre vision en
                réalité, en insufflant vie à vos projets grâce à une expertise créative et une
                approche sur-mesure.
              </p>

              <div className="flex animate-fade-in-up-delay-2 flex-col gap-4 sm:flex-row">
                <Link to="/appointment" className="block w-full">
                  <Button variant="secondary" size="lg" icon={MessageCircle}>
                    Discuter d'un projet
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right column - Stats grid */}
            <div className="relative">
              <div className="grid animate-fade-in-up-delay-3 grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = icons[stat.icon]
                  return (
                    <div
                      key={index}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20"
                    >
                      <div className="mb-3 flex items-center gap-4">
                        <div className="rounded-lg bg-white/10 p-2">
                          <Icon className="h-5 w-5 text-primary-200" />
                        </div>
                      </div>
                      <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-primary-200">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Decorative elements */}
              <div className="animate-pulse-slow absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" />
              <div className="animate-pulse-slow absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-primary-600/10 blur-3xl delay-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Nos valeurs</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-6 inline-flex rounded-xl bg-primary-50 p-3 text-primary-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">En choisissant CreUp Group SARL</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group rounded-xl bg-primary-500 p-6 text-center shadow-sm transition-all hover:shadow-md lg:bg-white"
                >
                  <div className="mb-6 inline-flex rounded-xl bg-primary-50 p-3 text-primary-600 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white lg:text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 lg:text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
              Notre Équipe
            </span>
            <h2 className="mt-6 text-4xl font-bold text-gray-900">Des experts passionnés</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Une équipe multidisciplinaire dédiée à la réussite de vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => {
              const Icon = icons[member.icon]
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 transition-opacity group-hover:opacity-70" />
                    <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2">
                      <Icon className="h-5 w-5 text-primary-500" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="mb-1 text-lg font-bold">{member.name}</h3>
                    <p className="mb-2 text-sm text-primary-200">{member.role}</p>
                    <p className="text-sm text-gray-300 opacity-0 transition-opacity group-hover:opacity-100">
                      {member.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="mb-8 text-lg text-gray-600">
              Envie de rejoindre notre équipe ? Nous sommes toujours à la recherche de nouveaux
              talents.
            </p>
            <Link to="/contact" className="block w-full">
              <Button variant="primary" size="lg" icon={Users}>
                contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D3640]/95 via-[#0A2A32]/95 to-[#071F24]/95" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <MessageCircle className="h-4 w-4 text-primary-200" />
            <span className="text-sm font-medium text-primary-200">Collaborons ensemble</span>
          </div>

          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Prêt à transformer votre communication ?
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-xl text-primary-100">
            Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos
            objectifs.
          </p>

          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link to="/appointment" className="block w-full">
              <Button variant="white" size="lg" icon={Clock}>
                Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
