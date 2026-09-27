import React, { useContext, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Award, BookOpen, AlertCircle, ChevronLeft, ShieldAlert } from 'lucide-react';
import { MOCK_QUIZZES } from '../services/mockData';
import { QuizContext } from '../context/QuizContext';
import { UserContext } from '../context/UserContext';
import Button from '../components/common/Button';

const QuizDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startQuiz } = useContext(QuizContext);
  const { history } = useContext(UserContext);

  const quiz = useMemo(() => {
    return MOCK_QUIZZES[id];
  }, [id]);

  // Find user's high score for this quiz from history
  const highPercent = useMemo(() => {
    if (!history || history.length === 0) return null;
    const attempts = history.filter(h => h.quizId === id);
    if (attempts.length === 0) return null;
    return Math.max(...attempts.map(h => h.scorePercent));
  }, [history, id]);

  if (!quiz) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }} className="animate-slide-in">
        <div className="card-glass" style={{ maxWidth: '500px', margin: '0 auto', padding: '32px' }}>
          <ShieldAlert size={48} color="var(--error)" style={{ marginBottom: '16px' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Quiz Not Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            The quiz you are looking for does not exist or has been deleted.
          </p>
          <Button onClick={() => navigate('/categories')}>Back to Categories</Button>
        </div>
      </div>
    );
  }

  const handleStart = () => {
    const success = startQuiz(quiz.id);
    if (success) {
      navigate(`/quiz/${quiz.id}/attempt`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-slide-in">
      
      {/* Back Button */}
      <div>
        <Link
          to="/categories"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontWeight: '600',
            fontSize: 'var(--font-size-sm)',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
          onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          <ChevronLeft size={16} /> Back to Browse
        </Link>
      </div>

      {/* Main Details Body Card */}
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        
        {/* Left Side: Description and Instructions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card-glass" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-primary)', marginBottom: '12px' }}>
              {quiz.title}
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-base)',
              lineHeight: '1.6',
              marginBottom: '32px'
            }}>
              {quiz.description}
            </p>

            {/* Instruction Checklist */}
            <h3 style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Quiz Guidelines
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '16px', marginTop: '2px' }}>⏳</span>
                <div>
                  <h5 style={{ margin: 0, color: 'var(--text-primary)', fontWeight: '700' }}>Non-Pausable Timer</h5>
                  <p style={{ margin: '2px 0 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                    Once started, the timer cannot be paused. Refreshing will resume with elapsed time.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '16px', marginTop: '2px' }}>⚠️</span>
                <div>
                  <h5 style={{ margin: 0, color: 'var(--text-primary)', fontWeight: '700' }}>Auto-Submit Trigger</h5>
                  <p style={{ margin: '2px 0 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                    If the timer runs down to 00:00, your current choices are automatically submitted.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '16px', marginTop: '2px' }}>✨</span>
                <div>
                  <h5 style={{ margin: 0, color: 'var(--text-primary)', fontWeight: '700' }}>XP Progression</h5>
                  <p style={{ margin: '2px 0 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                    Earn 10 XP for each correct response, plus a 10 XP flat participation completion bonus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quiz Metadata Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Metadata Card */}
          <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-primary)', margin: 0 }}>
              Summary Specifications
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Difficulty</span>
                <span style={{ fontWeight: '700', color: quiz.difficulty === 'Easy' ? 'var(--success)' : quiz.difficulty === 'Medium' ? 'var(--warning)' : 'var(--error)' }}>
                  {quiz.difficulty}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Questions</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{quiz.questionsCount} Questions</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Allocated Time</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{quiz.durationMinutes} Minutes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Points</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{quiz.points} Points</span>
              </div>
            </div>

            {/* User High Score display if exists */}
            {highPercent !== null && (
              <div style={{
                backgroundColor: 'var(--success-light)',
                border: '1px solid var(--success)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '24px' }}>🏆</span>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--success-hover)', textTransform: 'uppercase' }}>
                    YOUR HIGH SCORE
                  </div>
                  <div style={{ fontSize: 'var(--font-size-md)', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {highPercent}% Accuracy
                  </div>
                </div>
              </div>
            )}

            {/* Launch trigger button */}
            <Button
              variant="success"
              onClick={handleStart}
              style={{ width: '100%', padding: '16px' }}
              icon={<ChevronLeft style={{ transform: 'rotate(180deg)' }} size={16} />}
            >
              Start Challenge
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizDetailsPage;
