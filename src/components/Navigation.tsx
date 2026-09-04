import React from 'react';
import { 
  Calendar, 
  Dumbbell, 
  Sliders, 
  Heart, 
  Sparkles, 
  Puzzle, 
  Trophy, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { UserProfile } from '../types/database.types';

export type TabId = 'today' | 'trainer' | 'tools' | 'wellness' | 'mind' | 'brain' | 'compete';

interface NavigationProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onOpenAskAura: () => void;
  onOpenProfile: () => void;
  profile: UserProfile;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenAskAura,
  onOpenProfile,
  profile,
}) => {
  const navItems = [
    { id: 'today' as TabId, label: 'Today', icon: Calendar },
    { id: 'trainer' as TabId, label: 'Trainer', icon: Dumbbell },
    { id: 'tools' as TabId, label: 'Tools', icon: Sliders },
    { id: 'wellness' as TabId, label: 'Wellness', icon: Heart },
    { id: 'mind' as TabId, label: 'Mind', icon: Sparkles },
    { id: 'brain' as TabId, label: 'Brain fitness', icon: Puzzle },
    { id: 'compete' as TabId, label: 'Compete', icon: Trophy },
  ];

  return (
    <>
      {/* Desktop / Tablet Left Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="brand-logo">
            <div className="brand-icon-circle">
              <Sparkles size={16} />
            </div>
            <span>AuraFit</span>
          </div>

          <div className="nav-section-label">YOUR PRACTICE</div>

          <nav className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-item-icon">
                    <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="ask-aura-card" onClick={onOpenAskAura}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D75A30, #E5A83B)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}>
                <Sparkles size={13} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Ask Aura</span>
            </div>
            <ChevronRight size={16} color="#A8A29E" />
          </div>

          <div className="profile-card" onClick={onOpenProfile}>
            <div className="avatar-badge">{profile.avatarText}</div>
            <div style={{ flex: 1 }}>
              <div className="profile-meta-name">{profile.name}</div>
              <div className="profile-meta-level">Level 0{profile.level}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Dock Bar */}
      <nav className="mobile-bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                color: isActive ? 'var(--accent-terracotta)' : 'var(--text-secondary)',
                fontSize: 11,
                fontWeight: isActive ? 600 : 500,
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.3 : 1.7} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
