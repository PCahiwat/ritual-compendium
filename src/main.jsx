import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import AuthProvider, { hasBedrock } from './providers/AuthProvider';
import { safeLocalStorage } from './utils/storage';
import App from './App';
import './index.css';

// Intercept /auth/callback BEFORE React mounts.
// Bedrock redirects here with ?token=xxx&refreshToken=xxx as real URL params.
// We store them and redirect to the hash-based home route.
if (window.location.pathname === '/auth/callback') {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const refreshToken = params.get('refreshToken');
  if (token && refreshToken) {
    safeLocalStorage.setItem('accessToken', token);
    safeLocalStorage.setItem('refreshToken', refreshToken);
    safeLocalStorage.setItem(
      'passport-token',
      JSON.stringify({ state: { accessToken: token, refreshToken } })
    );
    // Redirect to hash-based home — Bedrock provider will pick up tokens from storage
    window.location.replace('/#/');
  }
}

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

async function mount() {
  let AuthWrapper = AuthProvider;

  // Only load Bedrock providers when keys are configured
  if (hasBedrock) {
    try {
      const { BedrockPassportProvider } = await import('@bedrock_org/passport');
      const { default: BedrockAuthProvider } = await import('./providers/BedrockAuthProvider');
      const { default: BedrockErrorBoundary } = await import('./components/BedrockErrorBoundary');
      const defaultChainId = Number(import.meta.env.VITE_DEFAULT_CHAIN_ID ?? 1);

      const walletConnectId = import.meta.env.VITE_WALLET_CONNECT_ID || undefined;

      function BedrockWrapper({ children }) {
        return (
          <BedrockErrorBoundary>
            <BedrockPassportProvider
              baseUrl={import.meta.env.VITE_BASE_URL}
              authCallbackUrl={import.meta.env.VITE_AUTH_CALLBACK_URL}
              tenantId={import.meta.env.VITE_TENANT_ID}
              subscriptionKey={import.meta.env.VITE_SUBSCRIPTION_KEY}
              {...(walletConnectId ? { walletConnectId } : {})}
              defaultChainId={defaultChainId}
              isBeta={import.meta.env.VITE_PASSPORT_BETA === 'true'}
            >
              <BedrockAuthProvider>
                {children}
              </BedrockAuthProvider>
            </BedrockPassportProvider>
          </BedrockErrorBoundary>
        );
      }

      AuthWrapper = BedrockWrapper;
    } catch (err) {
      console.warn('[Bedrock] Failed to load providers:', err);
    }
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AuthWrapper>
            <HashRouter>
              <App />
            </HashRouter>
          </AuthWrapper>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
}

mount();
