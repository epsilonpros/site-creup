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
import { Logo } from '../components/Logo'

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
  const [isActive, setIsActive] = React.useState(location.pathname)

  const active = (path: string) => {
    setIsActive(path)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-52 bg-gray-900 text-white">
        <div className="flex justify-center p-6">
          <Logo className={`h-16 w-auto`} color="light" />
        </div>
        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => {
                  active(item.href)
                }}
                className={`flex items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-800 hover:text-white ${isActive === item.href ? 'bg-gray-800 text-white' : 'text-gray-300'}`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-52 p-8">
        <Outlet />
      </main>
    </div>
  )
}
