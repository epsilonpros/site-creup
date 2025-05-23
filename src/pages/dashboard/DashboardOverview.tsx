import React, { useEffect, useState } from 'react'
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  Image,
  LayoutDashboard,
  Loader2,
  MessageSquare,
  Play,
  Printer,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { appointmentsApi, genericApi, projectsApi } from '../../api'
import type { Appointment } from '../../types'

const typeIcons = {
  'Graphique design': Printer,
  'Photo': Image,
  'Vidéo': Play,
  'Projet interne': LayoutDashboard,
}

export function DashboardOverview() {
  const [stats, setStats] = useState({
    projects: 0,
    appointments: 0,
    testimonials: 0,
    team: 0,
  })
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, appointmentsData, statsData] = await Promise.all([
          projectsApi.get(5),
          appointmentsApi.getAll(),
          genericApi.get('/api/stats'),
        ])

        setRecentAppointments(appointmentsData['hydra:member'] || [])
        setStats({
          projects: projectsData['hydra:totalItems'] || 0,
          appointments: appointmentsData['hydra:totalItems'] || 0,
          testimonials: statsData?.testimonials || 0,
          team: statsData?.team || 0,
        })
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des données')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary-500" />
          <p className="text-gray-600">Chargement du dashboard...</p>
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
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Vue d'ensemble</h1>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Projets actifs</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.projects}</p>
            </div>
            <div className="rounded-lg bg-primary-50 p-3">
              <Briefcase className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Link to={`/dashboard/projects`}>
              <Button variant="ghost" size="sm" icon={ArrowRight} className="w-full">
                Voir les projets
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rendez-vous</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.appointments}</p>
            </div>
            <div className="rounded-lg bg-primary-50 p-3">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Link to={`/dashboard/appointments`}>
              <Button variant="ghost" size="sm" icon={ArrowRight} className="w-full">
                Voir les rendez-vous
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clients</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.testimonials}</p>
            </div>
            <div className="rounded-lg bg-primary-50 p-3">
              <MessageSquare className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Link to={`/dashboard/partners`}>
              <Button variant="ghost" size="sm" icon={ArrowRight} className="w-full">
                Voir les clients
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Rendez-vous à venir</h2>
          <Link to="/dashboard/appointments">
            <Button variant="ghost" size="sm">
              Voir tous les rendez-vous
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Client</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Service</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Heure</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments
                .filter((appointment) => appointment.status === 'pending')
                .slice(0, 5)
                .map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                          <Users className="h-4 w-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {appointment.firstName} {appointment.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{appointment.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-900">{appointment?.service?.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{appointment.date}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{appointment.time}</span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
