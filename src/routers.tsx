import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { AppointmentPage } from './pages/AppointmentPage'
import { DashboardOverview } from './pages/dashboard/DashboardOverview'
import { DashboardProjects } from './pages/dashboard/DashboardProjects'
import { DashboardProjectEdit } from './pages/dashboard/DashboardProjectEdit'
import { DashboardServices } from './pages/dashboard/DashboardServices'
import { DashboardTeam } from './pages/dashboard/DashboardTeam'
import { DashboardPartners } from './pages/dashboard/DashboardPartners'
import { DashboardAppointments } from './pages/dashboard/DashboardAppointments'
import { DashboardContacts } from './pages/dashboard/DashboardContacts'

interface Router {
  element: JSX.Element
  path: string
  children?: Router[]
}

export const public_navigation: Router[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/portfolio',
    element: <PortfolioPage />,
  },
  {
    path: '/portfolio/:id',
    element: <ProjectDetailPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/appointment',
    element: <AppointmentPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
]

export const private_navigation: Router[] = [
  {
    path: '',
    element: <DashboardOverview />,
  },
  {
    path: 'projects',
    element: <DashboardProjects />,
  },
  {
    path: 'projects/:id',
    element: <DashboardProjectEdit />,
  },
  {
    path: 'services',
    element: <DashboardServices />,
  },
  {
    path: 'team',
    element: <DashboardTeam />,
  },
  {
    path: 'partners',
    element: <DashboardPartners />,
  },
  {
    path: 'appointments',
    element: <DashboardAppointments />,
  },
  {
    path: 'contacts',
    element: <DashboardContacts />,
  },
]
