import React, { useState } from 'react';
import { 
  Flame, 
  ChevronRight, 
  Activity, 
  Wind, 
  Puzzle, 
  CheckCircle2, 
  Circle,
  ArrowUpRight,
  TrendingUp,
  Droplets,
  Clock,
  X
} from 'lucide-react';
import { TodayData, UserProfile } from '../types/database.types';

interface TodayProps {
  data: TodayData;
  onTogglePractice: (id: string) => void;
  onNavigateTab: (tab: any) => void;
  onOpenProfile: () => void;
  showProfileModal?: boolean;
  onCloseProfileModal?: () => void;
}

export const Today: React.FC<TodayProps> = ({
  data,
  onTogglePractice,
  onNavigateTab,
  onOpenProfile,
  showProfileModal,
  onCloseProfileModal,
}) => {
  const { profile, signals, todayPractices, nextSession, recentMovements } = data;

  return (
    <div className="content-feed fade-in">
      {/* Header Eyebrow & Greeting */}
      <div className="date-eyebrow">{data.dateString}</div>
      <h1 className="hero-title">Good morning,<br />{profile.greetingName}.</h1>
      <p className="hero-subtitle">
        A little movement, a clear breath, and one good choice at a time. Your practice is already in motion.
      </p>

      {/* Streak Badge */}
      <div className="streak-pill-container">
        <span style={{ fontSize: 14 }}>🔥</span>
        <span className="streak-text-bold">{profile.streakDays} day streak</span>
        <span className="streak-text-muted">keep it glowing</span>
      </div>

      {/* Daily Signal Card */}
      <div className="card-elevated" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>YOUR DAILY SIGNAL</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '14px 0 6px' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 56, lineHeight: 1, fontWeight: 500 }}>
            {data.auraScore}
          </span>
          <span style={{ fontSize: 20, color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>/100</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Aura score</span>
          <span style={{
            fontSize: 11,
            color: 'var(--accent-terracotta)',
            backgroundColor: 'var(--accent-terracotta-soft)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600
          }}>
            {data.auraScoreDelta}
          </span>
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24, maxWidth: '90%' }}>
          {data.guidanceText}
        </p>

        {/* 3-State Spectrum Track */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 6,
          background: 'var(--bg-card-subtle)',
          padding: 4,
          borderRadius: 'var(--radius-full)',
          fontSize: 11,
          fontWeight: 600,
          textAlign: 'center',
          letterSpacing: '0.04em'
        }}>
          <div style={{ padding: '6px 0', color: 'var(--text-muted)' }}>RECOVERY</div>
          <div style={{
            padding: '6px 0',
            backgroundColor: '#FFFFFF',
            color: 'var(--accent-terracotta)',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            IN RHYTHM
          </div>
          <div style={{ padding: '6px 0', color: 'var(--text-muted)' }}>PEAK SIGNAL</div>
        </div>
      </div>

      {/* Weekly Progress Card */}
      <div className="card-elevated">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div className="section-label">THIS WEEK</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 500 }}>
              {data.weeklyProgressPercent}%
            </div>
          </div>

          {/* Dial Graphic */}
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'conic-gradient(#4E7A66 0% 74%, #EFECE6 74% 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF'
            }} />
          </div>
        </div>

        {/* 7 Day Status Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 12
        }}>
          {data.weekDaysStatus.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: item.active ? 'var(--accent-sage)' : '#D6D0C5'
              }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>{item.day}</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Two more practices this week unlock your <strong style={{ color: 'var(--text-primary)' }}>steady mind</strong> badge.
        </p>
      </div>

      {/* The Rhythm - Today's Practice */}
      <div style={{ marginTop: 32 }}>
        <div className="section-label">THE RHYTHM</div>
        <div className="section-header-row">
          <h2 className="section-title">Today's practice</h2>
          <button className="link-action" onClick={() => onNavigateTab('tools')}>
            Open tools <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {todayPractices.map((practice) => {
            const isCompleted = practice.completed;
            return (
              <div
                key={practice.id}
                onClick={() => onTogglePractice(practice.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 18px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  opacity: isCompleted ? 0.6 : 1
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: practice.accentColor ? `${practice.accentColor}18` : 'var(--bg-card-subtle)',
                    color: practice.accentColor || 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {practice.type === 'mobility' && <Activity size={18} />}
                    {practice.type === 'breathing' && <Wind size={18} />}
                    {practice.type === 'chess' && <Puzzle size={18} />}
                  </div>

                  <div>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      textDecoration: isCompleted ? 'line-through' : 'none'
                    }}>
                      {practice.title}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      {practice.subtitle}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <span>{practice.durationMinutes} min</span>
                  {isCompleted ? (
                    <CheckCircle2 size={18} color="var(--accent-sage)" />
                  ) : (
                    <ChevronRight size={16} color="#A8A29E" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coming Up Session Card */}
      <div style={{ marginTop: 32 }}>
        <div className="section-label">COMING UP</div>
        <div className="section-header-row">
          <h2 className="section-title">Your next session</h2>
        </div>

        <div style={{
          backgroundColor: '#1E2C24',
          color: '#FAF8F5',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 24px',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#B7D5C5',
            marginBottom: 10
          }}>
            UP NEXT · {nextSession.chapter}
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, marginBottom: 8, color: '#FFFFFF' }}>
            {nextSession.title}
          </h3>

          <p style={{ fontSize: 13, color: '#A0B4A9', marginBottom: 20 }}>
            {nextSession.durationMinutes} min · {nextSession.impactLevel} · {nextSession.equipment}
          </p>

          <button
            onClick={() => onNavigateTab('trainer')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.4)',
              paddingBottom: 2
            }}
          >
            See session <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Signals Grid */}
      <div style={{ marginTop: 32 }}>
        <div className="section-label">SIGNALS</div>
        <div className="section-header-row">
          <h2 className="section-title">How you're feeling</h2>
          <button className="link-action" onClick={onOpenProfile}>
            View growth <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {/* Readiness */}
          <div className="card-elevated" style={{ padding: '18px 20px', marginBottom: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Body readiness</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500 }}>
                {signals.bodyReadiness}%
              </span>
              <span style={{ fontSize: 11, color: 'var(--accent-sage)', fontWeight: 600 }}>
                {signals.bodyReadinessTrend}
              </span>
            </div>
          </div>

          {/* Mindful Minutes */}
          <div className="card-elevated" style={{ padding: '18px 20px', marginBottom: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Mindful minutes</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500 }}>
                {signals.mindfulMinutes} <span style={{ fontSize: 16 }}>min</span>
              </span>
              <span style={{ fontSize: 11, color: 'var(--accent-sage)', fontWeight: 600 }}>
                {signals.mindfulMinutesTrend}
              </span>
            </div>
          </div>

          {/* Water Today */}
          <div className="card-elevated" style={{ padding: '18px 20px', marginBottom: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Water today</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500 }}>
                {signals.waterCurrentLiters}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                of {signals.waterGoalLiters} L goal
              </span>
            </div>
          </div>

          {/* Chess Rating */}
          <div className="card-elevated" style={{ padding: '18px 20px', marginBottom: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Chess rating</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500 }}>
                {signals.chessRating.toLocaleString()}
              </span>
              <span style={{ fontSize: 11, color: 'var(--accent-terracotta)', fontWeight: 600 }}>
                {signals.chessRatingTrend}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Log - Recent Movement */}
      <div style={{ marginTop: 32 }}>
        <div className="section-label">PRACTICE LOG</div>
        <div className="section-header-row">
          <h2 className="section-title">Recent movement</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recentMovements.map((log) => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: log.status === 'COMPLETED' ? 'var(--accent-sage-soft)' : 'var(--accent-gold-soft)',
                  color: log.status === 'COMPLETED' ? 'var(--accent-sage)' : 'var(--accent-gold)'
                }}>
                  {log.status}
                </span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{log.title}</span>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{log.timeAgo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Member Profile Modal */}
      {showProfileModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: 16
        }}>
          <div className="fade-in" style={{
            backgroundColor: 'var(--bg-canvas)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: 520,
            padding: '36px 32px',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid var(--border-card)'
          }}>
            <button
              onClick={onCloseProfileModal}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                color: 'var(--text-secondary)'
              }}
            >
              <X size={20} />
            </button>

            <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>MEMBER PROFILE</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, lineHeight: 1.1, marginBottom: 12 }}>
              Your growth,<br />in view.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 28 }}>
              Progress is more than a before and after. It is the evidence that you keep returning to yourself.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: '#E6E1D7',
                color: '#59534C',
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {profile.avatarText}
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 600 }}>{profile.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Member since {profile.memberSince}</p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: 'var(--bg-card)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-card)'
                }}>
                  <span>LEVEL 0{profile.level}</span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span>{profile.auraPoints.toLocaleString()} aura points</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 8 }}>
              {profile.pointsToNextLevel} POINTS TO LEVEL 08
            </div>
            <div style={{
              height: 6,
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-full)',
              marginBottom: 32,
              overflow: 'hidden'
            }}>
              <div style={{ width: '70%', height: '100%', backgroundColor: 'var(--accent-terracotta)' }} />
            </div>

            <div className="section-label">THE DATA, KINDLY</div>
            <div className="section-header-row" style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 20 }}>Growth metrics</h3>
              <button style={{
                fontSize: 12,
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-card)',
                backgroundColor: 'var(--bg-card)'
              }}>
                Edit profile
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="card-elevated" style={{ padding: '16px', marginBottom: 0 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Consistency</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 26 }}>{profile.consistencyRate}%</span>
                  <span style={{ fontSize: 11, color: 'var(--accent-sage)', fontWeight: 600 }}>+ 3%</span>
                </div>
              </div>

              <div className="card-elevated" style={{ padding: '16px', marginBottom: 0 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Strength sessions</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 26 }}>{profile.strengthSessionsTotal}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>TOTAL MONTH</span>
                </div>
              </div>

              <div className="card-elevated" style={{ padding: '16px', marginBottom: 0 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Mind practice</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 26 }}>{profile.mindPracticeTotal}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>TOTAL</span>
                </div>
              </div>

              <div className="card-elevated" style={{ padding: '16px', marginBottom: 0 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Recovery quality</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 26 }}>{profile.recoveryQuality}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>7-DAY AVG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
