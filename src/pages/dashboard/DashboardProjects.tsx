import React, { useEffect, useState } from 'react'
import {
  Image as ImageIcon,
  LayoutDashboard,
  Loader2,
  Pencil,
  Play,
  Plus,
  Printer,
  Trash2,
} from 'lucide-react'
import { Button } from '../../components/Button'
import type { CaseStudy } from '../../types'
import { projectsApi } from '../../api/projects'
import { useNavigate } from 'react-router-dom'

const typeIcons = {
  'Graphique design': Printer,
  'Photo': ImageIcon,
  'Vidéo': Play,
  'Projet interne': LayoutDashboard,
}

export function DashboardProjects() {
  const [projects, setProjects] = useState<CaseStudy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const projectsData = await projectsApi.getAll()
      setProjects(projectsData['hydra:member'] || [])
    } catch (err) {
      setError('Une erreur est survenue lors du chargement des données')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return

    setIsUpdating(true)
    try {
      await projectsApi.delete(id)
      await fetchData()
    } catch (err) {
      setError('Une erreur est survenue lors de la suppression')
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary-500" />
          <p className="text-gray-600">Chargement des projets...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des projets</h1>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => navigate('/dashboard/projects/new')}
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
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => {
                return (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="line-clamp-1 whitespace-nowrap px-6 py-4">{project.title}</td>
                    <td className="whitespace-nowrap px-6 py-4">{project?.client?.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
                        {project.category}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-gray-600 transition-colors hover:text-red-600"
                          onClick={() => navigate(`/dashboard/projects/${project.id}`)}
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
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
