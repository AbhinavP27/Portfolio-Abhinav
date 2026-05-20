import { useEffect, useState } from 'react';
import { apiClient } from '../services/api';

export function useCollection(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/${endpoint}/`);
      setItems(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { items, setItems, loading, error, refetch: fetchData };
}
