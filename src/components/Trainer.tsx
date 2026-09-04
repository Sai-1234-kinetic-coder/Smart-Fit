import React, { useState } from 'react';
import { Check, ChevronRight, ArrowRight, Activity, ShieldCheck, HeartPulse } from 'lucide-react';
import { INITIAL_GOALS, calculateBMI } from '../lib/trainerService';

export const Trainer: React.FC = () => {
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [weightKg, setWeightKg] = useState(68);
  const [heightCm, setHeightCm] = useState(174);
  const bmiInfo = calculateBMI(weightKg, heightCm);

  const handleSelectGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => ({
        ...g,
        selected: g.id === id,
      }))
    );
  };

  return (
    <div className="content-feed fade-in">
      <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>AURA SYSTEMS · STEADY</div>
      <h1 className="hero-title">Train with<br />context.</h1>
      <p className="hero-subtitle">
        A plan that adapts to your energy, not just your calendar. Start with a small signal and Aura will meet you there.
      </p>

      {/* Goal Selector Card */}
      <div className="card-elevated">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: 'var(--accent-terracotta)',
            backgroundColor: 'var(--accent-terracotta-soft)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)'
          }}>
            STEP 01 // 02
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>your baseline</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, marginBottom: 18 }}>
          What would feel good to build?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {goals.map((goal) => {
            const isSelected = goal.selected;
            return (
              <button
                key={goal.id}
                onClick={() => handleSelectGoal(goal.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--accent-terracotta)' : 'var(--bg-card-subtle)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  fontWeight: 500,
                  fontSize: 15,
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{goal.title}</span>
                {isSelected && <Check size={18} strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>

        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--accent-terracotta)',
            padding: '6px 0'
          }}
        >
          <span>Continue with this goal</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Body Context - Kinder BMI Guide */}
      <div className="card-elevated">
        <div className="section-label">BODY CONTEXT</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, marginBottom: 8 }}>
          A kinder BMI guide
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 22 }}>
          BMI is one rough lens, never the whole picture. Use it alongside how you sleep, move, and feel.
        </p>

        {/* Display Score & Spectrum */}
        <div style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          marginBottom: 16
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                PREVAILING RANGE
              </div>
              <div style={{
                fontSize: 13,
                fontWeight: 500,
                marginTop: 2,
                color:
                  bmiInfo.category === 'Normal range'
                    ? 'var(--accent-sage)'
                    : bmiInfo.category === 'Underweight' || bmiInfo.category === 'Elevated'
                    ? 'var(--accent-gold)'
                    : 'var(--accent-terracotta)',
              }}>
                {bmiInfo.category}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 500, color: 'var(--text-primary)' }}>
              {bmiInfo.bmi}
            </div>
          </div>

          {/* Interactive Range Spectrum Bar */}
          <div style={{
            height: 8,
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(90deg, #68D391 0%, #4E7A66 40%, #E5A83B 75%, #E53E3E 100%)',
            position: 'relative',
            marginBottom: 16
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${Math.min(95, Math.max(5, (bmiInfo.bmi / 35) * 100))}%`,
              transform: 'translate(-50%, -50%)',
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              border: '2px solid var(--accent-sage)'
            }} />
          </div>

          {/* Sliders to test dynamically */}
          <div style={{ display: 'flex', gap: 16, marginTop: 16, fontSize: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: 'var(--text-muted)' }}>Weight: {weightKg} kg</label>
              <input
                type="range"
                min="45"
                max="120"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-sage)' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ color: 'var(--text-muted)' }}>Height: {heightCm} cm</label>
              <input
                type="range"
                min="140"
                max="210"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-sage)' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
          <ShieldCheck size={16} color="var(--accent-sage)" />
          <span>{bmiInfo.note}</span>
        </div>
      </div>

      {/* Bottom Practice Highlights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div className="card-elevated" style={{ padding: '16px', marginBottom: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 6 }}>
            TODAY'S FOCUS
          </div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Full body stability</div>
        </div>

        <div className="card-elevated" style={{ padding: '16px', marginBottom: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 6 }}>
            COACH NOTE
          </div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Keep two reps in reserve</div>
        </div>

        <div className="card-elevated" style={{ padding: '16px', marginBottom: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 6 }}>
            RECOVERY
          </div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>7h 42m target</div>
        </div>
      </div>
    </div>
  );
};
