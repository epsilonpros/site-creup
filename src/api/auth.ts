import api from './axios'

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/login', { username: email, password })
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isAuthenticated')
  },

  getCurrentUser: async () => {
    const response = await api.get('/user/me')
    return response.data
  },
}
