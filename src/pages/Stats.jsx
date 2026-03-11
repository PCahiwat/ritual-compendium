import React from 'react';
import { DANGER_COLORS } from '../utils/helpers';

function StatBar({ label, count, total, color }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="stat-bar-row">
      <span className="stat-bar-label">{label}</span>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="stat-bar-value">{count}</span>
    </div>
  );
}

export default function Stats({ rituals, readCount, favoritesCount }) {
  const total = rituals.length;
  const pct = total > 0 ? Math.round((readCount / total) * 100) : 0;

  // Category breakdown
  const cats = { classic: 0, 'internet-era': 0, 'modern-viral': 0 };
  rituals.forEach((r) => {
    cats[r.category] = (cats[r.category] || 0) + 1;
  });

  // Danger level distribution
  const dangers = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  rituals.forEach((r) => {
    dangers[r.dangerLevel] = (dangers[r.dangerLevel] || 0) + 1;
  });

  // Progress ring
  const circumference = 2 * Math.PI * 42;
  const dashOffset = circumference - (pct / 100) * circumference;

  const avgDanger = total > 0
    ? (rituals.reduce((s, r) => s + r.dangerLevel, 0) / total).toFixed(1)
    : '0';
  const avgDangerIdx = Math.round(parseFloat(avgDanger));

  return (
    <div className="stats-view">
      <div className="stats-header">
        <h2>Your Progress</h2>
        <p>Track your journey through the compendium</p>
      </div>
      <div className="stats-grid">
        {/* Reading Progress */}
        <div className="stat-card">
          <div className="stat-card-title">Reading Progress</div>
          <div className="progress-ring-container">
            <svg className="progress-ring" width="100" height="100" viewBox="0 0 100 100">
              <circle className="progress-ring-bg" cx="50" cy="50" r="42" />
              <circle
                className="progress-ring-fill"
                cx="50"
                cy="50"
                r="42"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="progress-text">
              <strong>{readCount} / {total}</strong>
              {pct}% complete
            </div>
          </div>
        </div>

        {/* By Category */}
        <div className="stat-card">
          <div className="stat-card-title">By Category</div>
          <StatBar label="Classic" count={cats.classic} total={total} color="#d4a017" />
          <StatBar label="Internet-Era" count={cats['internet-era']} total={total} color="#7099e0" />
          <StatBar label="Modern Viral" count={cats['modern-viral']} total={total} color="#b070d0" />
        </div>

        {/* Danger Distribution */}
        <div className="stat-card">
          <div className="stat-card-title">Danger Distribution</div>
          <StatBar label="Level 1 — Low" count={dangers[1]} total={total} color={DANGER_COLORS[1]} />
          <StatBar label="Level 2 — Moderate" count={dangers[2]} total={total} color={DANGER_COLORS[2]} />
          <StatBar label="Level 3 — High" count={dangers[3]} total={total} color={DANGER_COLORS[3]} />
          <StatBar label="Level 4 — Severe" count={dangers[4]} total={total} color={DANGER_COLORS[4]} />
          <StatBar label="Level 5 — Extreme" count={dangers[5]} total={total} color={DANGER_COLORS[5]} />
        </div>

        {/* Quick Stats */}
        <div className="stat-card">
          <div className="stat-card-title">Quick Stats</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Total Rituals</div>
              <div className="stat-big-number">{total}</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Bookmarked</div>
              <div className="stat-big-number" style={{ color: 'var(--color-secondary)' }}>{favoritesCount}</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Avg Danger Level</div>
              <div className="stat-big-number" style={{ color: DANGER_COLORS[avgDangerIdx] || 'var(--color-primary)' }}>
                {avgDanger}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
