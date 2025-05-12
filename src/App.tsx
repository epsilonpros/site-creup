import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { AppointmentPage } from './pages/AppointmentPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { DashboardOverview } from './pages/dashboard/DashboardOverview'
import { DashboardProjects } from './pages/dashboard/DashboardProjects'
import { DashboardServices } from './pages/dashboard/DashboardServices'
import { DashboardTeam } from './pages/dashboard/DashboardTeam'
import { DashboardPartners } from './pages/dashboard/DashboardPartners'
import { DashboardAppointments } from './pages/dashboard/DashboardAppointments'
import { PrivateRoute } from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <ServicesPage />
            </Layout>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Layout>
              <PortfolioPage />
            </Layout>
          }
        />
        <Route
          path="/portfolio/:id"
          element={
            <Layout>
              <ProjectDetailPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/appointment"
          element={
            <Layout>
              <AppointmentPage />
            </Layout>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="projects" element={<DashboardProjects />} />
          <Route path="services" element={<DashboardServices />} />
          <Route path="team" element={<DashboardTeam />} />
          <Route path="partners" element={<DashboardPartners />} />
          <Route path="appointments" element={<DashboardAppointments />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
