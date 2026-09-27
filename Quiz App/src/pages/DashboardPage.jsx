import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Award, BookOpen, Clock, Activity, ArrowRight, RotateCcw, Lock } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { MOCK_QUIZZES, MOCK_BADGES } from '../services/mockData';
import Button from '../components/common/Button';

const DashboardPage = () => {
  const { username, avatar, level, xp, streak, history, unlockedBadges } = useContext(UserContext);
  const navigate = useNavigate();

  const [activeSession, setActiveSession] = useState(null);

  // Check for active unfinished quiz attempts
  useEffect(() => {
    const session = localStorage.getItem('quizify_active_quiz_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        const quizData = MOCK_QUIZZES[parsed.quizId];
        if (quizData) {
          setActiveSession({
            ...parsed,
            quizTitle: quizData.title,
            questionsCount: quizData.questionsCount
          });
        }
      } catch (e) {
        console.error('Failed to parse active session key on dashboard mount', e);
      }
    }
  }, []);

  // Compute metrics
  const totalCompleted = history.length;
  const averageScore = history.length > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.scorePercent, 0) / history.length) 
    : 0;
  
  const totalXP = xp;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-slide-in">
      
      {/* Greetings Banner */}
      <div
        className="card-glass"
        style={{
          background: 'linear-gradient(135deg, var(--bg-glass) 0%, rgba(99, 102, 241, 0.05) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '32px'
        }}
      >
        <div>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '8px', color: 'var(--text-primary)' }}>
            Welcome back, {username}! {avatar}
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 'var(--font-size-base)' }}>
            Ready to test your intelligence today? You have {streak > 0 ? `a 🔥 ${streak}-day streak going!` : 'no quiz streak yet. Complete a quiz to start!'}
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/categories')}
          icon={<ArrowRight size={18} />}
        >
          Explore Quizzes
        </Button>
      </div>

      {/* Unfinished Session Crash Callout */}
      {activeSession && (
        <div
          className="card-glass pulse-glow"
          style={{
            borderColor: 'var(--warning)',
            backgroundColor: 'var(--warning-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '20px 24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '28px' }}>⚡</span>
            <div>
              <h4 style={{ margin: 0, color: 'var(--warning-hover)', fontWeight: '800' }}>
                Unfinished Quiz Session Restored!
              </h4>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                {activeSession.quizTitle} — Resumes at question {activeSession.currentQuestionIndex + 1} of {activeSession.questionsCount}
              </p>
            </div>
          </div>
          <Button
            variant="warning"
            size="sm"
            onClick={() => navigate(`/quiz/${activeSession.quizId}/attempt`)}
          >
            Resume Attempt
          </Button>
        </div>
      )}

      {/* Stats Board Cards Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {/* Level Box */}
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>🏆</div>
          <div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: '600' }}>LEVEL</div>
            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: '800', color: 'var(--text-primary)' }}>{level}</div>
          </div>
        </div>

        {/* Total XP Box */}
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            color: '#8B5CF6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>✨</div>
          <div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: '600' }}>TOTAL XP</div>
            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: '800', color: 'var(--text-primary)' }}>{totalXP}</div>
          </div>
        </div>

        {/* Quizzes Completed Box */}
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--success-light)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>✓</div>
          <div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: '600' }}>COMPLETED</div>
            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: '800', color: 'var(--text-primary)' }}>{totalCompleted}</div>
          </div>
        </div>

        {/* Average Accuracy Box */}
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(236, 72, 153, 0.1)',
            color: '#EC4899',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>🎯</div>
          <div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: '600' }}>ACCURACY</div>
            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: '800', color: 'var(--text-primary)' }}>{averageScore}%</div>
          </div>
        </div>
      </div>

      {/* Main Split Grid (Badges vs History) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '32px'
      }} className="grid-2">
        
        {/* Left Column: Recent Activity History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} />
            <span>Recent Activity</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {history.length === 0 ? (
              <div
                className="card-glass"
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <span style={{ fontSize: '40px' }}>📁</span>
                <div style={{ fontWeight: '700' }}>No Quizzes Attempted Yet</div>
                <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Your history scorecard will populate once you finish your first challenge.</p>
                <Button size="sm" onClick={() => navigate('/categories')}>Browse Categories</Button>
              </div>
            ) : (
              history.slice(0, 5).map(item => (
                <div
                  key={item.id}
                  className="card-glass hoverable"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {item.scorePercent >= 80 ? '🏆' : item.scorePercent >= 50 ? '🥈' : '🥉'}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: 'var(--font-size-base)' }}>
                        {item.quizTitle}
                      </h4>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--text-secondary)',
                        marginTop: '4px'
                      }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {Math.round(item.timeSpentSeconds / 60)} min {item.timeSpentSeconds % 60} sec
                        </span>
                        <span>•</span>
                        <span>{item.dateString}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div>
                      <div style={{
                        fontSize: 'var(--font-size-base)',
                        fontWeight: '800',
                        color: item.scorePercent >= 80 ? 'var(--success)' : item.scorePercent >= 50 ? 'var(--warning)' : 'var(--error)'
                      }}>
                        {item.scorePercent}%
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        +{item.xpEarned} XP
                      </div>
                    </div>
                    <Link
                      to={`/quiz/${item.quizId}/result`}
                      title="Review Answers"
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      <RotateCcw size={14} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Achievements Shelf */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} />
            <span>Badges Unlocked</span>
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '12px'
          }}>
            {MOCK_BADGES.map(badge => {
              const isUnlocked = unlockedBadges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className="card-glass"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '16px 12px',
                    opacity: isUnlocked ? 1 : 0.45,
                    border: isUnlocked ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid var(--border-glass)',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  title={badge.description}
                >
                  {/* Lock Overlay on badge if locked */}
                  {!isUnlocked && (
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      color: 'var(--text-secondary)'
                    }}>
                      <Lock size={12} />
                    </div>
                  )}

                  <div style={{
                    fontSize: '36px',
                    marginBottom: '8px',
                    filter: isUnlocked ? 'none' : 'grayscale(1)',
                    transform: isUnlocked ? 'scale(1.05)' : 'none'
                  }}>
                    {badge.id === 'badge_perfect_score' ? '🏆' : badge.id === 'badge_speed_demon' ? '⚡' : badge.id === 'badge_streak_5' ? '🔥' : '👑'}
                  </div>
                  
                  <div style={{
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: '800',
                    color: isUnlocked ? 'var(--text-primary)' : 'var(--text-secondary)',
                    marginBottom: '4px'
                  }}>
                    {badge.name}
                  </div>
                  
                  <div style={{
                    fontSize: '9px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.2'
                  }}>
                    {badge.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
