import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  ExternalLink,
  Facebook,
  Image,
  Instagram,
  LayoutDashboard,
  Linkedin,
  Play,
  Printer,
  Users,
} from 'lucide-react'
import { Button } from '../components/Button'
import type { CaseStudy } from '../types'
import { projectsApi } from '../api'
import { ProjectDetailSkeleton } from '../components/Skeletons'

const typeIcons = {
  'Graphique design': Printer,
  'Photo': Image,
  'Vidéo': Play,
  'Projet interne': LayoutDashboard,
}

const socialIcons = {
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
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
      <div className="relative h-[80vh] bg-gray-900">
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
                {project?.tags?.map((tag) => (
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
            </section>

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
          </div>

          {/* Right column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">Informations</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-500">Client</dt>
                  <dd className="font-medium text-gray-900">
                    <img
                      src={project?.client?.logo}
                      alt={project?.client?.name}
                      className="h-full w-20 transform"
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Catégorie</dt>
                  <dd className="font-medium text-gray-900">{project.category}</dd>
                </div>
                {/* Team Section */}
                {project.team && project.team.length > 0 && (
                  <div className="border-t pt-4">
                    <dt className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      L'équipe du projet
                    </dt>
                    <dd className="space-y-3">
                      {project.team.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div>
                            <span className="block font-medium text-gray-900">{member.name}</span>
                            <span className="text-sm text-gray-500">{member.role}</span>
                          </div>
                          {member.portfolio && (
                            <a
                              href={member.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      ))}
                    </dd>
                  </div>
                )}

                {/* Social Post Section */}
                {project.socialPost && (
                  <div className="border-t pt-4">
                    <dt className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      Publication client
                    </dt>
                    <dd>
                      <a
                        href={project.socialPost.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block overflow-hidden rounded-lg"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.socialPost.thumbnail}
                            alt="Publication sur les réseaux sociaux"
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          {project.category === 'Vidéo' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                                <Play className="h-8 w-8 fill-current text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-8 space-y-4 border-t pt-8">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Clock}
                  fullWidth
                  onClick={() => navigate('/appointment')}
                >
                  Prendre rendez-vous
                </Button>
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
