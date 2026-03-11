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
      </div>
    </>
  );
}
