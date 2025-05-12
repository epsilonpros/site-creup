import React, { useEffect, useState } from 'react'
import { Building2, Globe, Link as LinkIcon, Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '../../components/Button'
import type { Partner } from '../../api/partners'
import { partnersApi } from '../../api/partners'

const kind = ['client', 'partner']

export function DashboardPartners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const data = await partnersApi.getAll()
      setPartners(data['hydra:member'] || [])
    } catch (err) {
      setError('Erreur lors du chargement des partenaires')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      if (selectedPartner) {
        await partnersApi.update(selectedPartner.id, {
          ...selectedPartner,
          ...Object.fromEntries(formData),
        })
      } else {
        await partnersApi.create(Object.fromEntries(formData) as Omit<Partner, 'id'>)
      }
      await fetchPartners()
      setIsModalOpen(false)
    } catch (err) {
      setError('Erreur lors de la sauvegarde du partenaire')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      try {
        await partnersApi.delete(id)
        await fetchPartners()
      } catch (err) {
        setError('Erreur lors de la suppression du partenaire')
      }
    }
  }

  if (isLoading) {
    return <div>Chargement...</div>
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des partenaires</h1>
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => {
            setSelectedPartner(null)
            setIsModalOpen(true)
          }}
        >
          Nouveau partenaire
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {partners.map((partner) => (
          <div key={partner.id} className="group overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="p-6">
              <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-gray-50">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 max-w-[80%] object-contain grayscale filter transition-all group-hover:grayscale-0"
                />
              </div>

              <div className="mb-4 text-center">
                <h3 className="font-medium text-gray-900">{partner.name}</h3>
                <span className="mt-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">
                  {partner.kind}
                </span>
              </div>

              <p className="mb-4 text-center text-sm text-gray-600">{partner.description}</p>

              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 flex items-center justify-center gap-2 text-sm text-primary-600 hover:text-primary-700"
                >
                  <Globe className="h-4 w-4" />
                  Visiter le site
                </a>
              )}

              <div className="flex items-center justify-center gap-2 border-t pt-4">
                <button
                  onClick={() => {
                    setSelectedPartner(partner)
                    setIsModalOpen(true)
                  }}
                  className="p-2 text-gray-600 transition-colors hover:text-primary-600"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="p-2 text-gray-600 transition-colors hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {selectedPartner ? 'Modifier le partenaire' : 'Nouveau partenaire'}
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Nom</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      className="w-full rounded-lg border px-4 py-2 pl-10"
                      defaultValue={selectedPartner?.name}
                      required
                    />
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Catégorie</label>
                  <select
                    name="kind"
                    className="w-full rounded-lg border px-4 py-2"
                    defaultValue={selectedPartner?.kind}
                    required
                  >
                    {kind.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  className="w-full rounded-lg border px-4 py-2"
                  rows={3}
                  defaultValue={selectedPartner?.description}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Logo</label>
                  <input
                    type="text"
                    name="logo"
                    className="w-full rounded-lg border px-4 py-2"
                    placeholder="URL du logo"
                    defaultValue={selectedPartner?.logo}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Site web</label>
                  <div className="relative">
                    <input
                      type="url"
                      name="website"
                      className="w-full rounded-lg border px-4 py-2 pl-10"
                      placeholder="https://..."
                      defaultValue={selectedPartner?.website}
                    />
                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="ghost" size="md" onClick={() => setIsModalOpen(false)}>
                  Annuler
                </Button>
                <Button variant="primary" size="md" type="submit">
                  {selectedPartner ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
