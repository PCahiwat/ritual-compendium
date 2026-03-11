import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        className="search-input"
        type="text"
        placeholder="Search rituals by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
