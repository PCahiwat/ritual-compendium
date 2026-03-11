import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LoginModal from './components/LoginModal';
import Browse from './pages/Browse';
import Favorites from './pages/Favorites';
import Stats from './pages/Stats';
import RitualDetail from './pages/RitualDetail';
import AuthCallback from './pages/AuthCallback';
import { useRituals } from './hooks/useRituals';
import { useFavorites } from './hooks/useFavorites';
import { useReadProgress } from './hooks/useReadProgress';

export default function App() {
  const { rituals, loading, error } = useRituals();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { readCount, markAsRead, isRead } = useReadProgress();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
      }}>
        Loading rituals...
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="empty-state-icon">⚠️</div>
        <h3 className="empty-state-title">Failed to load rituals</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header readCount={readCount} totalCount={rituals.length} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Browse
                rituals={rituals}
                isFavorite={isFavorite}
                isRead={isRead}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                rituals={rituals}
                favorites={favorites}
                isFavorite={isFavorite}
                isRead={isRead}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/stats"
            element={
              <Stats
                rituals={rituals}
                readCount={readCount}
                favoritesCount={favorites.length}
              />
            }
          />
          <Route
            path="/ritual/:id"
            element={
              <RitualDetail
                rituals={rituals}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onMarkRead={markAsRead}
              />
            }
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </main>
      <BottomNav />
      <LoginModal />
    </>
  );
}
