import { useState, useCallback } from 'react';

export function useReadProgress() {
  const [readRituals, setReadRituals] = useState([]);

  const markAsRead = useCallback((id) => {
    setReadRituals((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const isRead = useCallback(
    (id) => readRituals.includes(id),
    [readRituals]
  );

  return { readRituals, markAsRead, isRead, readCount: readRituals.length };
}
