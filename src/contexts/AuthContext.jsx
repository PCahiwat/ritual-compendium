import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  showLogin: false,
  setShowLogin: () => {},
  logout: () => {},
});
