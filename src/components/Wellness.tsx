import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight, Wind, Check, Pause, X, Utensils } from 'lucide-react';
import { INITIAL_WELLNESS_CARRIES, MIND_MENU } from '../lib/wellnessService';

interface WellnessProps {
  mode?: 'wellness' | 'mind';
}

export const Wellness: React.FC<WellnessProps> = ({ mode = 'wellness' }) => {
  const [carries, setCarries] = useState(INITIAL_WELLNESS_CARRIES);
  const [activeMindIndex, setActiveMindIndex] = useState(1); // 'Clear the noise'
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [, setBreathTimer] = useState(300); // 5 min
  const [isMealGuideOpen, setIsMealGuideOpen] = useState(false);

  const handleSelectCarry = (id: string) => {
    setCarries((prev) =>
      prev.map((c) => ({
        ...c,
        selected: c.id === id ? !c.selected : false,
      }))
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
              padding: '28px 0',
              marginBottom: 20,
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                width: 110,
                height: 110,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #4E7A66 0%, #D75A30 100%)',
                animation: 'breatheCircle 8s infinite ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontFamily: 'var(--font-serif)',
                fontSize: 17,
                boxShadow: '0 0 30px rgba(78, 122, 102, 0.35)'
              }}>
                {breathPhase}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginTop: 14 }}>
                Cadence · 4s Inhale · 4s Hold · 4s Exhale · 4s Rest
              </div>
            </div>
          )}

          <button
            onClick={() => setIsBreathingActive(!isBreathingActive)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isBreathingActive ? 'var(--bg-card-subtle)' : 'var(--accent-terracotta)',
              color: isBreathingActive ? 'var(--text-primary)' : '#FFFFFF',
              fontSize: 14,
              fontWeight: 600,
              boxShadow: isBreathingActive ? 'none' : '0 4px 14px rgba(215, 90, 48, 0.25)',
              cursor: 'pointer'
            }}
          >
            {isBreathingActive ? <Pause size={16} /> : <Wind size={16} />}
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
  const activeCarry = carries.find((c) => c.selected);

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

        <button
          onClick={() => setIsMealGuideOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--accent-terracotta)',
            padding: '6px 0',
            cursor: 'pointer'
          }}
        >
          <span>Open meal guide</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Carry Habits Section */}
      <div style={{ marginTop: 32 }}>
        <div className="section-header-row" style={{ marginBottom: 16 }}>
          <div>
            <h2 className="section-title">Choose one to carry</h2>
            {activeCarry && (
              <span style={{ fontSize: 12, color: 'var(--accent-sage)', fontWeight: 600 }}>
                ✓ Selected: {activeCarry.title}
              </span>
            )}
          </div>
          <Heart size={16} color="var(--accent-terracotta)" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {carries.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectCarry(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 18px',
                backgroundColor: item.selected ? 'var(--bg-card-subtle)' : 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: item.selected ? '2px solid var(--accent-terracotta)' : '1px solid var(--border-card)',
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
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: item.selected ? 'none' : '2px solid #D1CAC0',
                backgroundColor: item.selected ? 'var(--accent-terracotta)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                transition: 'all 0.15s ease'
              }}>
                {item.selected && <Check size={14} strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Guide Modal Dialog */}
      {isMealGuideOpen && (
        <div className="modal-backdrop" onClick={() => setIsMealGuideOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Utensils size={20} color="var(--accent-terracotta)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22 }}>Aura Nutrition Blueprint</h2>
              </div>
              <button
                onClick={() => setIsMealGuideOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                aria-label="Close meal guide"
              >
                <X size={20} color="var(--text-muted)" />
              </button>
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
              No dogmatic calorie counting. Build meals centered on nourishment, energy stability, and digestion ease.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Protein Anchor */}
              <div style={{ padding: '14px 16px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--accent-terracotta)' }}>
                    1. THE PROTEIN ANCHOR
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  25–40g per meal. Wild salmon, pasture-raised eggs, tempeh, Greek yogurt, or slow-cooked lentils. Supports recovery and keeps blood sugar smooth.
                </div>
              </div>

              {/* Fiber Friend */}
              <div style={{ padding: '14px 16px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--accent-sage)' }}>
                    2. THE FIBER FRIEND
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  8–12g per plate. Roasted broccoli, dark leafy greens, chia seeds, berries, or prebiotic whole oats for gut microbiome vitality.
                </div>
              </div>

              {/* Colorful Phytonutrients */}
              <div style={{ padding: '14px 16px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--accent-gold)' }}>
                    3. COLORFUL COMPASS
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  At least 2 deep colors per dish: purple cabbage, heirloom carrots, avocado, cold-pressed olive oil, or citrus zest for micronutrient density.
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMealGuideOpen(false)}
              style={{
                marginTop: 22,
                width: '100%',
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-terracotta)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
