import api from './axios';
import type { CaseStudy } from '../types';

export const projectsApi = {
  get: async (limit: number) => {
    const response = await api.get('/api/projects?limit=' + limit);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/api/projects');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/projects/${id}`);
    return response.data;
  },

  create: async (project: Partial<CaseStudy>) => {
    const response = await api.post('/api/projects', project);
    return response.data;
  },

  update: async (id: string, project: Partial<CaseStudy>) => {
    const response = await api.put(`/api/projects/${id}`, project);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/api/projects/${id}`);
  }
};