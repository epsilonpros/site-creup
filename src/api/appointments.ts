import api from './axios';

export interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export const appointmentsApi = {
  getAll: async () => {
    const response = await api.get('/api/appointments');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/appointments/${id}`);
    return response.data;
  },

  create: async (appointment: Omit<Appointment, 'id' | 'status'>) => {
    const response = await api.post('/api/appointments', appointment);
    return response.data;
  },

  update: async (id: string, appointment: Partial<Appointment>) => {
    const response = await api.put(`/api/appointments/${id}`, appointment);
    return response.data;
  },

  updateStatus: async (id: string, status: Appointment['status']) => {
    const response = await api.patch(`/api/appointments/${id}/status`, { status });
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/api/appointments/${id}`);
  }
};