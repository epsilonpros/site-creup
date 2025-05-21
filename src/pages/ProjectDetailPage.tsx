import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  Image,
  Link as LinkIcon,
  Play,
  Target,
  Users,
} from 'lucide-react'
import { Button } from '../components/Button'
import type { CaseStudy } from '../types'
import { projectsApi } from '../api'
import { ProjectDetailSkeleton } from '../components/Skeletons'

const typeIcons = {
  Design: Target,
  Photo: Image,
  Vidéo: Play,
}

export function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState<CaseStudy | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return

      try {
        const data = await projectsApi.getById(id).catch(() => null)
        setProject(data)
      } catch (err) {
        setError('Une erreur est survenue lors du chargement du projet')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [id])

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  if (isLoading) {
    return <ProjectDetailSkeleton />
  }

  if (error || !project) {
    return (
      <div className="min-h-screen px-4 pt-20">
        <div className="mx-auto max-w-7xl py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Projet non trouvé</h1>
          <Link
            to="/portfolio"
            className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux projets
          </Link>
        </div>
      </div>
    )
  }

  const TypeIcon = typeIcons[project.category as keyof typeof typeIcons]

  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <div className="relative h-[70vh] bg-gray-900">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                {TypeIcon && (
                  <span className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm">
                    <TypeIcon className="h-6 w-6" />
                  </span>
                )}
                <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">{project.title}</h1>
              <div className="flex flex-wrap gap-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-4 py-1 text-sm text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left column - Main content */}
          <div className="lg:col-span-2">
            {/* Project overview */}
            <section className="mb-16">
              <h2 className="mb-8 text-2xl font-bold text-gray-900">Aperçu du projet</h2>
              <div className="mb-12">
                <p className="mb-8 text-xl text-gray-700">{project.description}</p>
              </div>

              {/* Challenge & Solution */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Un défi</h3>
                  <p className="text-gray-700">{project.challenge}</p>
                </div>
                <div className="rounded-xl bg-primary-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Une solution</h3>
                  <p className="text-gray-700">{project.solution}</p>
                </div>
              </div>
            </section>

            {/* Objectives */}
            {project.objectives && (
              <section className="mb-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">Objectifs</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {project.objectives.map((objective, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary-500" />
                      <span className="text-gray-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Results */}
            {project.results && (
              <section className="mb-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">Résultats</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {project.results.map((result, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100"
                    >
                      <p className="text-gray-700">{result}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {project.gallery && (
              <section className="mb-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">Galerie</h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-w-16 aspect-h-9 group relative cursor-pointer overflow-hidden rounded-xl"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Vue ${index + 1}`}
                        className="h-full w-full transform object-cover transition-all duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                          <ArrowUpRight className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Video */}
            {project.videoUrl && (
              <section className="mb-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">Vidéo du projet</h2>
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-xl shadow-lg">
                  <video controls className="w-full" poster={project.image}>
                    <source src={project.videoUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              </section>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <section className="mb-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">Témoignage client</h2>
                <div className="rounded-xl bg-gray-50 p-8">
                  <div className="flex items-start gap-6">
                    <img
                      src={project.testimonial.image}
                      alt={project.testimonial.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="mb-4 text-lg italic text-gray-700">
                        "{project.testimonial.content}"
                      </p>
                      <div>
                        <p className="font-medium text-gray-900">{project.testimonial.name}</p>
                        <p className="text-sm text-gray-600">{project.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Navigation */}
            <section className="grid grid-cols-2 gap-8">
              {project.previousProject && (
                <Link
                  to={`/portfolio/${project.previousProject.id}`}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <img
                    src={project.previousProject.image}
                    alt={project.previousProject.title}
                    className="h-40 w-full object-cover brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-start p-6">
                    <div className="text-white">
                      <div className="mb-2 flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Projet précédent</span>
                      </div>
                      <p className="text-lg font-medium">{project.previousProject.title}</p>
                    </div>
                  </div>
                </Link>
              )}
              {project.nextProject && (
                <Link
                  to={`/portfolio/${project.nextProject.id}`}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <img
                    src={project.nextProject.image}
                    alt={project.nextProject.title}
                    className="h-40 w-full object-cover brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-end p-6">
                    <div className="text-right text-white">
                      <div className="mb-2 flex items-center justify-end gap-2">
                        <span className="text-sm">Projet suivant</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <p className="text-lg font-medium">{project.nextProject.title}</p>
                    </div>
                  </div>
                </Link>
              )}
            </section>
          </div>

          {/* Right column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Project info */}
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold text-gray-900">Informations</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500">Client</dt>
                    <dd className="font-medium text-gray-900">{project?.client?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Catégorie</dt>
                    <dd className="font-medium text-gray-900">{project.category}</dd>
                  </div>
                  {project.timeline && (
                    <div>
                      <dt className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        Durée du projet
                      </dt>
                      <dd className="font-medium text-gray-900">{project.timeline}</dd>
                    </div>
                  )}
                  {project.technologies && (
                    <div>
                      <dt className="text-sm text-gray-500">Technologies</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Clock}
                    fullWidth
                    onClick={() => navigate('/appointment')}
                  >
                    Prendre rendez-vous
                  </Button>
                  {project?.client?.website && (
                    <a
                      href={project.client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Visiter le site
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full p-2 text-white hover:bg-white/10"
            onClick={() => setSelectedImage(null)}
          >
            <ArrowUpRight className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt="Vue détaillée"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </main>
  )
}
