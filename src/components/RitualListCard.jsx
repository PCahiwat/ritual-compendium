import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';
import DangerSkulls from './DangerSkulls';
import { getFlag, simplifyCountry } from '../utils/helpers';

export default function RitualListCard({ ritual, isFavorite, isRead, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ritual/${ritual.id}`);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    onToggleFavorite(ritual.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/ritual/${ritual.id}`);
    }
  };

  const flag = getFlag(ritual.origin.country);
  const raw = ritual.culturalNotes || '';
  const summary = raw.length > 120 ? raw.substring(0, 120) + '…' : raw;

  return (
    <article
      className={`ritual-list-card${isRead ? ' is-read' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${ritual.name}`}
    >
      <div className="read-indicator" title="Read" />
      <div className="list-card-main">
        <div className="list-card-top">
          <h3 className="list-card-title">{ritual.name}</h3>
          <div className="list-card-badges">
            <CategoryBadge category={ritual.category} />
            <DangerSkulls level={ritual.dangerLevel} />
          </div>
        </div>
        {summary && <p className="list-card-summary">{summary}</p>}
        <div className="list-card-meta">
          <span className="card-origin">
            {flag} {simplifyCountry(ritual.origin.country)}
          </span>
          <span className="card-players">
            👤 {ritual.players.split('(')[0].trim()}
          </span>
          {ritual.origin.year && (
            <span className="list-card-year">
              📅 {ritual.origin.year}
            </span>
          )}
        </div>
      </div>
      <button
        className={`card-bookmark${isFavorite ? ' bookmarked' : ''}`}
        onClick={handleBookmark}
        aria-label={`${isFavorite ? 'Remove bookmark' : 'Bookmark'} ${ritual.name}`}
        title={isFavorite ? 'Remove bookmark' : 'Bookmark'}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </article>
  );
}
