import React, { useState } from 'react';
import { Trophy, Award, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_COMPETE_DATA } from '../lib/competeService';

export const Compete: React.FC = () => {
  const [data, setData] = useState(INITIAL_COMPETE_DATA);

  const handleClaimBadge = () => {
    if (!data.badgeClaimed) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#D75A30', '#E5A83B', '#4E7A66'],
        });
      } catch (e) {}

      setData((prev) => ({
        ...prev,
        badgeClaimed: true,
        points: prev.points + 50,
      }));
    }
  };

  return (
    <div className="content-feed fade-in">
      <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>COMPETE GENTLY</div>
      <h1 className="hero-title">Play the long<br />game.</h1>
      <p className="hero-subtitle">
        A little friendly friction can make consistency feel visible. Compare notes, not worth. Your only real opponent is last Tuesday.
      </p>

      {/* Season Rhythm Stats Card */}
      <div className="card-elevated">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <div className="section-label">YOUR SEASON</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, marginBottom: 18 }}>
              {data.seasonDays} days in rhythm.
            </h2>
          </div>
          <Trophy size={24} color="#E5A83B" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
          paddingTop: 16,
          borderTop: '1px solid var(--border-card)'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500 }}>
              {data.points}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
              POINTS
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500 }}>
              {data.rankThisWeek}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
              THIS WK.
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500 }}>
              {data.badgesCount}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
              BADGES
            </div>
          </div>
        </div>
      </div>

      {/* Next Unlock Badge Card */}
      <div className="card-elevated" style={{ backgroundColor: '#FCFAF6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: '#FDEEE9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-terracotta)'
          }}>
            <Award size={22} />
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: 2 }}>NEXT UNLOCK</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20 }}>{data.nextUnlockTitle}</h3>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{data.nextUnlockSubtitle}</div>
          </div>
        </div>

        <button
          onClick={handleClaimBadge}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: data.badgeClaimed ? 'var(--accent-sage)' : 'var(--accent-terracotta)',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
        >
          {data.badgeClaimed ? <Check size={16} /> : <Sparkles size={16} />}
          <span>{data.badgeClaimed ? 'Badge claimed' : 'Claim when ready'}</span>
        </button>
      </div>

      {/* Community Pulse Leaderboard */}
      <div style={{ marginTop: 32 }}>
        <div className="section-label">COMMUNITY PULSE</div>
        <div className="section-header-row">
          <h2 className="section-title">Leaderboard</h2>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>• updated now</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.leaderboard.map((item) => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                backgroundColor: item.isCurrentUser ? '#FFF6F2' : 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: item.isCurrentUser ? '1px solid var(--accent-terracotta)' : '1px solid var(--border-card)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  width: 20
                }}>
                  {item.rank}
                </span>

                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: item.isCurrentUser ? 'var(--accent-terracotta)' : 'var(--bg-card-subtle)',
                  color: item.isCurrentUser ? '#FFF' : 'var(--text-secondary)',
                  fontSize: 11,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.initials}
                </div>

                <span style={{
                  fontSize: 14,
                  fontWeight: item.isCurrentUser ? 600 : 500,
                  color: item.isCurrentUser ? 'var(--accent-terracotta)' : 'var(--text-primary)'
                }}>
                  {item.name}
                </span>
              </div>

              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}>
                {item.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
