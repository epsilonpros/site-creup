import React, { useEffect, useState } from 'react'
import {
  Calendar,
  Clock,
  MessageSquare,
  User,
  Building2,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Filter,
  ChevronDown,
  Loader2,
} from 'lucide-react'
import { Button } from '../../components/Button'
import { appointmentsApi } from '../../api'
import type { Appointment } from '../../api/appointments'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusLabels = {
  pending: 'En attente',
  confirmed: 'Confirmé',
  cancelled: 'Annulé',
}

export function DashboardAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const data = await appointmentsApi.getAll()
      setAppointments(data['hydra:member'] || [])
    } catch (err) {
      setError('Une erreur est survenue lors du chargement des rendez-vous')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: Appointment['status']) => {
    setIsUpdating(true)
    try {
      await appointmentsApi.updateStatus(id, status)
      await fetchAppointments()
      setIsDetailsModalOpen(false)
    } catch (err) {
      setError('Une erreur est survenue lors de la mise à jour du statut')
    } finally {
      setIsUpdating(false)
    }
  }

  const filteredAppointments =
    selectedStatus === 'all'
      ? appointments
      : appointments.filter((appointment) => appointment.status === selectedStatus)

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary-500" />
          <p className="text-gray-600">Chargement des rendez-vous...</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des rendez-vous</h1>
          <p className="mt-1 text-sm text-gray-500">{appointments.length} rendez-vous au total</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmés</option>
              <option value="cancelled">Annulés</option>
            </select>
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date & Heure
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
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Aucun rendez-vous trouvé
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.firstName} {appointment.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{appointment.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{appointment?.service?.title}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{appointment.date}</div>
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusColors[appointment.status]
                        }`}
                      >
                        {statusLabels[appointment.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment)
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
      {isDetailsModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6">
            <div className="mb-6 flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900">Détails du rendez-vous</h2>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  statusColors[selectedAppointment.status]
                }`}
              >
                {statusLabels[selectedAppointment.status]}
              </span>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-6">
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">Informations client</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">
                      {selectedAppointment.firstName} {selectedAppointment.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.phone}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">Détails du rendez-vous</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.service?.title}</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedAppointment.message && (
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-500">Message</h3>
                <p className="rounded-lg bg-gray-50 p-4 text-gray-900">
                  {selectedAppointment.message}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between border-t pt-6">
              <div className="flex gap-2">
                {selectedAppointment.status === 'pending' && (
                  <>
                    <Button
                      variant="primary"
                      size="md"
                      icon={CheckCircle}
                      onClick={() => handleStatusUpdate(selectedAppointment.id, 'confirmed')}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Confirmation...' : 'Confirmer'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      icon={XCircle}
                      onClick={() => handleStatusUpdate(selectedAppointment.id, 'cancelled')}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Annulation...' : 'Annuler'}
                    </Button>
                  </>
                )}
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
