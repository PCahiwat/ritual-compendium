import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryBadge from '../components/CategoryBadge';
import DangerSkulls from '../components/DangerSkulls';
import { getFlag, DANGER_LABELS } from '../utils/helpers';

export default function RitualDetail({ rituals, isFavorite, onToggleFavorite, onMarkRead }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const ritual = rituals.find((r) => r.id === id);

  useEffect(() => {
    if (ritual) {
      onMarkRead(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, ritual, onMarkRead]);

  if (!ritual) {
    return (
      <div className="ritual-detail">
        <div className="empty-state">
          <div className="empty-state-icon">👻</div>
          <h3 className="empty-state-title">Ritual not found</h3>
        </div>
      </div>
    );
  }

  const bookmarked = isFavorite(id);
  const flag = getFlag(ritual.origin.country);

  // Parse rules into numbered steps + extra content
  const rulesLines = ritual.rules.split('\n').filter((l) => l.trim());
  const numberedSteps = [];
  const extraContent = [];
  let inExtra = false;

  rulesLines.forEach((line) => {
    const stepMatch = line.match(/^(\d+)\.\s*(.*)/);
    if (stepMatch && !inExtra) {
      numberedSteps.push({ num: stepMatch[1], text: stepMatch[2] });
    } else {
      inExtra = true;
      extraContent.push(line);
    }
  });

  return (
    <div className="ritual-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="detail-header">
        <h1 className="detail-title">{ritual.name}</h1>
        {ritual.altNames.length > 0 && (
          <p className="detail-alt-names">Also known as: {ritual.altNames.join(', ')}</p>
        )}
        <div className="detail-meta">
          <CategoryBadge category={ritual.category} />
          <div className="danger-large">
            <DangerSkulls level={ritual.dangerLevel} size="large" />
            <span className={`danger-label level-${ritual.dangerLevel}`}>
              {DANGER_LABELS[ritual.dangerLevel]}
            </span>
          </div>
          <button
            className={`detail-bookmark-btn${bookmarked ? ' bookmarked' : ''}`}
            onClick={() => onToggleFavorite(id)}
          >
            <svg
              viewBox="0 0 24 24"
              fill={bookmarked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>

      {/* Origin & History */}
      <div className="detail-section">
        <h2 className="section-heading"><span className="icon">📜</span> Origin &amp; History</h2>
        <div className="origin-info">
          <div className="origin-row">
            <span className="origin-label">Country</span>
            <span className="origin-value">{flag} {ritual.origin.country}</span>
          </div>
          <div className="origin-row">
            <span className="origin-label">Year</span>
            <span className="origin-value">{ritual.origin.year}</span>
          </div>
          <div className="origin-row">
            <span className="origin-label">First Known</span>
            <span className="origin-value">{ritual.origin.firstPosting}</span>
          </div>
          <div className="origin-row">
            <span className="origin-label">Spread</span>
            <span className="origin-value">{ritual.origin.spreadHistory}</span>
          </div>
        </div>
      </div>

      {/* Materials */}
      <div className="detail-section">
        <h2 className="section-heading"><span className="icon">🕯️</span> What You Need</h2>
        <ul className="materials-list">
          {ritual.materials.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>

      {/* Rules */}
      <div className="detail-section">
        <h2 className="section-heading"><span className="icon">📖</span> The Rules</h2>
        <div className="rules-content">
          {numberedSteps.map((s, i) => (
            <div className="rules-step" key={i}>
              <span className="step-number">{s.num}</span>
              <span className="step-text">{s.text}</span>
            </div>
          ))}
          {extraContent.length > 0 && (
            <div style={{
              marginTop: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
            }}>
              {extraContent.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < extraContent.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Warnings */}
      <div className="detail-section">
        <h2 className="section-heading"><span className="icon">⚠️</span> Warnings</h2>
        <div className="warnings-box">
          <p className="warnings-text">{ritual.warnings}</p>
        </div>
      </div>

      {/* Accounts */}
      <div className="detail-section">
        <h2 className="section-heading"><span className="icon">👁️</span> Accounts</h2>
        <div className="accounts-list">
          {ritual.accounts.map((a, i) => (
            <div className="account-card" key={i}>
              <blockquote>&ldquo;{a.summary}&rdquo;</blockquote>
              <div className="account-meta">
                <span className="platform-badge">{a.platform}</span>
                <span>{a.source}</span>
                <span>&bull;</span>
                <span>{a.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Notes */}
      <div className="detail-section">
        <h2 className="section-heading"><span className="icon">🏛️</span> Cultural Notes</h2>
        <div className="cultural-notes-content">{ritual.culturalNotes}</div>
      </div>

      {/* Sources */}
      <div className="detail-section">
        <h2 className="section-heading"><span className="icon">🔗</span> Sources</h2>
        <ul className="sources-list">
          {ritual.sources.map((s, i) => (
            <li key={i}>
              <a href={s} target="_blank" rel="noopener noreferrer">{s}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
