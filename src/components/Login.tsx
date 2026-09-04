import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { signInWithGoogle } from '../lib/authService';
import { isOnlineMode } from '../lib/firebase';

interface LoginProps {
  onContinueAsGuest?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onContinueAsGuest }) => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err?.message || 'Sign-in failed. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'var(--bg-canvas)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #D75A30, #E5A83B)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          marginBottom: 24,
        }}
      >
        <Sparkles size={26} />
      </div>

      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, marginBottom: 10 }}>
        Welcome to AuraFit
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 360, marginBottom: 32 }}>
        Sign in to sync your practice across devices and see your friends on the
        leaderboard in real time.
      </p>

      {!isOnlineMode && (
        <div
          style={{
            fontSize: 13,
            color: 'var(--accent-terracotta)',
            backgroundColor: 'var(--accent-terracotta-soft)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: 20,
            maxWidth: 380,
          }}
        >
          Firebase isn't configured yet. Add your project keys to a <code>.env</code> file
          (see <code>.env.example</code>) to enable sign-in.
        </div>
      )}

      {error && (
        <div style={{ fontSize: 13, color: 'var(--accent-terracotta)', marginBottom: 16 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <button
          onClick={handleSignIn}
          disabled={!isOnlineMode || isSigningIn}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 28px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isOnlineMode ? 'var(--accent-terracotta)' : 'var(--bg-card-subtle)',
            color: isOnlineMode ? '#FFFFFF' : 'var(--text-muted)',
            fontSize: 15,
            fontWeight: 600,
            cursor: isOnlineMode ? 'pointer' : 'not-allowed',
            opacity: isSigningIn ? 0.7 : 1,
            border: 'none',
          }}
        >
          {isSigningIn ? 'Signing in…' : 'Continue with Google'}
        </button>

        {onContinueAsGuest && (
          <button
            onClick={onContinueAsGuest}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              padding: '6px 12px',
              textDecoration: 'underline',
            }}
          >
            Or explore as Guest (offline mode)
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
