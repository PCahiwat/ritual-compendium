import React, { useState, useEffect, useCallback } from 'react';
import { useBedrockPassport } from '@bedrock_org/passport';
import { AuthContext } from '../contexts/AuthContext';

// This provider is only rendered when BedrockPassportProvider wraps the tree
export default function BedrockAuthProvider({ children }) {
  const { isLoggedIn, user: bedrockUser, signOut } = useBedrockPassport();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false);
      setShowLogin(false);
    }
  }, [isLoggedIn]);

  const logout = useCallback(async () => {
    try {
      const accessToken =
        localStorage.getItem('bedrock:accessToken') ||
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('bedrock:accessToken');
      if (accessToken) {
        await fetch('https://api.bedrockpassport.com/api/v1/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
        }).catch(() => {});
      }
    } catch {
      // ignore
    }

    await signOut();

    try {
      localStorage.removeItem('bedrock:accessToken');
      localStorage.removeItem('bedrock:refreshToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('passport-token');
      sessionStorage.removeItem('bedrock:accessToken');
      sessionStorage.removeItem('bedrock:refreshToken');
    } catch {
      // ignore
    }
  }, [signOut]);

  const value = {
    user: isLoggedIn ? bedrockUser : null,
    isLoggedIn: !!isLoggedIn,
    isLoading,
    showLogin,
    setShowLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
