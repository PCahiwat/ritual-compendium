import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Check if Bedrock is configured (not placeholder values)
export const hasBedrock =
  typeof import.meta.env.VITE_TENANT_ID === 'string' &&
  import.meta.env.VITE_TENANT_ID !== 'YOUR_TENANT_ID' &&
  import.meta.env.VITE_TENANT_ID !== '' &&
  typeof import.meta.env.VITE_SUBSCRIPTION_KEY === 'string' &&
  import.meta.env.VITE_SUBSCRIPTION_KEY !== 'YOUR_SUBSCRIPTION_KEY' &&
  import.meta.env.VITE_SUBSCRIPTION_KEY !== '';

export default function AuthProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);

  // Without Bedrock configured, provide a simple non-auth context
  const value = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    showLogin,
    setShowLogin,
    logout: () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
