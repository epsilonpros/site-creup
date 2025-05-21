import { useEffect, useState } from 'react'
import { ArrowRight, Clock, Filter, Image, Play, Printer, Sparkles } from 'lucide-react'
import { Button } from '../components/Button'
import type { CaseStudy, Stats } from '../types'
import { projectsApi } from '../api'
import { Link } from 'react-router-dom'
import api from '../api/axios.ts'
import { ProjectSkeleton, StatSkeleton } from '../components/Skeletons'

const typeIcons = {
  Design: Printer,
  Photo: Image,
  Vidéo: Play,
}

export function PortfolioPage() {
  const [projects, setProjects] = useState<CaseStudy[]>([])
  const [stats, setStats] = useState<Stats[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getAll().catch(() => ({ 'hydra:member': [] }))
        setProjects(data['hydra:member'] || [])

        const stats = await api.get('/api/stats').catch(() => ({ data: { member: [] } }))
        setStats(stats?.data?.member || [])
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des projets')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const categories = [
    { name: 'Tous', count: projects.length },
    { name: 'Design', count: projects.filter((p) => p.category === 'Design').length },
    { name: 'Photo', count: projects.filter((p) => p.category === 'Photo').length },
    { name: 'Vidéo', count: projects.filter((p) => p.category === 'Vidéo').length },
  ]

  const filteredProjects =
    selectedCategory === 'Tous'
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="animate-gradient-slow relative flex items-center bg-gradient-to-br from-[#0D3640] via-[#0A2A32] to-[#071F24]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
          <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="absolute left-10 top-20 h-64 w-64 animate-float rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 animate-float rounded-full bg-primary-400/10 blur-3xl delay-1000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-36 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary-200" />
              <span className="text-sm font-medium text-primary-200">Découvrez nos projets</span>
            </div>

            <h1 className="mb-8 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              <span className="mb-2 block animate-fade-in-up">Nos Réalisations</span>
              <span className="block animate-gradient-x bg-gradient-to-r from-primary-200 via-primary-300 to-primary-400 bg-clip-text text-transparent">
                Créatives & Innovantes
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up-delay text-xl leading-relaxed text-primary-100">
              Explorez notre portfolio de projets qui ont transformé la communication de nos clients
              et créé un impact durable.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 z-20 bg-white shadow-sm lg:top-20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="hidden items-center space-x-2 md:flex">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category.name
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-600 md:hidden"
            >
              <Filter className="h-4 w-4" />
              Filtrer
            </button>
          </div>

          {/* Mobile filters */}
          {isFilterOpen && (
            <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name)
                    setIsFilterOpen(false)
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category.name
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => <ProjectSkeleton key={i} />)
              : filteredProjects.map((project) => {
                  const ProjectTypeIcon = typeIcons[project.category as keyof typeof typeIcons]
                  return (
                    <div
                      key={project.id}
                      className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
                    >
                      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        {ProjectTypeIcon && (
                          <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2">
                            <ProjectTypeIcon className="h-5 w-5 text-primary-500" />
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                            {project.category}
                          </span>
                          <span className="text-sm text-gray-500">{project.client?.name}</span>
                        </div>

                        <h3 className="mb-2 text-xl font-bold text-gray-900">{project.title}</h3>
                        <p className="mb-4 text-sm text-gray-600">{project.description}</p>

                        <Link to={`/portfolio/${project.id}`}>
                          <Button variant="primary" size="sm" icon={ArrowRight} className="w-full">
                            Voir le projet
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary-700 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <StatSkeleton key={i} dark />)
              : stats.map((stat) => (
                  <div className="text-center" key={stat.label}>
                    <div className="mb-2 text-4xl font-bold text-white">{stat.value}</div>
                    <div className="text-primary-200">{stat.label}</div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-secondary-800" />
            <span className="text-sm font-medium text-secondary-700">Prêt à démarrer ?</span>
          </div>

          <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">
            Transformons vos idées en réalité
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-xl text-zinc-700">
            Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos
            objectifs.
          </p>

          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link to="/appointment" className="block w-full">
              <Button variant="primary" size="lg" icon={Clock}>
                Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
