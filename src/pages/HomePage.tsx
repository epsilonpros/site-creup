import React, { useEffect, useState } from 'react'
import { ArrowRight, Building2, Globe, icons, Play, Sparkles, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { genericApi, partnersApi, projectsApi, servicesApi } from '../api'
import { CaseStudy, Partner, Service } from '../types'
import {
  PartnerSkeleton,
  ProjectSkeleton,
  ServiceSkeleton,
  SkeletonBlock,
  SkeletonContainer,
  SkeletonLine,
} from '../components/Skeletons'
import slugify from 'slugify'

export function HomePage() {
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<CaseStudy[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [stats, setStats] = useState<{ expert: number; project: number }>({
    expert: 0,
    project: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [servicesData, projectsData, partnersData, statsData] = await Promise.all([
          servicesApi.getAll().catch(() => []),
          projectsApi.get(3).catch(() => []),
          partnersApi.getAll().catch(() => []),
          genericApi.get('/api/stats').catch(() => ({})),
        ])

        setServices(servicesData['hydra:member'] || [])
        setProjects(projectsData['hydra:member'] || [])
        setPartners(partnersData['hydra:member'] || [])
        setStats(statsData?.home || { expert: 0, project: 0 })
      } catch (err) {
        console.log(err)

        setError('Une erreur est survenue lors du chargement des données')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="animate-gradient-slow absolute inset-0 bg-gradient-to-br from-[#0D3640] via-[#0A2A32] to-[#071F24]">
          <div className="absolute inset-0 opacity-30">
            <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary-200" />
              <span className="text-sm font-medium text-primary-200">
                Agence de Communication 360°
              </span>
            </div>

            <h1 className="mb-8 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
              <span className="mb-2 block animate-fade-in-up">Transformons vos idées</span>
              <span className="block animate-gradient-x bg-gradient-to-r from-primary-200 via-primary-300 to-primary-400 bg-clip-text text-transparent">
                en succès digital
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up-delay text-xl leading-relaxed text-primary-100">
              Nous créons des expériences digitales uniques qui captent l'attention, engagent votre
              audience et transforment vos visiteurs en clients fidèles.
            </p>

            <div className="mt-12 flex animate-fade-in-up-delay-2 flex-col justify-center gap-6 sm:flex-row">
              <Link to="/appointment">
                <Button variant="white" size="lg" icon={ArrowRight} className="group">
                  Discuter d'un projet
                </Button>
              </Link>

              <Link to="/services">
                <Button variant="secondary" size="lg" icon={Sparkles} className="group">
                  Découvrir nos services
                </Button>
              </Link>
            </div>

            <div className="mt-20 grid animate-fade-in-up-delay-3 grid-cols-1 gap-8 md:grid-cols-3">
              {isLoading ? (
                <>
                  <SkeletonContainer>
                    <SkeletonBlock className="mb-4 h-12 w-12" />
                    <SkeletonLine />
                  </SkeletonContainer>

                  <SkeletonContainer>
                    <SkeletonBlock className="mb-4 h-12 w-12" />
                    <SkeletonLine />
                  </SkeletonContainer>

                  <SkeletonContainer>
                    <SkeletonBlock className="mb-4 h-12 w-12" />
                    <SkeletonLine />
                  </SkeletonContainer>
                </>
              ) : (
                <>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20">
                    <Target className="mb-4 h-8 w-8 text-primary-300" />
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {stats?.project} Projets
                    </h3>
                    <p className="text-primary-100">Réalisés avec succès pour nos clients</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20">
                    <Sparkles className="mb-4 h-8 w-8 text-primary-300" />
                    <h3 className="mb-2 text-lg font-semibold text-white">98% Satisfaction</h3>
                    <p className="text-primary-100">De nos clients recommandent nos services</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20">
                    <Zap className="mb-4 h-8 w-8 text-primary-300" />
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {stats?.expert} Experts
                    </h3>
                    <p className="text-primary-100">Une équipe passionnée à votre service</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Nos services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Des solutions sur mesure pour votre communication
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <ServiceSkeleton key={i} />)
              : services.map((service) => {
                  const Icon = icons[service.icon]
                  return (
                    <div
                      key={service.id}
                      className="group relative rounded-xl bg-white p-6 shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 hover:shadow-xl"
                    >
                      <div>
                        <span className="inline-flex rounded-lg bg-primary-50 p-3 text-primary-700 ring-4 ring-white">
                          <Icon className="h-6 w-6" />
                        </span>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                        <p className="mt-2 text-sm text-gray-500">{service.description}</p>
                      </div>
                      <Link
                        to={`/services#${slugify(service.title, { lower: true })}`}
                        className="mt-6 flex items-center text-sm font-medium text-primary-500"
                      >
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  )
                })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Nos réalisations</h2>
              <p className="mt-4 text-lg text-gray-600">Découvrez nos derniers projets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => <ProjectSkeleton key={i} />)
              : projects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
                  >
                    <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                      <img
                        src={project.type === 'video' ? project.image : project.image}
                        alt={project.title}
                        className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {project.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                            <Play className="h-8 w-8 fill-current text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                          {project.category}
                        </span>
                        <span className="text-sm text-gray-500">{project?.client?.name}</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900">{project.title}</h3>
                      <p className="mb-4 text-sm text-gray-600">{project.description}</p>
                      <Link
                        to={`/portfolio/${project.id}`}
                        className="inline-flex items-center text-primary-600 transition-all group-hover:gap-2"
                      >
                        Voir le projet
                        <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                      </Link>
                    </div>
                  </div>
                ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/portfolio">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Découvrir tous nos projets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center justify-center gap-2">
              <Building2 className="h-6 w-6 text-primary-600" />
              <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
                Ils nous font confiance
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Nos clients</h2>
            <p className="mt-4 text-lg text-gray-600">
              Ils nous font confiance pour transformer leurs idées en messages percutants.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <PartnerSkeleton key={i} />)
              : partners
                  .filter((p) => p.kind === 'client')
                  .map((partner) => (
                    <div
                      key={partner.id}
                      className="group flex flex-col items-center justify-center gap-5 rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-24 w-32 transform object-contain transition-all duration-300 group-hover:grayscale-0"
                      />
                      <span className="text-sm font-medium text-gray-600">{partner.name}</span>
                    </div>
                  ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative bg-secondary-900 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center justify-center gap-2">
              <Globe className="h-6 w-6 text-primary-300" />
              <span className="text-sm font-semibold uppercase tracking-wide text-primary-300">
                Ensemble plus loin
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Nos partenaires stratégiques
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Nous collaborons avec les meilleurs pour vous offrir des solutions innovantes
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <PartnerSkeleton key={i} dark />)
              : partners
                  .filter((p) => p.kind === 'partner')
                  .map((partner) => (
                    <div
                      key={partner.id}
                      className="group flex flex-col items-center justify-center gap-5 rounded-lg bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-24 w-32 transform object-contain transition-all duration-300 group-hover:grayscale-0"
                      />
                      <span className="text-sm font-medium text-gray-300">{partner.name}</span>
                    </div>
                  ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary-600 p-8 text-center md:p-12">
            <Building2 className="mx-auto mb-6 h-12 w-12 text-primary-200" />
            <h3 className="mb-4 text-2xl font-bold text-white">
              Prêt à transformer votre communication ?
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-primary-200">
              Rejoignez plus de {partners.length} entreprises qui nous font confiance
            </p>

            <Link to="/appointment" className="block w-full">
              <Button variant="white" size="lg">
                Demander un audit gratuit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
