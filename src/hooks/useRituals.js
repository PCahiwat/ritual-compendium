import { useState, useEffect } from 'react';

export function useRituals() {
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('./data/rituals.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load rituals');
        return res.json();
      })
      .then((data) => {
        setRituals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { rituals, loading, error };
}
