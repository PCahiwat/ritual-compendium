import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import RitualCard from '../components/RitualCard';
import { simplifyCountry, extractYear } from '../utils/helpers';

export default function Browse({ rituals, isFavorite, isRead, onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [sortMode, setSortMode] = useState('name-asc');

  // Derive unique countries
  const countries = useMemo(() => {
    return [...new Set(rituals.map((r) => simplifyCountry(r.origin.country)))].sort();
  }, [rituals]);

  // Filter and sort
  const filtered = useMemo(() => {
    let result = [...rituals];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.altNames.some((n) => n.toLowerCase().includes(q))
      );
    }

    // Category
    if (activeCategory !== 'all') {
      result = result.filter((r) => r.category === activeCategory);
    }

    // Country
    if (countryFilter !== 'all') {
      result = result.filter((r) => simplifyCountry(r.origin.country) === countryFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortMode) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'danger-asc': return a.dangerLevel - b.dangerLevel;
        case 'danger-desc': return b.dangerLevel - a.dangerLevel;
        case 'year-asc': return extractYear(a.origin.year) - extractYear(b.origin.year);
        case 'year-desc': return extractYear(b.origin.year) - extractYear(a.origin.year);
        default: return 0;
      }
    });

    return result;
  }, [rituals, searchQuery, activeCategory, countryFilter, sortMode]);

  return (
    <div className="container">
      <div className="search-filter-bar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          countryFilter={countryFilter}
          onCountryChange={setCountryFilter}
          sortMode={sortMode}
          onSortChange={setSortMode}
          countries={countries}
        />
      </div>

      <div className="results-count">
        {filtered.length} ritual{filtered.length !== 1 ? 's' : ''} found
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔮</div>
          <h3 className="empty-state-title">No rituals found</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="rituals-grid">
          {filtered.map((ritual) => (
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
