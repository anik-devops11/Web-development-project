import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Award, Clock, RotateCcw, Home, ChevronDown, ChevronUp, Check, X, ShieldAlert, Sparkles } from 'lucide-react';
import { QuizContext } from '../context/QuizContext';
import { useAudio } from '../hooks/useAudio';
import Button from '../components/common/Button';
import confetti from 'canvas-confetti';

const QuizResultPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { lastResult, startQuiz, exitQuiz } = useContext(QuizContext);
  const { playSound } = useAudio();

  const [reviewOpen, setReviewOpen] = useState(false);
  const [activeReviewIdx, setActiveReviewIdx] = useState(null);

  // Trigger celebration effects
  useEffect(() => {
    if (lastResult) {
      if (lastResult.scorePercent >= 80) {
        playSound('success');
        // Confetti burst
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
      } else {
        playSound('click');
      }
    }
  }, [lastResult, playSound]);

  // If no last result exists in context state, redirect back
  if (!lastResult) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }} className="animate-slide-in">
        <div className="card-glass" style={{ maxWidth: '500px', margin: '0 auto', padding: '32px' }}>
          <ShieldAlert size={48} color="var(--warning)" style={{ marginBottom: '16px' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No Results Loaded</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            No recent score was found. Try completing a quiz first.
          </p>
          <Button onClick={() => navigate('/categories')}>Browse Categories</Button>
        </div>
      </div>
    );
  }

  const { scorePercent, correctCount, totalQuestions, timeSpent, userUpdates } = lastResult;

  const handleRestart = () => {
    exitQuiz();
    const success = startQuiz(id);
    if (success) {
      navigate(`/quiz/${id}/attempt`);
    }
  };

  const handleExit = () => {
    exitQuiz();
    navigate('/dashboard');
  };

  // SVG Calculations for Score Gauge
  const size = 160;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scorePercent / 100) * circumference;

  const getFeedbackMessage = () => {
    if (scorePercent === 100) return 'Outstanding Mastery! 🏆';
    if (scorePercent >= 80) return 'Great Job, Challenger! 🌟';
    if (scorePercent >= 50) return 'Keep Practicing! 💪';
    return 'Study up and try again! 📚';
  };

  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto',
      padding: '40px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }} className="animate-slide-in">

      {/* Main Scorecard Header */}
      <div
        className="card-glass"
        style={{
          textAlign: 'center',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <div>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Quiz Completed!
          </h2>
          <h4 style={{ color: 'var(--primary)', fontWeight: '800', fontSize: 'var(--font-size-md)' }}>
            {getFeedbackMessage()}
          </h4>
        </div>

        {/* Animated Radial Score Gauge */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
          <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="var(--bg-tertiary)"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="var(--success)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {scorePercent}%
            </span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontWeight: '600' }}>
              Accuracy
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          width: '100%',
          gap: '16px',
          borderTop: '1px solid var(--border-glass)',
          paddingTop: '24px',
          marginTop: '8px'
        }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-secondary)' }}>SCORE</div>
            <div style={{ fontSize: 'var(--font-size-md)', fontWeight: '800', color: 'var(--text-primary)' }}>
              {correctCount} / {totalQuestions}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-secondary)' }}>TIME SPENT</div>
            <div style={{ fontSize: 'var(--font-size-md)', fontWeight: '800', color: 'var(--text-primary)' }}>
              {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-secondary)' }}>XP EARNED</div>
            <div style={{ fontSize: 'var(--font-size-md)', fontWeight: '800', color: 'var(--success)' }}>
              +{userUpdates?.xpEarned || 0} XP
            </div>
          </div>
        </div>

        {/* Level Up Banner Alert */}
        {userUpdates?.levelUp && (
          <div
            className="pulse-glow"
            style={{
              width: '100%',
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              color: 'var(--primary)',
              animation: 'slideIn 0.4s ease-out'
            }}
          >
            <Sparkles size={20} fill="var(--primary)" />
            <span style={{ fontWeight: '800', fontSize: 'var(--font-size-base)' }}>
              LEVEL UP! You reached Level {userUpdates.newLevel}! 🚀
            </span>
          </div>
        )}
      </div>

      {/* Button controls */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="success" onClick={handleRestart} icon={<RotateCcw size={16} />}>
          Try Again
        </Button>
        <Button variant="secondary" onClick={handleExit} icon={<Home size={16} />}>
          Go to Dashboard
        </Button>
        <Button variant="primary" onClick={() => setReviewOpen(!reviewOpen)} icon={reviewOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}>
          {reviewOpen ? 'Hide Answer Review' : 'Review Detailed Answers'}
        </Button>
      </div>

      {/* Accordion Review Deck */}
      {reviewOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)', margin: 0 }}>
            Question Review Deck
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {lastResult.reviewDetails.map((q, idx) => {
              const isActive = activeReviewIdx === idx;

              return (
                <div
                  key={q.questionId}
                  className="card-glass"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    borderColor: q.isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    transition: 'all 0.2s'
                  }}
                >
                  {/* Question Header Accordion Trigger */}
                  <button
                    onClick={() => setActiveReviewIdx(isActive ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: 'var(--font-size-base)',
                      color: 'var(--text-primary)',
                      backgroundColor: q.isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                      <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: q.isCorrect ? 'var(--success)' : 'var(--error)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}>
                        {q.isCorrect ? <Check size={14} /> : <X size={14} />}
                      </span>
                      <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {idx + 1}. {q.questionText}
                      </span>
                    </div>
                    {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {/* Accordion Expand Area */}
                  {isActive && (
                    <div style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                        {q.options.map((opt, oIdx) => {
                          let optionColor = 'var(--text-secondary)';
                          let weight = '500';
                          let bg = 'transparent';
                          let border = '1px solid var(--border-glass)';

                          if (oIdx === q.correctAnswer) {
                            optionColor = 'var(--success)';
                            weight = '700';
                            bg = 'var(--success-light)';
                            border = '1px solid var(--success)';
                          } else if (oIdx === q.selectedAnswer && !q.isCorrect) {
                            optionColor = 'var(--error)';
                            weight = '700';
                            bg = 'var(--error-light)';
                            border = '1px solid var(--error)';
                          }

                          return (
                            <div
                              key={oIdx}
                              style={{
                                padding: '10px 14px',
                                borderRadius: '6px',
                                backgroundColor: bg,
                                color: optionColor,
                                border: border,
                                fontWeight: weight,
                                fontSize: 'var(--font-size-sm)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            >
                              <span>{opt}</span>
                              {oIdx === q.correctAnswer && <span style={{ fontSize: '10px', fontWeight: '800' }}>CORRECT</span>}
                              {oIdx === q.selectedAnswer && !q.isCorrect && <span style={{ fontSize: '10px', fontWeight: '800' }}>YOUR ANSWER</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Block */}
                      <div style={{
                        padding: '12px 16px',
                        backgroundColor: 'var(--bg-primary)',
                        borderRadius: 'var(--radius-sm)',
                        borderLeft: '4px solid var(--primary)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--text-secondary)'
                      }}>
                        <span style={{ fontWeight: '800', color: 'var(--text-primary)' }}>Explanation: </span>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default QuizResultPage;
