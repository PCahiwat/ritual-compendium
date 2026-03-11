import React from 'react';
import { getFlag, simplifyCountry } from '../utils/helpers';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'classic', label: 'Classic' },
  { value: 'internet-era', label: 'Internet-Era' },
  { value: 'modern-viral', label: 'Modern Viral' },
];

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A→Z' },
  { value: 'name-desc', label: 'Name Z→A' },
  { value: 'danger-asc', label: 'Danger ↑' },
  { value: 'danger-desc', label: 'Danger ↓' },
  { value: 'year-asc', label: 'Oldest First' },
  { value: 'year-desc', label: 'Newest First' },
];

export default function FilterBar({
  activeCategory,
  onCategoryChange,
  countryFilter,
  onCountryChange,
  sortMode,
  onSortChange,
  countries,
  viewMode,
  onViewChange,
}) {
  return (
    <>
      <div className="filter-tabs" role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            className={`filter-tab${activeCategory === cat.value ? ' active' : ''}`}
            role="tab"
            aria-selected={activeCategory === cat.value}
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="filter-row">
        <select
          className="filter-select"
          value={countryFilter}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <option value="all">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {getFlag(c)} {c}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={sortMode}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="view-toggle">
          <button
            className={`view-toggle-btn${viewMode === 'grid' ? ' active' : ''}`}
            onClick={() => onViewChange('grid')}
            aria-label="Grid view"
            title="Grid view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button
            className={`view-toggle-btn${viewMode === 'list' ? ' active' : ''}`}
            onClick={() => onViewChange('list')}
            aria-label="List view"
            title="List view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
