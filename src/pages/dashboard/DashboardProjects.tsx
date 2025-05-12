import React, { useEffect, useState } from 'react'
import { Image as ImageIcon, Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '../../components/Button'
import type { CaseStudy } from '../../types'
import { projectsApi } from '../../api/projects'

export function DashboardProjects() {
  const [projects, setProjects] = useState<CaseStudy[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await projectsApi.getAll()
      setProjects(data['hydra:member'] || [])
    } catch (err) {
      setError('Erreur lors du chargement des projets')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      if (selectedProject) {
        await projectsApi.update(selectedProject.id, Object.fromEntries(formData))
      } else {
        await projectsApi.create(Object.fromEntries(formData))
      }
      await fetchProjects()
      setIsModalOpen(false)
    } catch (err) {
      setError('Erreur lors de la sauvegarde du projet')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await projectsApi.delete(id)
        await fetchProjects()
      } catch (err) {
        setError('Erreur lors de la suppression du projet')
      }
    }
  }

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des projets</h1>
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => {
            setSelectedProject(null)
            setIsModalOpen(true)
          }}
        >
          Nouveau projet
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="h-12 w-12 overflow-hidden rounded-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{project.title}</td>
                  <td className="whitespace-nowrap px-6 py-4">{project?.client?.name}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
                      {project.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProject(project)
                          setIsModalOpen(true)
                        }}
                        className="p-2 text-gray-600 transition-colors hover:text-primary-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-gray-600 transition-colors hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {selectedProject ? 'Modifier le projet' : 'Nouveau projet'}
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Titre</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full rounded-lg border px-4 py-2"
                    defaultValue={selectedProject?.title}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Client</label>
                  <input
                    type="text"
                    name="client"
                    className="w-full rounded-lg border px-4 py-2"
                    defaultValue={selectedProject?.client?.name}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  className="w-full rounded-lg border px-4 py-2"
                  rows={4}
                  defaultValue={selectedProject?.description}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Catégorie</label>
                  <select
                    name="category"
                    className="w-full rounded-lg border px-4 py-2"
                    defaultValue={selectedProject?.category}
                  >
                    <option>Design</option>
                    <option>Photo</option>
                    <option>Vidéo</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Image</label>
                  <div className="flex items-center gap-4">
                    {selectedProject?.image && (
                      <img
                        src={selectedProject.image}
                        alt=""
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    )}
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Choisir une image
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="ghost" size="md" onClick={() => setIsModalOpen(false)}>
                  Annuler
                </Button>
                <Button variant="primary" size="md" type="submit">
                  {selectedProject ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
