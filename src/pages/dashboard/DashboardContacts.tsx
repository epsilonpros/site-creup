import React, { useEffect, useState } from 'react'
import {
  ArrowDownToLine,
  Filter,
  ChevronDown,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Trash2,
  User,
} from 'lucide-react'
import { Button } from '../../components/Button'
import { genericApi } from '../../api'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
  status: 'new' | 'read' | 'archived'
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  read: 'bg-gray-100 text-gray-800',
  archived: 'bg-yellow-100 text-yellow-800',
}

const statusLabels = {
  new: 'Nouveau',
  read: 'Lu',
  archived: 'Archivé',
}

export function DashboardContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const data = await genericApi.get<Contact>('/api/contacts')
      setContacts(data['hydra:member'] || [])
    } catch (err) {
      setError('Une erreur est survenue lors du chargement des contacts')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: Contact['status']) => {
    setIsUpdating(true)
    try {
      await genericApi.patch(`/api/contacts/${id}`, { status })
      await fetchContacts()
      setIsDetailsModalOpen(false)
    } catch (err) {
      setError('Une erreur est survenue lors de la mise à jour du statut')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) return

    setIsUpdating(true)
    try {
      await genericApi.delete(`/api/contacts/${id}`)
      await fetchContacts()
      setIsDetailsModalOpen(false)
    } catch (err) {
      setError('Une erreur est survenue lors de la suppression du contact')
    } finally {
      setIsUpdating(false)
    }
  }

  const filteredContacts =
    selectedStatus === 'all'
      ? contacts
      : contacts.filter((contact) => contact.status === selectedStatus)

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary-500" />
          <p className="text-gray-600">Chargement des contacts...</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des contacts</h1>
          <p className="mt-1 text-sm text-gray-500">{contacts.length} contacts au total</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="new">Nouveaux</option>
              <option value="read">Lus</option>
              <option value="archived">Archivés</option>
            </select>
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <Button variant="secondary" size="md" icon={ArrowDownToLine}>
            Exporter
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Sujet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Aucun contact trouvé
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {contact.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {contact.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{contact.subject}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusColors[contact.status]
                        }`}
                      >
                        {statusLabels[contact.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <button
                        onClick={() => {
                          setSelectedContact(contact)
                          setIsDetailsModalOpen(true)
                        }}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Voir détails
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6">
            <div className="mb-6 flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900">Détails du contact</h2>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  statusColors[selectedContact.status]
                }`}
              >
                {statusLabels[selectedContact.status]}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-sm font-medium text-gray-500">Informations de contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{selectedContact.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{selectedContact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{selectedContact.phone}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-sm font-medium text-gray-500">Message</h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="mb-2 font-medium text-gray-900">{selectedContact.subject}</p>
                  <p className="whitespace-pre-wrap text-gray-700">{selectedContact.message}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Reçu le {new Date(selectedContact.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              <div className="flex gap-2">
                {selectedContact.status === 'new' && (
                  <Button
                    variant="primary"
                    size="md"
                    icon={MessageSquare}
                    onClick={() => handleStatusUpdate(selectedContact.id, 'read')}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Mise à jour...' : 'Marquer comme lu'}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="md"
                  icon={Trash2}
                  onClick={() => handleDelete(selectedContact.id)}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Suppression...' : 'Supprimer'}
                </Button>
              </div>
              <Button variant="ghost" size="md" onClick={() => setIsDetailsModalOpen(false)}>
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
