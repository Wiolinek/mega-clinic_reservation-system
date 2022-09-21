import { useEffect, useState } from 'react';


interface Request {
  method: string,
  credentials?: string | null | any,
  headers: {
    'Content-Type': string
  },
  body?: object | null | any,
}


const useFetch = (url: string, req?: object, param1?: string | null | object, param2?: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request: Request = req ?
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( req ),
    }
    : 
    {
      method: 'GET',
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