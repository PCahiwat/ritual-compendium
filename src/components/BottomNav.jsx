import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NAV_ITEMS = [
  {
    to: '/',
    label: 'Browse',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    to: '/favorites',
    label: 'Favorites',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    to: '/stats',
    label: 'Stats',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const USER_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function BottomNav() {
  const location = useLocation();
  const { user, isLoggedIn, setShowLogin, logout } = useAuth();

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname.startsWith(to);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      setShowLogin(true);
    }
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`nav-item${isActive(item.to) ? ' active' : ''}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        <button
          className={`nav-item nav-profile${isLoggedIn ? ' logged-in' : ''}`}
          onClick={handleProfileClick}
          aria-label={isLoggedIn ? 'Sign out' : 'Sign in'}
        >
          {isLoggedIn && user?.picture ? (
            <img src={user.picture} alt="" className="nav-profile-avatar" />
          ) : (
            USER_ICON
          )}
          {isLoggedIn ? 'Profile' : 'Sign In'}
        </button>
      </div>
    </nav>
  );
}
