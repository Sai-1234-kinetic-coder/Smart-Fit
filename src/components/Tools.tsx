import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Droplets, Bell } from 'lucide-react';
import { getWaterState, updateGlassesCount } from '../lib/waterService';

export const Tools: React.FC = () => {
  const [water, setWater] = useState(getWaterState);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleToggleGlass = (index: number) => {
    const newCount = index < water.currentGlasses ? index : index + 1;
    const updated = updateGlassesCount(newCount);
    setWater(updated);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="content-feed fade-in">
      <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>RITUAL TOOLS</div>
      <h1 className="hero-title">Make the next<br />minute count.</h1>
      <p className="hero-subtitle">
        Small tools for the in-between moments: a glass of water, a focused interval, a reset you can actually repeat.
      </p>

      {/* Water Rhythm Card */}
      <div className="card-elevated">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24 }}>Water rhythm</h2>
          <Bell size={18} color="#A8A29E" />
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
          A gentle nudge, not another demand.
        </p>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 500 }}>
            {water.currentGlasses}
          </span>
          <span style={{ fontSize: 16, color: 'var(--text-muted)' }}>/ {water.maxGlasses} glasses</span>
        </div>

        {/* 8 Interactive Glass Indicators */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {Array.from({ length: water.maxGlasses }).map((_, i) => {
            const isFilled = i < water.currentGlasses;
            return (
              <button
                key={i}
                onClick={() => handleToggleGlass(i)}
                style={{
                  flex: 1,
                  height: 38,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isFilled ? '#5C9082' : 'var(--bg-card-subtle)',
                  border: isFilled ? 'none' : '1px solid var(--border-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                title={`Glass ${i + 1}`}
              >
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: isFilled ? '#FFFFFF' : '#D4CEBF'
                }} />
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Next reminder in {water.nextReminderMinutes} minutes
        </div>
      </div>

      {/* Focus Timer Card */}
      <div className="card-elevated">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, marginBottom: 6 }}>Focus timer</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
          Your next interval is yours alone.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '36px 0',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 20
        }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 54,
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: 'var(--text-primary)'
          }}>
            {formatTime(timerSeconds)}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isTimerRunning ? 'var(--bg-card-subtle)' : 'var(--accent-terracotta)',
              color: isTimerRunning ? 'var(--text-primary)' : '#FFFFFF',
              fontSize: 14,
              fontWeight: 600
            }}
          >
            {isTimerRunning ? <Pause size={16} /> : <Play size={16} fill="#FFF" />}
            <span>{isTimerRunning ? 'Pause' : 'Start interval'}</span>
          </button>

          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(60);
            }}
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card-subtle)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Reset timer"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
