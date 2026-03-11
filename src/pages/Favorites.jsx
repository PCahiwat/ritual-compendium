import React from 'react';
import RitualCard from '../components/RitualCard';
import { useAuth } from '../hooks/useAuth';

export default function Favorites({ rituals, favorites, isFavorite, isRead, onToggleFavorite }) {
  const { isLoggedIn, setShowLogin } = useAuth();
  const favRituals = rituals.filter((r) => favorites.includes(r.id));

  return (
    <div className="container" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-16)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          marginBottom: 'var(--space-2)',
        }}>
          Favorites
        </h2>
        {!isLoggedIn && (
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            <button
              onClick={() => setShowLogin(true)}
              style={{
                color: 'var(--color-secondary)',
                textDecoration: 'underline',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                font: 'inherit',
                padding: 0,
              }}
            >
              Sign in
            </button>{' '}
            to sync favorites across devices.
          </p>
        )}
      </div>

      {favRituals.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">♡</div>
          <h3 className="empty-state-title">No favorites yet</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            Bookmark rituals to save them here.
          </p>
        </div>
      ) : (
        <div className="rituals-grid">
          {favRituals.map((ritual) => (
            <RitualCard
              key={ritual.id}
              ritual={ritual}
              isFavorite={isFavorite(ritual.id)}
              isRead={isRead(ritual.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
