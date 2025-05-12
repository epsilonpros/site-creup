import api from './axios';
import type { Testimonial } from '../types';

export const testimonialsApi = {
  getAll: async () => {
    const response = await api.get('/testimonials');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/testimonials/${id}`);
    return response.data;
  },

  create: async (testimonial: Omit<Testimonial, 'id'>) => {
    const response = await api.post('/testimonials', testimonial);
    return response.data;
  },

  update: async (id: string, testimonial: Partial<Testimonial>) => {
    const response = await api.put(`/testimonials/${id}`, testimonial);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/testimonials/${id}`);
  }
};