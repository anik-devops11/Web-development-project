import React, { useContext } from 'react';
import { Flame, Sparkles, Trophy } from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { username, avatar, level, xp, streak } = useContext(UserContext);

  // Experience threshold calculations
  // Level 1: 0-99 XP, Level 2: 100-199 XP, etc.
  const currentLevelXp = xp % 100;
  const nextLevelProgress = currentLevelXp; // since it is out of 100

  return (
    <header
      className="global-header"
      style={{
        height: '64px',
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-glass)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-6)',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}
    >
      {/* Mobile Title Logo (Visible only on smaller screens) */}
      <div className="header-logo-mobile" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #8B5CF6 100%)',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '800',
            fontSize: '16px'
          }}>⚡</span>
          <span style={{
            fontSize: 'var(--font-size-md)',
            fontWeight: '800',
            color: 'var(--text-primary)'
          }}>Quizify</span>
        </Link>
      </div>

      {/* Spacing alignment for wide displays */}
      <div className="header-spacer-desktop" style={{ flex: 1 }} />

      {/* User Progress Stats Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Streak Counter */}
        <div
          title="Daily Quiz Streak"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-round)',
            backgroundColor: streak > 0 ? 'var(--warning-light)' : 'var(--bg-tertiary)',
            border: `1px solid ${streak > 0 ? 'var(--warning)' : 'transparent'}`,
            color: streak > 0 ? 'var(--warning)' : 'var(--text-secondary)',
            fontWeight: '800',
            fontSize: 'var(--font-size-sm)',
            transition: 'all 0.3s ease'
          }}
        >
          <Flame size={18} fill={streak > 0 ? 'var(--warning)' : 'transparent'} className={streak > 0 ? 'streak-flame-active' : ''} />
          <span>{streak} Days</span>
        </div>

        {/* XP Points Progress Meter */}
        <div
          title={`${xp} Total XP - Level ${level}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary-light)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            color: 'var(--primary)'
          }}
        >
          <Sparkles size={16} fill="var(--primary)" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '800' }}>
              <span>Lvl {level}</span>
              <span>{xp} XP</span>
            </div>
            {/* Tiny progress subbar */}
            <div style={{
              width: '80px',
              height: '4px',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${nextLevelProgress}%`,
                height: '100%',
                backgroundColor: 'var(--primary)',
                transition: 'width 0.5s ease-out'
              }} />
            </div>
          </div>
        </div>

        {/* User Mini Avatar Link */}
        <Link
          to="/settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--border-glass)',
            fontSize: '22px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          className="header-avatar-link"
        >
          {avatar}
        </Link>
      </div>

      <style>
        {`
          .streak-flame-active {
            animation: flameFlicker 1.5s infinite alternate;
          }
          @keyframes flameFlicker {
            0% { transform: scale(1) rotate(-2deg); filter: drop-shadow(0 0 2px var(--warning)); }
            100% { transform: scale(1.1) rotate(2deg); filter: drop-shadow(0 0 8px var(--warning)); }
          }
          .header-avatar-link:hover {
            transform: scale(1.08);
            border-color: var(--primary);
          }
          @media (max-width: 1024px) {
            .header-logo-mobile {
              display: flex !important;
            }
            .header-spacer-desktop {
              display: none !important;
            }
            .global-header {
              padding: 0 var(--space-4);
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
