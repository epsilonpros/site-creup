import api from './axios';

export interface HydraCollection<T> {
  '@context'?: string;
  '@id': string;
  '@type': string;
  'member': T[];
  'totalItems'?: number;
  'view'?: {
    '@id': string;
    '@type': string;
    'first'?: string;
    'last'?: string;
    'next'?: string;
    'previous'?: string;
  };
}
export const genericApi = {
  get: async <T>(endpoint: string): Promise<HydraCollection<T>> => {
    const response = await api.get<HydraCollection<T>>(endpoint);
    return response.data;
  },

  post: async <T>(endpoint: string, data: T): Promise<HydraCollection<T>> => {
    const response = await api.post<HydraCollection<T>>(endpoint, data);
    return response.data;
  },

  put: async <T>(endpoint: string, data: T): Promise<HydraCollection<T>> => {
    const response = await api.put<HydraCollection<T>>(endpoint, data);
    return response.data;
  },

  delete: async (endpoint: string): Promise<void> => {
    await api.delete(endpoint);
  },

  patch: async <T>(endpoint: string, data: T): Promise<HydraCollection<T>> => {
    const response = await api.patch<HydraCollection<T>>(endpoint, data);
    return response.data;
  }
};