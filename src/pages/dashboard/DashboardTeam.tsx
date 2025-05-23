import React, { useEffect, useState } from 'react'
import {
  Camera,
  ChartNoAxesCombined,
  Code,
  Loader2,
  Palette,
  Pencil,
  PenTool,
  Plus,
  Target,
  Trash2,
} from 'lucide-react'
import { Button } from '../../components/Button'
import { genericApi } from '../../api'
import type { TeamMember } from '../../types'

const iconOptions = [
  { value: 'Target', label: 'Target', icon: Target },
  { value: 'Palette', label: 'Palette', icon: Palette },
  { value: 'Camera', label: 'Camera', icon: Camera },
  { value: 'Code', label: 'Code', icon: Code },
  { value: 'ChartNoAxesCombined', label: 'Chart', icon: ChartNoAxesCombined },
  { value: 'PenTool', label: 'Design', icon: PenTool },
]

export function DashboardTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const data = await genericApi.get<TeamMember>('/api/users')
      setTeamMembers(data['hydra:member'] || [])
    } catch (err) {
      setError("Une erreur est survenue lors du chargement de l'équipe")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdating(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      if (selectedMember) {
        await genericApi.put(`/api/users/${selectedMember.id}`, data)
      } else {
        await genericApi.post('/api/users', data)
      }
      await fetchTeamMembers()
      setIsModalOpen(false)
    } catch (err) {
      setError('Une erreur est survenue lors de la sauvegarde')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return

    setIsUpdating(true)
    try {
      await genericApi.delete(`/api/users/${id}`)
      await fetchTeamMembers()
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
          <p className="text-gray-600">Chargement des membres...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center p-4">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion de l'équipe</h1>
          <p className="mt-1 text-sm text-gray-500">{teamMembers.length} membres au total</p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => {
              setSelectedMember(null)
              setIsModalOpen(true)
            }}
          >
            Nouveau membre
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamMembers.map((member) => {
          const IconComponent = iconOptions.find((i) => i.value === member.icon)?.icon || Target
          return (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="aspect-w-3 aspect-h-4 relative">
                <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent opacity-60 transition-opacity group-hover:opacity-70" />
                <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2">
                  <IconComponent className="h-5 w-5 text-primary-500" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="mb-1 text-lg font-bold text-white">{member.name}</h3>
                  <p className="mb-2 text-sm text-primary-200">{member.role}</p>
                  <p className="text-sm text-gray-300 opacity-0 transition-opacity group-hover:opacity-100">
                    {member.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-gray-100 p-4">
                <button
                  onClick={() => {
                    setSelectedMember(member)
                    setIsModalOpen(true)
                  }}
                  className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary-600"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {selectedMember ? 'Modifier le membre' : 'Nouveau membre'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedMember?.name}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Rôle</label>
                  <input
                    type="text"
                    name="role"
                    defaultValue={selectedMember?.role}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedMember?.description}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Icône</label>
                  <select
                    name="icon"
                    defaultValue={selectedMember?.icon}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={selectedMember?.image}
                    placeholder="URL de l'image"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 border-t pt-6">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isUpdating}
                >
                  Annuler
                </Button>
                <Button variant="primary" size="md" type="submit" disabled={isUpdating}>
                  {isUpdating
                    ? selectedMember
                      ? 'Mise à jour...'
                      : 'Création...'
                    : selectedMember
                      ? 'Mettre à jour'
                      : 'Créer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
