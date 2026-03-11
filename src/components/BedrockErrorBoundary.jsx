import React from 'react';
import { AuthContext } from '../contexts/AuthContext';

// If BedrockPassportProvider crashes, fall back to a non-auth context
// so the Sign In button still appears (it will show "not configured" message)
export default class BedrockErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn('[Bedrock] Provider error, falling back to non-auth mode:', error?.message || error);
  }

  render() {
    if (this.state.hasError) {
      // Provide a basic auth context so the app still works
      const fallbackValue = {
        user: null,
        isLoggedIn: false,
        isLoading: false,
        showLogin: false,
        setShowLogin: () => {},
        logout: () => {},
      };
      return (
        <AuthContext.Provider value={fallbackValue}>
          {this.props.children}
        </AuthContext.Provider>
      );
    }
    return this.props.children;
  }
}
