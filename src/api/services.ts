import api from './axios';
import type { Service } from '../types';

export const servicesApi = {
  getAll: async () => {
    const response = await api.get('/api/services');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  },

  create: async (service: Partial<Service>) => {
    const response = await api.post('/api/services', service);
    return response.data;
  },

  update: async (id: string, service: Partial<Service>) => {
    const response = await api.put(`/api/services/${id}`, service);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/api/services/${id}`);
  }
};