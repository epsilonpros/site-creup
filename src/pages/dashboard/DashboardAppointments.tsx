import React, { useState } from 'react';
import { Calendar, Clock, MessageSquare, User, Building2, Phone, Mail, CheckCircle, XCircle, Filter, ChevronDown } from 'lucide-react';
import { Button } from '../../components/Button';

interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const appointments: Appointment[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '+243 999 888 777',
    company: 'TechVision',
    service: 'Stratégie digitale',
    date: '2024-03-20',
    time: '14:00',
    message: 'Discussion sur la refonte de notre stratégie digitale',
    status: 'confirmed'
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    phone: '+243 999 777 666',
    company: 'EcoSolutions',
    service: 'Design & Création',
    date: '2024-03-21',
    time: '10:00',
    status: 'pending'
  },
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@example.com',
    phone: '+243 999 666 555',
    company: 'SportLife',
    service: 'Communication digitale',
    date: '2024-03-22',
    time: '15:00',
    message: 'Besoin d\'aide pour notre présence sur les réseaux sociaux',
    status: 'cancelled'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels = {
  pending: 'En attente',
  confirmed: 'Confirmé',
  cancelled: 'Annulé'
};

export function DashboardAppointments() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = selectedStatus === 'all'
    ? appointments
    : appointments.filter(appointment => appointment.status === selectedStatus);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des rendez-vous</h1>
        
        {/* Filter */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmés</option>
              <option value="cancelled">Annulés</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Heure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.date}</div>
                    <div className="text-sm text-gray-500">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
                      {statusLabels[appointment.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setIsDetailsModalOpen(true);
                      }}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Détails du rendez-vous
              </h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedAppointment.status]}`}>
                {statusLabels[selectedAppointment.status]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Informations client</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">
                      {selectedAppointment.firstName} {selectedAppointment.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.phone}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Détails du rendez-vous</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{selectedAppointment.service}</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedAppointment.message && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
                <p className="text-gray-900 bg-gray-50 rounded-lg p-4">
                  {selectedAppointment.message}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex gap-2">
                {selectedAppointment.status === 'pending' && (
                  <>
                    <Button
                      variant="primary"
                      size="md"
                      icon={CheckCircle}
                      onClick={() => {
                        // Handle confirmation
                        setIsDetailsModalOpen(false);
                      }}
                    >
                      Confirmer
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      icon={XCircle}
                      onClick={() => {
                        // Handle cancellation
                        setIsDetailsModalOpen(false);
                      }}
                    >
                      Annuler
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="md"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}