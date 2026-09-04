import React, { useState } from 'react';
import { Navigation, TabId } from './components/Navigation';
import { Today } from './components/Today';
import { Trainer } from './components/Trainer';
import { Tools } from './components/Tools';
import { Wellness } from './components/Wellness';
import { BrainFitness } from './components/BrainFitness';
import { Compete } from './components/Compete';
import { AskAura } from './components/AskAura';
import { Login } from './components/Login';
import { useTodayData } from './hooks/useTodayData';
import { useAuth } from './hooks/useAuth';
import { signOutUser } from './lib/authService';
import { Sparkles, X, LogOut } from 'lucide-react';
import './App.css';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabId>('today');
  const [isAskAuraOpen, setIsAskAuraOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user, isLoading: isAuthLoading, isOnlineMode } = useAuth();

  const uid = user?.uid ?? (isOnlineMode ? null : 'local-user');
  const avatarText = user?.displayName
    ? user.displayName.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
    : undefined;

  const { todayData, togglePractice } = useTodayData({
    uid,
    displayName: user?.displayName,
    avatarText,
  });

  // Gate the whole app behind sign-in only when Firebase is actually configured.
  if (isOnlineMode && isAuthLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading AuraFit…</span>
      </div>
    );
  }

  if (isOnlineMode && !user) {
    return <Login />;
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAskAura={() => setIsAskAuraOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        profile={todayData.profile}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top Sticky Bar */}
        <header className="top-nav-bar">
          <div className="system-status-indicator">
            <span className="status-dot" />
            <span>AURA SYSTEMS · STEADY</span>
          </div>

          <div className="top-nav-actions">
            <button
              className="ask-aura-top-btn"
              onClick={() => setIsAskAuraOpen(true)}
            >
              <Sparkles size={14} color="var(--accent-terracotta)" />
              <span>Ask Aura</span>
            </button>

            {isOnlineMode && user && (
              <button
                onClick={() => signOutUser()}
                title="Sign out"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LogOut size={16} />
              </button>
            )}

            <button
              onClick={() => setIsProfileOpen(true)}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#E6E1D7',
                color: '#59534C',
                fontSize: 12,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {todayData.profile.avatarText}
            </button>
          </div>
        </header>

        {/* Tab View Routers */}
        <main>
          {currentTab === 'today' && (
            <Today
              data={todayData}
              onTogglePractice={togglePractice}
              onNavigateTab={(t) => setCurrentTab(t)}
              onOpenProfile={() => setIsProfileOpen(true)}
              showProfileModal={isProfileOpen}
              onCloseProfileModal={() => setIsProfileOpen(false)}
            />
          )}

          {currentTab === 'trainer' && <Trainer />}

          {currentTab === 'tools' && <Tools />}

          {currentTab === 'wellness' && <Wellness mode="wellness" />}

          {currentTab === 'mind' && <Wellness mode="mind" />}

          {currentTab === 'brain' && <BrainFitness />}

          {currentTab === 'compete' && (
            <Compete uid={uid} displayName={user?.displayName} avatarText={todayData.profile.avatarText} />
          )}
        </main>
      </div>

      {/* Ask Aura Slide-out Overlay Drawer */}
      {isAskAuraOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 150,
          }}
          onClick={() => setIsAskAuraOpen(false)}
        >
          <div
            className="fade-in"
            style={{
              width: '100%',
              maxWidth: 580,
              height: '100vh',
              backgroundColor: 'var(--bg-canvas)',
              overflowY: 'auto',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <AskAura isDrawer onClose={() => setIsAskAuraOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
