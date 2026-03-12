import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ readCount, totalCount }) {
  return (
    <header className="app-header">
      <div className="container header-inner">
        <Link to="/" className="app-logo">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2L37 35H3L20 2Z" stroke="#c41e3a" strokeWidth="2" fill="none" />
            <circle cx="20" cy="20" r="6" stroke="#e8e0d4" strokeWidth="1.5" fill="none" />
            <circle cx="20" cy="20" r="2.5" fill="#c41e3a" />
            <line x1="20" y1="14" x2="20" y2="8" stroke="#e8e0d4" strokeWidth="1" />
            <line x1="20" y1="26" x2="20" y2="30" stroke="#e8e0d4" strokeWidth="1" />
            <line x1="14" y1="20" x2="10" y2="20" stroke="#e8e0d4" strokeWidth="1" />
            <line x1="26" y1="20" x2="30" y2="20" stroke="#e8e0d4" strokeWidth="1" />
          </svg>
          <span className="app-logo-text">
            Rules of the <span>Dark</span>
          </span>
        </Link>
        <div className="header-right">
          <span className="reading-counter">
            <strong>{readCount}</strong> / {totalCount} read
          </span>
        </div>
      </div>
    </header>
  );
}
