import React, { useEffect } from 'react';
import { useBedrockPassport } from '@bedrock_org/passport';
import { useNavigate } from 'react-router-dom';
import { safeLocalStorage } from '../utils/storage';

export default function AuthCallback() {
  const { loginCallback } = useBedrockPassport();
  const navigate = useNavigate();

  useEffect(() => {
    const login = async (token, refreshToken) => {
      const success = await loginCallback(token, refreshToken);
      if (success) {
        safeLocalStorage.setItem('accessToken', token);
        safeLocalStorage.setItem('refreshToken', refreshToken);
        safeLocalStorage.setItem(
          'passport-token',
          JSON.stringify({ state: { accessToken: token, refreshToken } })
        );
        navigate('/', { replace: true });
      }
    };

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    // Also check hash params for HashRouter
    if (!token) {
      const hashSearch = window.location.hash.split('?')[1];
      if (hashSearch) {
        const hashParams = new URLSearchParams(hashSearch);
        const hToken = hashParams.get('token');
        const hRefreshToken = hashParams.get('refreshToken');
        if (hToken && hRefreshToken) {
          login(hToken, hRefreshToken);
          return;
        }
      }
    }

    if (token && refreshToken) {
      login(token, refreshToken);
    }
  }, [loginCallback, navigate]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'var(--color-text-muted)',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
    }}>
      Signing in...
    </div>
  );
}
