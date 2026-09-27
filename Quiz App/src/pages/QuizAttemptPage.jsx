import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, X, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { QuizContext } from '../context/QuizContext';
import { useAudio } from '../hooks/useAudio';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import Timer from '../components/common/Timer';
import Modal from '../components/common/Modal';

const QuizAttemptPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    activeQuiz,
    questions,
    currentQuestionIndex,
    selectedAnswers,
    status,
    timeSpent,
    selectOption,
    nextQuestion,
    submitQuiz,
    exitQuiz
  } = useContext(QuizContext);

  const { playSound } = useAudio();

  const [confirmExitOpen, setConfirmExitOpen] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [shakeActive, setShakeActive] = useState(false);

  // Keyboard binding shortcuts (1, 2, 3, 4 for options selection; Enter to check/next)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status !== 'active' || confirmExitOpen) return;

      const key = e.key;
      // Option Selection (keys 1-4)
      if (['1', '2', '3', '4'].includes(key) && !hasChecked) {
        const optionIdx = parseInt(key) - 1;
        const activeQuestion = questions[currentQuestionIndex];
        if (activeQuestion && optionIdx < activeQuestion.options.length) {
          playSound('click');
          selectOption(currentQuestionIndex, optionIdx);
        }
      }

      // Enter key checks or moves next
      if (key === 'Enter') {
        const hasSelection = selectedAnswers[currentQuestionIndex] !== undefined;
        if (hasSelection) {
          if (!hasChecked) {
            handleCheckAnswer();
          } else {
            handleNextStep();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, currentQuestionIndex, selectedAnswers, hasChecked, questions, confirmExitOpen, playSound, selectOption]);

  // If no active quiz loaded, redirect to details page
  useEffect(() => {
    if (status === 'idle') {
      navigate(`/quiz/${id}`);
    } else if (status === 'completed') {
      navigate(`/quiz/${id}/result`);
    }
  }, [status, id, navigate]);

  if (!activeQuiz || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const userSelection = selectedAnswers[currentQuestionIndex];
  const isSelected = userSelection !== undefined;

  const handleCheckAnswer = () => {
    if (!isSelected || hasChecked) return;

    setHasChecked(true);
    const isCorrect = userSelection === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('incorrect');
      setShakeActive(true);
      setTimeout(() => setShakeActive(false), 400); // clear shake animation
    }
  };

  const handleNextStep = () => {
    setHasChecked(false);
    if (currentQuestionIndex === questions.length - 1) {
      submitQuiz();
    } else {
      nextQuestion();
    }
  };

  const handleExitConfirm = () => {
    setConfirmExitOpen(false);
    exitQuiz();
    navigate(`/quiz/${id}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Top Header Controls Bar */}
      <div style={{
        height: '72px',
        borderBottom: '1px solid var(--border-glass)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-secondary)',
        gap: '20px'
      }}>
        {/* Exit Button */}
        <button
          onClick={() => setConfirmExitOpen(true)}
          style={{
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          title="Exit Quiz"
        >
          <X size={20} />
        </button>

        {/* Progress Bar Center */}
        <div style={{ flex: 1, maxWidth: '600px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: '800', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <ProgressBar
            value={currentQuestionIndex + (hasChecked ? 1 : 0)}
            max={questions.length}
            height="10px"
          />
        </div>

        {/* Circular Countdown Timer */}
        <div style={{ paddingLeft: '8px' }}>
          <Timer
            duration={activeQuiz.durationMinutes * 60}
            elapsed={timeSpent}
            size={52}
            strokeWidth={4}
          />
        </div>
      </div>

      {/* Main Focus Question Viewport */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px 140px 24px' // padding at bottom to avoid footer overlap
      }}>
        <div
          className={`card-glass ${shakeActive ? 'animate-shake' : ''}`}
          style={{
            width: '100%',
            maxWidth: '680px',
            padding: '32px',
            backgroundColor: 'var(--bg-secondary)',
            boxShadow: 'var(--shadow-md)',
            animation: 'slideIn 0.35s ease-out'
          }}
        >
          {/* Points indicator */}
          <div style={{
            display: 'inline-flex',
            fontSize: '10px',
            fontWeight: '800',
            color: 'var(--primary)',
            backgroundColor: 'var(--primary-light)',
            padding: '4px 8px',
            borderRadius: '4px',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            {currentQuestion.points} Points
          </div>

          {/* Question Text */}
          <h3 style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--text-primary)',
            lineHeight: '1.4',
            marginBottom: '28px'
          }}>
            {currentQuestion.question}
          </h3>

          {/* Options Grid Layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentQuestion.options.map((option, idx) => {
              const isSelectedOption = userSelection === idx;
              
              // Option states colors logic
              let borderStyle = '1px solid var(--border-glass)';
              let bgStyle = 'rgba(255,255,255,0.02)';
              let iconElement = null;

              if (hasChecked) {
                // Check state styling overrides
                if (idx === currentQuestion.correctAnswer) {
                  borderStyle = '2px solid var(--success)';
                  bgStyle = 'var(--success-light)';
                  iconElement = <CheckCircle2 size={16} color="var(--success)" />;
                } else if (isSelectedOption) {
                  borderStyle = '2px solid var(--error)';
                  bgStyle = 'var(--error-light)';
                  iconElement = <XCircle size={16} color="var(--error)" />;
                } else {
                  bgStyle = 'rgba(0,0,0,0.1)';
                  borderStyle = '1px solid var(--border-glass)';
                  // opacity faders
                }
              } else if (isSelectedOption) {
                // Normal Selection highlight
                borderStyle = '2px solid var(--primary)';
                bgStyle = 'var(--primary-light)';
              }

              return (
                <button
                  key={idx}
                  disabled={hasChecked}
                  onClick={() => {
                    playSound('click');
                    selectOption(currentQuestionIndex, idx);
                  }}
                  className={`option-btn ${isSelectedOption && !hasChecked ? 'animate-pop' : ''}`}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: borderStyle,
                    backgroundColor: bgStyle,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: hasChecked ? 'not-allowed' : 'pointer',
                    fontWeight: isSelectedOption ? '700' : '500',
                    fontSize: 'var(--font-size-base)',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    opacity: hasChecked && idx !== currentQuestion.correctAnswer && !isSelectedOption ? 0.35 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Shortcut indicator icon */}
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      backgroundColor: isSelectedOption ? 'var(--primary)' : 'var(--bg-tertiary)',
                      color: isSelectedOption ? 'white' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: '800'
                    }}>
                      {idx + 1}
                    </span>
                    <span>{option}</span>
                  </div>
                  {iconElement}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Sticky Dual-Phase Footer Action Bar */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: hasChecked
          ? (userSelection === currentQuestion.correctAnswer ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)')
          : 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-glass)',
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 90,
        transition: 'background-color 0.3s ease'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '680px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {/* Explanation / Verification Display */}
          {hasChecked ? (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1, minWidth: '250px' }}>
              <span style={{ fontSize: '28px' }}>
                {userSelection === currentQuestion.correctAnswer ? '🎉' : '💡'}
              </span>
              <div>
                <h4 style={{
                  margin: 0,
                  color: userSelection === currentQuestion.correctAnswer ? 'var(--success)' : 'var(--error)',
                  fontWeight: '800'
                }}>
                  {userSelection === currentQuestion.correctAnswer ? 'Correct Answer!' : 'Incorrect Answer'}
                </h4>
                <p style={{ margin: '4px 0 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: '600' }}>
                💡 Tip: Press numeric keys 1, 2, 3, or 4 on your keyboard to select an option, and Enter to check/submit.
              </span>
            </div>
          )}

          {/* Action Trigger Buttons */}
          <div>
            {!hasChecked ? (
              <Button
                variant="success"
                onClick={handleCheckAnswer}
                disabled={!isSelected}
                style={{ minWidth: '150px' }}
              >
                Check Answer
              </Button>
            ) : (
              <Button
                variant={userSelection === currentQuestion.correctAnswer ? 'success' : 'danger'}
                onClick={handleNextStep}
                style={{ minWidth: '150px' }}
                icon={<ChevronRight size={16} />}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Results' : 'Next Question'}
              </Button>
            )}
          </div>
        </div>
      </footer>

      {/* Exit Warning Modal */}
      <Modal
        isOpen={confirmExitOpen}
        onClose={() => setConfirmExitOpen(false)}
        title="Wait, don't leave! 🛑"
        size="sm"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, lineHeight: '1.5' }}>
            Are you sure you want to exit this quiz attempt? Your active progress will be deleted, and this session will be recorded as incomplete.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button variant="secondary" onClick={() => setConfirmExitOpen(false)}>
              Keep Playing
            </Button>
            <Button variant="danger" onClick={handleExitConfirm}>
              Exit and Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <style>
        {`
          .option-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            border-color: var(--primary);
            background-color: var(--primary-light);
          }
        `}
      </style>
    </div>
  );
};

export default QuizAttemptPage;
