import { useState, useEffect } from 'react';

const baseUrl = process.env.REACT_APP_BASE_URL;

const API_ROOT = `${baseUrl}/`;

export function useApi({ path } = { path: '' }) {
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch(`${API_ROOT}/${path}`)
      .then(res => res.text())
      .then(res => setResponse(res));
  }, []);

  return {
    response
  };
}
