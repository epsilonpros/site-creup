import { useState, useEffect } from 'react';
import { genericApi } from '../api';

export function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await genericApi.get<T>(endpoint);
        setData(response);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
}