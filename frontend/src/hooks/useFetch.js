import { useCallback, useEffect, useState } from 'react';
import { api } from '../api';

// Minimal data-fetching hook: const { data, loading, error, refetch } = useFetch('/products')
export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(path));
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!path) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    api
      .get(path)
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [path, version]);

  const refetch = useCallback(() => setVersion((v) => v + 1), []);
  return { data, setData, loading, error, refetch };
}
