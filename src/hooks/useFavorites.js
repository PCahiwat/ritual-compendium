import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useFavorites() {
  const { user, isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load favorites from Supabase when user logs in
  useEffect(() => {
    if (isLoggedIn && user?.id) {
      loadFavorites(user.id);
    } else {
      // When logged out, keep session-only favorites in state
      // (they'll be empty on fresh load, which is correct)
    }
  }, [isLoggedIn, user?.id]);

  const loadFavorites = async (userId) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('ritual_id')
        .eq('user_id', userId);

      if (error) throw error;
      setFavorites(data.map((f) => f.ritual_id));
    } catch (err) {
      console.error('Failed to load favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = useCallback(
    async (ritualId) => {
      const isFav = favorites.includes(ritualId);

      // Optimistic update
      if (isFav) {
        setFavorites((prev) => prev.filter((id) => id !== ritualId));
      } else {
        setFavorites((prev) => [...prev, ritualId]);
      }

      // If logged in, sync with Supabase
      if (isLoggedIn && user?.id) {
        try {
          if (isFav) {
            const { error } = await supabase
              .from('favorites')
              .delete()
              .eq('user_id', user.id)
              .eq('ritual_id', ritualId);
            if (error) throw error;
          } else {
            const { error } = await supabase
              .from('favorites')
              .insert({ user_id: user.id, ritual_id: ritualId });
            if (error) throw error;
          }
        } catch (err) {
          console.error('Failed to sync favorite:', err);
          // Revert optimistic update on error
          if (isFav) {
            setFavorites((prev) => [...prev, ritualId]);
          } else {
            setFavorites((prev) => prev.filter((id) => id !== ritualId));
          }
        }
      }
    },
    [favorites, isLoggedIn, user?.id]
  );

  const isFavorite = useCallback(
    (ritualId) => favorites.includes(ritualId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, loading };
}
