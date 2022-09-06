import { useEffect, useState } from 'react';

const useFetch = (url: string, req?: object, param1?: any, param2?: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = req || {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    };

  useEffect(() => {
    setLoading(true);
    fetch(url, request)
    .then(res => res.json())
    .then(res => setData(res))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
  }, [url, param1, param2]);

  return { data, loading, error };
}

export default useFetch;