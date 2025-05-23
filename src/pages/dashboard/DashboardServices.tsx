import React, { useEffect, useState } from 'react'
import { Lightbulb, Loader2, Pencil, Plus, Sparkles, Target, Trash2, Users } from 'lucide-react'
import { Button } from '../../components/Button'
import type { Service } from '../../types'
import { servicesApi } from '../../api/services'

const iconOptions = [
  { value: 'Target', label: 'Target', icon: Target },
  { value: 'Sparkles', label: 'Sparkles', icon: Sparkles },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Lightbulb', label: 'Lightbulb', icon: Lightbulb },
]

export function DashboardServices() {
  const [services, setServices] = useState<Service[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getAll()
      setServices(data['hydra:member'] || [])
    } catch (err) {
      setError('Erreur lors du chargement des services')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      if (selectedService) {
        await servicesApi.update(selectedService.id, {
          ...selectedService,
          ...Object.fromEntries(formData),
        })
      } else {
        await servicesApi.create(Object.fromEntries(formData))
      }
      await fetchServices()
      setIsModalOpen(false)
    } catch (err) {
      setError('Erreur lors de la sauvegarde du service')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
        await servicesApi.delete(id)
        await fetchServices()
      } catch (err) {
        setError('Erreur lors de la suppression du service')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary-500" />
          <p className="text-gray-600">Chargement des services...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des services</h1>
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => {
            setSelectedService(null)
            setIsModalOpen(true)
          }}
        >
          Nouveau service
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const IconComponent = iconOptions.find((i) => i.value === service.icon)?.icon || Target
          return (
            <div key={service.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2">
                  <IconComponent className="h-5 w-5 text-primary-500" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="mb-4 text-sm text-gray-600">{service.description}</p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedService(service)
                      setIsModalOpen(true)
                    }}
                    className="p-2 text-gray-600 transition-colors hover:text-primary-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-gray-600 transition-colors hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {selectedService ? 'Modifier le service' : 'Nouveau service'}
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Titre</label>
                <input
                  type="text"
                  name="title"
                  className="w-full rounded-lg border px-4 py-2"
                  defaultValue={selectedService?.title}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  className="w-full rounded-lg border px-4 py-2"
                  rows={4}
                  defaultValue={selectedService?.description}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Fields</label>
                <textarea
                  name="fields"
                  className="w-full rounded-lg border px-4 py-2"
                  rows={4}
                  defaultValue={selectedService?.fields}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Icône</label>
                <select
                  name="icon"
                  className="w-full rounded-lg border px-4 py-2"
                  defaultValue={selectedService?.icon}
                  required
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="ghost" size="md" onClick={() => setIsModalOpen(false)}>
                  Annuler
                </Button>
                <Button variant="primary" size="md" type="submit">
                  {selectedService ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
