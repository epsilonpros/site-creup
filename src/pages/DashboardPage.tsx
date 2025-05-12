import React from 'react'
import {
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

const navigation = [
  { name: "Vue d'ensemble", href: '/dashboard', icon: BarChart3 },
  { name: 'Projets', href: '/dashboard/projects', icon: Briefcase },
  { name: 'Services', href: '/dashboard/services', icon: Settings },
  { name: 'Partenaires/Clients', href: '/dashboard/partners', icon: Building2 },
  { name: 'Rendez-vous', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Contacts', href: '/dashboard/contacts', icon: MessageSquare },
  { name: 'Équipe', href: '/dashboard/team', icon: Users },
]

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">CreUp Admin</h1>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-3 px-6 py-3 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}
