import api from './axios'

export interface Partner {
  id: string
  name: string
  logo: string
  kind: string
  description: string
  website?: string
}

export const partnersApi = {
  getAll: async () => {
    const response = await api.get('/api/partners')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/partners/${id}`)
    return response.data
  },

  create: async (partner: Omit<Partner, 'id'>) => {
    const response = await api.post('/api/partners', partner)
    return response.data
  },

  update: async (id: string, partner: Partial<Partner>) => {
    const response = await api.put(`/api/partners/${id}`, partner)
    return response.data
  },

  delete: async (id: string) => {
    await api.delete(`/api/partners/${id}`)
  },
}
