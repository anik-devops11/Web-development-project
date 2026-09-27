import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { MOCK_QUIZZES } from '../services/mockData';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const { addQuizResult } = useContext(UserContext);

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // map of { questionIndex: optionIndex }
  const [status, setStatus] = useState('idle'); // 'idle', 'active', 'completed'
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  // Crash Recovery: Auto-restore active sessions on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('quizify_active_quiz_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        const quizData = MOCK_QUIZZES[session.quizId];
        if (quizData) {
          setActiveQuiz(quizData);
          setQuestions(quizData.questions);
          setCurrentQuestionIndex(session.currentQuestionIndex || 0);
          setSelectedAnswers(session.selectedAnswers || {});
          setTimeSpent(session.timeSpent || 0);
          setStatus('active');
          console.log('Restored quiz session from crash recovery: ', quizData.title);
        }
      } catch (e) {
        console.error('Failed to restore active quiz session', e);
        localStorage.removeItem('quizify_active_quiz_session');
      }
    }
  }, []);

  // Save active session state to localStorage for crash recovery whenever active variables change
  useEffect(() => {
    if (status === 'active' && activeQuiz) {
      const session = {
        quizId: activeQuiz.id,
        currentQuestionIndex,
        selectedAnswers,
        timeSpent
      };
      localStorage.setItem('quizify_active_quiz_session', JSON.stringify(session));
    } else if (status === 'completed' || status === 'idle') {
      localStorage.removeItem('quizify_active_quiz_session');
    }
  }, [activeQuiz, currentQuestionIndex, selectedAnswers, timeSpent, status]);

  // Active quiz timer hook run
  useEffect(() => {
    let timerId = null;
    if (status === 'active') {
      timerId = setInterval(() => {
        setTimeSpent(prev => {
          // Check if time has exceeded the quiz limit
          if (activeQuiz && prev >= activeQuiz.durationMinutes * 60) {
            clearInterval(timerId);
            // Auto submit when time expires
            setTimeout(() => autoSubmitQuiz(), 10);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [status, activeQuiz]);

  const startQuiz = (quizId) => {
    const quizData = MOCK_QUIZZES[quizId];
    if (!quizData) return false;

    setActiveQuiz(quizData);
    setQuestions(quizData.questions);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeSpent(0);
    setStatus('active');
    setLastResult(null);
    return true;
  };

  const selectOption = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Build the detailed scorecard calculation
  const calculateResultStats = () => {
    if (!activeQuiz || questions.length === 0) return null;

    let correctCount = 0;
    const reviewDetails = questions.map((q, idx) => {
      const selected = selectedAnswers[idx];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        questionText: q.question,
        options: q.options,
        selectedAnswer: selected !== undefined ? selected : null,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        isCorrect
      };
    });

    const scorePercent = Math.round((correctCount / questions.length) * 100);

    return {
      correctCount,
      totalQuestions: questions.length,
      scorePercent,
      timeSpent,
      reviewDetails
    };
  };

  const autoSubmitQuiz = () => {
    submitQuiz();
  };

  const submitQuiz = () => {
    if (status !== 'active') return;

    const stats = calculateResultStats();
    if (!stats) return;

    // Call UserContext to update points, streak, badges
    const userUpdates = addQuizResult(
      activeQuiz.id,
      stats.correctCount,
      stats.totalQuestions,
      stats.scorePercent,
      stats.timeSpent,
      stats.reviewDetails
    );

    const quizResultSummary = {
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      ...stats,
      userUpdates
    };

    setLastResult(quizResultSummary);
    setStatus('completed');
    localStorage.removeItem('quizify_active_quiz_session');
  };

  const exitQuiz = () => {
    setActiveQuiz(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeSpent(0);
    setStatus('idle');
    setLastResult(null);
    localStorage.removeItem('quizify_active_quiz_session');
  };

  return (
    <QuizContext.Provider value={{
      activeQuiz,
      questions,
      currentQuestionIndex,
      selectedAnswers,
      status,
      timeSpent,
      lastResult,
      startQuiz,
      selectOption,
      nextQuestion,
      prevQuestion,
      submitQuiz,
      exitQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};
export default QuizContext;
