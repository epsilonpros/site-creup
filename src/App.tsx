import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Layout } from './components/Layout'
import { NotFoundPage } from './pages/ErrorPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { PrivateRoute } from './components/PrivateRoute'
import { public_navigation, private_navigation } from './routers'

function App() {
  const router = createBrowserRouter([
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      ),
      children: private_navigation,
    },
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: public_navigation,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
