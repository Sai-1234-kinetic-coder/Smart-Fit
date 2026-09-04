import React, { useState } from 'react';
import { 
  ChevronRight, 
  Activity, 
  Wind, 
  Puzzle, 
  CheckCircle2, 
  Circle
} from 'lucide-react';
import { TodayData } from '../types/database.types';

type SignalMode = 'recovery' | 'in_rhythm' | 'peak';

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
}) => {
  const { profile, signals, todayPractices, nextSession } = data;
  const [signalMode, setSignalMode] = useState<SignalMode>('in_rhythm');

  const signalDetails: Record<SignalMode, { score: number; delta: string; guidance: string }> = {
    recovery: {
      score: 680,
      delta: '-12 recovery focus',
      guidance: 'Your nervous system needs gentle restoration today. Prioritize hydration, a 15-minute walk, and deep restorative sleep.',
    },
    in_rhythm: {
      score: data.auraScore,
      delta: data.auraScoreDelta,
      guidance: data.guidanceText,
    },
    peak: {
      score: 948,
      delta: '+14.2 peak output',
      guidance: 'All recovery markers are in the green. Excellent day for maximum output, progressive weights, or athletic conditioning.',
    },
  };

  const currentSignal = signalDetails[signalMode];

  const handlePracticeClick = (practice: any) => {
    if (practice.type === 'chess') {
      onNavigateTab('brain');
    } else if (practice.type === 'breathing') {
      onNavigateTab('mind');
    } else {
      onTogglePractice(practice.id);
    }
  };

  return (
    <div className="content-feed fade-in">
      {/* Header Eyebrow & Greeting */}
      <div className="date-eyebrow">{data.dateString}</div>
      <h1 className="hero-title">Good morning,<br />{profile.greetingName}.</h1>
      <p className="hero-subtitle">
        A little movement, a clear breath, and one good choice at a time. Your practice is already in motion.
      </p>

      {/* Streak Badge */}
      <div className="streak-pill-container" onClick={onOpenProfile} style={{ cursor: 'pointer' }} title="View streak in profile">
        <span style={{ fontSize: 14 }}>âœ¨</span>
        <span className="streak-text-bold">{profile.streakDays} day streak</span>
        <span className="streak-text-muted">keep it glowing</span>
      </div>

      {/* Daily Signal Card */}
      <div className="card-elevated" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>YOUR DAILY SIGNAL</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '14px 0 6px' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 56, lineHeight: 1, fontWeight: 500 }}>
            {currentSignal.score}
          </span>
          <span style={{ fontSize: 20, color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>/{data.auraScoreMax}</span>
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
            {currentSignal.delta}
          </span>
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24, maxWidth: '90%' }}>
          {currentSignal.guidance}
        </p>

        {/* 3-State Interactive Spectrum Track */}
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
          <button
            onClick={() => setSignalMode('recovery')}
            style={{
              padding: '8px 0',
              borderRadius: 'var(--radius-full)',
              backgroundColor: signalMode === 'recovery' ? '#FFFFFF' : 'transparent',
              color: signalMode === 'recovery' ? 'var(--accent-terracotta)' : 'var(--text-muted)',
              boxShadow: signalMode === 'recovery' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              fontWeight: signalMode === 'recovery' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            RECOVERY
          </button>
          <button
            onClick={() => setSignalMode('in_rhythm')}
            style={{
              padding: '8px 0',
              borderRadius: 'var(--radius-full)',
              backgroundColor: signalMode === 'in_rhythm' ? '#FFFFFF' : 'transparent',
              color: signalMode === 'in_rhythm' ? 'var(--accent-terracotta)' : 'var(--text-muted)',
              boxShadow: signalMode === 'in_rhythm' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              fontWeight: signalMode === 'in_rhythm' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            IN RHYTHM
          </button>
          <button
            onClick={() => setSignalMode('peak')}
            style={{
              padding: '8px 0',
              borderRadius: 'var(--radius-full)',
              backgroundColor: signalMode === 'peak' ? '#FFFFFF' : 'transparent',
              color: signalMode === 'peak' ? 'var(--accent-terracotta)' : 'var(--text-muted)',
              boxShadow: signalMode === 'peak' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              fontWeight: signalMode === 'peak' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            PEAK SIGNAL
          </button>
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
                onClick={() => handlePracticeClick(practice)}
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
                    backgroundColor: practice.accentColor ? practice.accentColor + '18' : 'var(--bg-card-subtle)',
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePractice(practice.id);
                    }}
                    style={{ background: 'none', border: 'none', padding: 2, cursor: 'pointer' }}
                    aria-label={'Toggle ' + practice.title}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={20} color="var(--accent-sage)" />
                    ) : (
                      <Circle size={20} color="#C4BDB0" />
                    )}
                  </button>
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

        <div
          onClick={() => onNavigateTab('trainer')}
          style={{
            backgroundColor: '#1E2C24',
            color: '#FAF8F5',
            borderRadius: 'var(--radius-lg)',
            padding: '28px 24px',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
        >
          <div style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#B7D5C5',
            marginBottom: 10
          }}>
            UP NEXT Â· {nextSession.chapter}
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, marginBottom: 8, color: '#FFFFFF' }}>
            {nextSession.title}
          </h3>

          <p style={{ fontSize: 13, color: '#A0B4A9', marginBottom: 20 }}>
            {nextSession.durationMinutes} min Â· {nextSession.impactLevel} Â· {nextSession.equipment}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigateTab('trainer');
            }}
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
            <span>See session</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Signals Grid */}
      <div style={{ marginTop: 32 }}>
        <div className="section-header-row">
          <div className="section-label" style={{ margin: 0 }}>SIGNALS</div>
          <button className="link-action" onClick={onOpenProfile}>
            <span>View growth</span>
            <ChevronRight size={14} />
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
                {signals.mindfulMinutes} min
              </span>
              <span style={{ fontSize: 11, color: 'var(--accent-sage)', fontWeight: 600 }}>
                {signals.mindfulMinutesTrend}
              </span>
            </div>
          </div>

          {/* Water */}
          <div
            className="card-elevated"
            onClick={() => onNavigateTab('tools')}
            style={{ padding: '18px 20px', marginBottom: 0, cursor: 'pointer' }}
          >
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Water today</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500 }}>
                {signals.waterCurrentLiters}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                of {signals.waterGoalLiters} L goal
              </span>
            </div>
          </div>

          {/* Chess Rating */}
          <div
            className="card-elevated"
            onClick={() => onNavigateTab('brain')}
            style={{ padding: '18px 20px', marginBottom: 0, cursor: 'pointer' }}
          >
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Chess rating</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500 }}>
                {signals.chessRating}
              </span>
              <span style={{ fontSize: 11, color: 'var(--accent-sage)', fontWeight: 600 }}>
                {signals.chessRatingTrend}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
