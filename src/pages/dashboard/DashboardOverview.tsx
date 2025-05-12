import React from 'react';
import { Users, Briefcase, MessageSquare, Calendar } from 'lucide-react';

const stats = [
  { name: 'Projets actifs', value: '12', icon: Briefcase, change: '+2', changeType: 'increase' },
  { name: 'Rendez-vous', value: '24', icon: Calendar, change: '+5', changeType: 'increase' },
  { name: 'Témoignages', value: '38', icon: MessageSquare, change: '+3', changeType: 'increase' },
  { name: 'Membres', value: '15', icon: Users, change: '0', changeType: 'neutral' },
];

const recentAppointments = [
  { id: 1, name: 'Jean Dupont', date: '2024-03-20', time: '14:00', service: 'Stratégie digitale' },
  { id: 2, name: 'Marie Martin', date: '2024-03-21', time: '10:00', service: 'Design & Création' },
  { id: 3, name: 'Pierre Durand', date: '2024-03-22', time: '15:00', service: 'Communication digitale' },
];

export function DashboardOverview() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Vue d'ensemble</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-gray-600 text-sm ml-2">vs mois dernier</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Rendez-vous récents</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Heure</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Service</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">{appointment.name}</td>
                  <td className="py-3 px-4">{appointment.date}</td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4">{appointment.service}</td>
                  <td className="py-3 px-4">
                    <button className="text-primary-600 hover:text-primary-700">
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}