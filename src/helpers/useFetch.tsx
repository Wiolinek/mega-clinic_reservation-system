import { useEffect, useState } from 'react';
import { RequestType } from 'types/request'


const useFetch = (url: string, type?: string, req?: object, param1?: string | null | object, param2?: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = (type?: string, req?: object) => {

    switch(type) {

      case 'POST':
        return {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( req ),
        };
      case 'GET':
        return {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        };
      default: return {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    }
  }

  const executeFetch = async (url: string, type?: string, req?: object) => {
    const reqObj: RequestType = request(type, req)
    
    setLoading(true);
      return fetch(url, reqObj)
      .then(res => res.json())
      .then(res => {
        setData(res); 
        return res;
      })
      .catch(err => {
        setError(err.message)
        return err;
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    executeFetch(url, type, req)
  }, [url, param1, param2])

  return { data, loading, error, executeFetch };
}

export default useFetch;