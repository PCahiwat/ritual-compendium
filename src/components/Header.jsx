import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Header({ readCount, totalCount }) {
  const { user, isLoggedIn, setShowLogin, logout } = useAuth();

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
          {isLoggedIn ? (
            <button className="auth-button logged-in" onClick={logout} title="Sign out">
              {user?.picture ? (
                <img src={user.picture} alt="" className="auth-avatar" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
              {user?.displayName || user?.name || 'Account'}
            </button>
          ) : (
            <button className="auth-button" onClick={() => setShowLogin(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
