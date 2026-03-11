import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { hasBedrock } from '../providers/AuthProvider';

export default function LoginModal() {
  const { showLogin, setShowLogin } = useAuth();
  const [LoginPanel, setLoginPanel] = useState(null);

  useEffect(() => {
    if (showLogin && hasBedrock && !LoginPanel) {
      import('@bedrock_org/passport').then((mod) => {
        setLoginPanel(() => mod.LoginPanel);
      });
      import('@bedrock_org/passport/dist/style.css');
    }
  }, [showLogin, LoginPanel]);

  if (!showLogin) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowLogin(false);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal">
        <button className="login-modal-close" onClick={() => setShowLogin(false)}>
          ✕
        </button>
        <h3 className="login-modal-title">Sign In</h3>
        <p className="login-modal-subtitle">
          {hasBedrock
            ? 'Sign in to sync your favorites across devices'
            : 'Authentication is not yet configured. Add your Bedrock Passport keys to .env to enable sign-in.'}
        </p>
        {hasBedrock && LoginPanel && (
          <div className="login-panel-wrapper">
            <LoginPanel
              title=""
              logo=""
              logoAlt=""
              showConnectWallet={false}
              features={{
                enableWalletConnect: false,
                enableAppleLogin: true,
                enableGoogleLogin: true,
                enableEmailLogin: true,
              }}
              panelClass="p-0 rounded-2xl max-w-[420px]"
              buttonClass=""
              separatorText="OR"
              separatorTextClass="bg-[#141414] text-gray-500"
              separatorClass="bg-[#141414]"
              linkRowClass="justify-center"
              headerClass="justify-center"
            />
          </div>
        )}
      </div>
    </div>
  );
}
