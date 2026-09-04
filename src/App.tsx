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
  const [isGuest, setIsGuest] = useState(false);

  const { user, isLoading: isAuthLoading, isOnlineMode } = useAuth();

  const uid = user?.uid ?? (isOnlineMode && !isGuest ? null : 'local-user');
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

  if (isOnlineMode && !user && !isGuest) {
    return <Login onContinueAsGuest={() => setIsGuest(true)} />;
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
                backgroundColor: 'var(--accent-terracotta)',
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {todayData.profile.avatarText}
            </button>
          </div>
        </header>

        {/* Tab Content Rendering */}
        <main className="main-content">
          {currentTab === 'today' && (
            <Today
              data={todayData}
              onTogglePractice={togglePractice}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenProfile={() => setIsProfileOpen(true)}
            />
          )}

          {currentTab === 'trainer' && <Trainer />}

          {currentTab === 'tools' && <Tools />}

          {currentTab === 'wellness' && <Wellness />}

          {currentTab === 'brain' && <BrainFitness />}

          {currentTab === 'compete' && (
            <Compete uid={uid} displayName={user?.displayName} avatarText={todayData.profile.avatarText} />
          )}
        </main>
      </div>

      {/* Persistent / Modal Drawers */}
      {isAskAuraOpen && (
        <AskAura
          isDrawer
          onClose={() => setIsAskAuraOpen(false)}
        />
      )}

      {/* Simple Profile Drawer */}
      {isProfileOpen && (
        <div className="profile-backdrop" onClick={() => setIsProfileOpen(false)}>
          <div className="profile-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22 }}>Your Aura Profile</h2>
              <button onClick={() => setIsProfileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="var(--text-muted)" />
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                backgroundColor: 'var(--accent-terracotta)',
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {todayData.profile.avatarText}
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>{todayData.profile.name}</h3>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Member since {todayData.profile.memberSince}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: '12px 14px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>MEMBER STATUS</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Level {todayData.profile.level} · Consistent Practitioner</div>
              </div>

              <div style={{ padding: '12px 14px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>CURRENT STREAK</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>12 Consecutive Days</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
