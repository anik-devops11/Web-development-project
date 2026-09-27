import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Trophy, Flame, Play, ArrowRight } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const LandingPage = () => {
  const { username, avatar, xp, updateProfile } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [tempName, setTempName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🧠');

  const emojis = ['🧠', '🧙‍♂️', '🥷', '🧑‍🚀', '👸', '🦖', '🦁', '🦄', '👽', '🤖', '🦊', '🦉'];

  const handleStart = () => {
    // If user has already configured their profile (not default), send them straight to dashboard
    if (username !== 'Guest Explorer' || xp > 0) {
      navigate('/dashboard');
    } else {
      setTempName('');
      setShowAuthModal(true);
    }
  };

  const handleCreateProfile = (e) => {
    e.preventDefault();
    const finalName = tempName.trim() || 'Guest Explorer';
    updateProfile(finalName, selectedEmoji);
    setShowAuthModal(false);
    navigate('/dashboard');
  };

  const isConfigured = username !== 'Guest Explorer' || xp > 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background radial gradient glow */}
      <div style={{
        position: 'absolute',
        width: '50vw',
        height: '50vw',
        top: '-10%',
        left: '-10%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        width: '40vw',
        height: '40vw',
        bottom: '-10%',
        right: '-10%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Landing Layout Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Navigation Bar */}
        <header style={{
          height: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, #8B5CF6 100%)',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '800',
              fontSize: '20px'
            }}>⚡</span>
            <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: '800', letterSpacing: '-0.5px' }}>Quizify</span>
          </div>
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(isConfigured ? '/dashboard' : '/categories')}
            >
              Browse Quizzes
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          alignItems: 'center',
          gap: '48px',
          padding: '60px 0 80px 0',
          minHeight: 'calc(100vh - 160px)'
        }} className="landing-hero-grid">
          {/* Left Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-round)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: '800',
              marginBottom: '24px'
            }}>
              <Sparkles size={14} />
              <span>THE ULTIMATE GAMIFIED QUIZ EXPERIENCE</span>
            </div>
            
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '24px',
              letterSpacing: '-1.5px',
              background: 'linear-gradient(90deg, #FFFFFF 30%, var(--text-secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} className="landing-title">
              Master Skills, One <br />
              <span style={{
                background: 'linear-gradient(90deg, var(--primary) 0%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Quiz at a Time</span>
            </h1>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-lg)',
              lineHeight: '1.6',
              marginBottom: '40px',
              maxWidth: '600px'
            }}>
              Test your knowledge in programming, frontend design, space exploration, and history. 
              Earn XP, increase your daily streak, unlock achievements, and climb the leaderboard!
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Button
                variant="success"
                size="lg"
                onClick={handleStart}
                icon={isConfigured ? <ArrowRight size={18} /> : <Play size={16} fill="white" />}
              >
                {isConfigured ? `Resume Adventure (${avatar})` : 'Start Challenge Now'}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/categories')}
              >
                Explore Categories
              </Button>
            </div>
          </div>

          {/* Right SVG Graphic Column */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }} className="landing-graphics-col">
            {/* Custom Interactive Floating Trophy SVG */}
            <svg
              viewBox="0 0 500 500"
              style={{
                width: '100%',
                maxWidth: '400px',
                filter: 'drop-shadow(0 20px 40px rgba(99, 102, 241, 0.25))',
                animation: 'floatTrophy 4s ease-in-out infinite alternate'
              }}
            >
              {/* Background circular halo */}
              <circle cx="250" cy="250" r="160" fill="url(#haloGrad)" opacity="0.3" />
              
              {/* Trophy Body */}
              <path d="M150 150H350V230C350 285.228 305.228 330 250 330C194.772 330 150 285.228 150 230V150Z" fill="url(#trophyGrad)" />
              <path d="M250 330V400" stroke="url(#trophyGrad)" strokeWidth="24" strokeLinecap="round" />
              <path d="M180 400H320" stroke="url(#trophyGrad)" strokeWidth="20" strokeLinecap="round" />
              
              {/* Handles */}
              <path d="M150 180H110V240C110 260 125 275 145 278" stroke="url(#trophyGrad)" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M350 180H390V240C390 260 375 275 355 278" stroke="url(#trophyGrad)" strokeWidth="16" strokeLinecap="round" fill="none" />
              
              {/* Star details */}
              <polygon points="250,190 260,215 285,215 265,230 272,255 250,240 228,255 235,230 215,215 240,215" fill="#F59E0B" />
              
              {/* Floating particles */}
              <circle cx="100" cy="120" r="8" fill="#F59E0B" opacity="0.8" />
              <circle cx="420" cy="180" r="6" fill="#EC4899" opacity="0.6" />
              <circle cx="130" cy="350" r="10" fill="#6366F1" opacity="0.7" />
              <circle cx="380" cy="380" r="5" fill="#10B981" opacity="0.9" />

              <defs>
                <radialGradient id="haloGrad">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section style={{
          padding: '60px 0',
          borderTop: '1px solid var(--border-glass)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Card 1 */}
            <div className="card-glass hoverable" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warning)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>🔥</div>
              <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Daily Streaks</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 'var(--font-size-sm)' }}>
                Keep your mind active! Build up your login streak by attempting a quiz every day and earn consecutive multipliers.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="card-glass hoverable" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>📈</div>
              <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Detailed Metrics</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 'var(--font-size-sm)' }}>
                View detailed graphs of your speed, categories accuracy, unlocked badges, and review correct answers explanations.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-glass hoverable" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>🛡️</div>
              <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Crash Resilience</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 'var(--font-size-sm)' }}>
                Never lose your quiz place. Auto-saves question progression locally so you can resume even after a page reload.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          height: '100px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-glass)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)',
          marginTop: '60px'
        }}>
          <div>© 2026 Quizify. Designed for Developers & Thinkers.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/about" style={{ hover: { color: 'var(--text-primary)' } }}>About</Link>
            <Link to="/contact" style={{ hover: { color: 'var(--text-primary)' } }}>Contact</Link>
          </div>
        </footer>
      </div>

      {/* Auth Initialization Modal */}
      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Setup Your Profile"
        size="sm"
      >
        <form onSubmit={handleCreateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-sm)'
            }}>
              Choose Your Display Name
            </label>
            <input
              type="text"
              placeholder="e.g. CodeWarrior"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              required
              maxLength={15}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)',
                fontWeight: '600'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              fontSize: 'var(--font-size-sm)'
            }}>
              Choose Your Avatar Emoji
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '10px',
              padding: '10px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)'
            }}>
              {emojis.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setSelectedEmoji(e)}
                  style={{
                    fontSize: '28px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedEmoji === e ? 'var(--primary-light)' : 'transparent',
                    border: selectedEmoji === e ? '1px solid var(--primary)' : '1px solid transparent',
                    transition: 'all 0.1s'
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="success"
            className="w-full"
            style={{ width: '100%', marginTop: '8px' }}
          >
            Launch Adventure! 🚀
          </Button>
        </form>
      </Modal>

      <style>
        {`
          @keyframes floatTrophy {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-16px) rotate(2deg); }
          }
          @media (max-width: 1024px) {
            .landing-hero-grid {
              grid-template-columns: 1fr !important;
              text-align: center;
              padding: 40px 0 !important;
            }
            .landing-hero-grid div {
              align-items: center !important;
            }
            .landing-title {
              font-size: 2.5rem !important;
            }
            .landing-graphics-col {
              order: -1;
              max-width: 250px;
              margin: 0 auto;
            }
            .landing-hero-grid div div {
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
