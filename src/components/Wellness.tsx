import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight, Wind, Check, Play, Pause, Sparkles, Sun } from 'lucide-react';
import { INITIAL_WELLNESS_CARRIES, MIND_MENU } from '../lib/wellnessService';

interface WellnessProps {
  mode?: 'wellness' | 'mind';
}

export const Wellness: React.FC<WellnessProps> = ({ mode = 'wellness' }) => {
  const [carries, setCarries] = useState(INITIAL_WELLNESS_CARRIES);
  const [activeMindIndex, setActiveMindIndex] = useState(1); // 'Clear the noise'
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(300); // 5 min

  const handleToggleCarry = (id: string) => {
    setCarries((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  useEffect(() => {
    let timer: any = null;
    let phaseCycle: any = null;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const phases: ('Inhale' | 'Hold' | 'Exhale' | 'Pause')[] = ['Inhale', 'Hold', 'Exhale', 'Pause'];
      let step = 0;
      phaseCycle = setInterval(() => {
        step = (step + 1) % 4;
        setBreathPhase(phases[step]);
      }, 4000); // 4-second box breathing
    }
    return () => {
      clearInterval(timer);
      clearInterval(phaseCycle);
    };
  }, [isBreathingActive]);

  if (mode === 'mind') {
    return (
      <div className="content-feed fade-in">
        <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>MIND PRACTICE</div>
        <h1 className="hero-title">A quieter kind<br />of strong.</h1>
        <p className="hero-subtitle">
          Train your attention like you train your body: with a little patience, a repeatable ritual, and no performance required.
        </p>

        {/* Live Practice Card */}
        <div className="card-elevated" style={{ textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--accent-sage)',
            marginBottom: 12
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent-sage)' }} />
            LIVE PRACTICE
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, marginBottom: 8 }}>
            Five minutes to arrive.
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24, maxWidth: '90%' }}>
            A guided breath for the moment between what happened and what comes next.
          </p>

          {isBreathingActive && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 0',
              marginBottom: 20,
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #4E7A66 0%, #D75A30 100%)',
                animation: 'breatheCircle 8s infinite ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontFamily: 'var(--font-serif)',
                fontSize: 16,
                boxShadow: '0 0 30px rgba(78, 122, 102, 0.3)'
              }}>
                {breathPhase}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
                Box cadence · 4-4-4-4
              </div>
            </div>
          )}

          <button
            onClick={() => setIsBreathingActive(!isBreathingActive)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 22px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isBreathingActive ? 'var(--bg-card-subtle)' : 'var(--accent-terracotta)',
              color: isBreathingActive ? 'var(--text-primary)' : '#FFFFFF',
              fontSize: 13,
              fontWeight: 600
            }}
          >
            {isBreathingActive ? <Pause size={15} /> : <Wind size={15} />}
            <span>{isBreathingActive ? 'Pause practice' : 'Begin guided breath'}</span>
          </button>
        </div>

        {/* Mind Menu */}
        <div style={{ marginTop: 32 }}>
          <div className="section-label">EXPLORE</div>
          <div className="section-header-row">
            <h2 className="section-title">Your mind menu</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MIND_MENU.map((item, idx) => {
              const isSelected = activeMindIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveMindIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 18px',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '1px solid var(--accent-terracotta)' : '1px solid var(--border-card)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-card-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)'
                    }}>
                      <Wind size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.meta}</div>
                    </div>
                  </div>

                  {isSelected ? (
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: 'var(--accent-terracotta)',
                      textTransform: 'uppercase'
                    }}>
                      SELECTED
                    </span>
                  ) : (
                    <ChevronRight size={16} color="#A8A29E" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Default Wellness Screen
  return (
    <div className="content-feed fade-in">
      <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>WELLNESS</div>
      <h1 className="hero-title">Feel well, on<br />purpose.</h1>
      <p className="hero-subtitle">
        Food, rest, and the spaces between workouts are training too. Build a life your body can stay in.
      </p>

      {/* Today's Plate Card */}
      <div className="card-elevated">
        <div className="section-label">TODAY'S PLATE</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, marginBottom: 8 }}>
          Color is a form of care.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
          Aim for a protein anchor, a fiber friend, and something that makes you want to take another bite.
        </p>

        {/* Nutritional Badges */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-terracotta-soft)',
            color: 'var(--accent-terracotta)'
          }}>
            PROTEIN
          </span>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-sage-soft)',
            color: 'var(--accent-sage)'
          }}>
            FIBER
          </span>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-gold-soft)',
            color: 'var(--accent-gold)'
          }}>
            COLOR
          </span>
        </div>

        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--accent-terracotta)'
        }}>
          Open meal guide <ChevronRight size={14} />
        </button>
      </div>

      {/* Carry Habits Section */}
      <div style={{ marginTop: 32 }}>
        <div className="section-header-row" style={{ marginBottom: 16 }}>
          <h2 className="section-title">Choose one to carry</h2>
          <Heart size={16} color="#A8A29E" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {carries.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleCarry(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 18px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: item.selected ? '1px solid var(--accent-terracotta)' : '1px solid var(--border-card)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {item.subtitle}
                </div>
              </div>

              <div style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                border: item.selected ? 'none' : '1px solid #D1CAC0',
                backgroundColor: item.selected ? 'var(--accent-terracotta)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}>
                {item.selected && <Check size={14} strokeWidth={2.5} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
