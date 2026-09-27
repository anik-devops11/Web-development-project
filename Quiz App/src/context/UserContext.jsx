import React, { createContext, useState, useEffect } from 'react';
import { MOCK_QUIZZES } from '../services/mockData';

export const UserContext = createContext();

const DEFAULT_USER_STATE = {
  username: 'Guest Explorer',
  avatar: '🧠',
  xp: 0,
  level: 1,
  streak: 0,
  lastQuizDate: null,
  history: [],
  unlockedBadges: [],
  soundEnabled: true,
  volume: 0.5
};

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(() => {
    const saved = localStorage.getItem('quizify_user_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all default keys exist
        return { ...DEFAULT_USER_STATE, ...parsed };
      } catch (e) {
        console.error('Failed to parse user data from localStorage', e);
        return DEFAULT_USER_STATE;
      }
    }
    return DEFAULT_USER_STATE;
  });

  useEffect(() => {
    localStorage.setItem('quizify_user_data', JSON.stringify(userState));
  }, [userState]);

  // Update profile variables
  const updateProfile = (username, avatar) => {
    setUserState(prev => ({
      ...prev,
      username: username.trim() || prev.username,
      avatar: avatar || prev.avatar
    }));
  };

  // Sound settings
  const toggleSound = () => {
    setUserState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  const setVolume = (vol) => {
    setUserState(prev => ({
      ...prev,
      volume: Math.max(0, Math.min(1, vol))
    }));
  };

  // Streak engine: evaluate streak status based on calendar days
  const checkAndUpdateStreak = () => {
    const today = new Date().toDateString();
    const lastDate = userState.lastQuizDate;

    if (!lastDate) {
      // First attempt ever
      return { streak: 1, lastQuizDate: today };
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastDate === today) {
      // Already completed a quiz today, streak remains unchanged
      return { streak: userState.streak, lastQuizDate: today };
    } else if (lastDate === yesterdayStr) {
      // Streak continues!
      return { streak: userState.streak + 1, lastQuizDate: today };
    } else {
      // Break in streak, reset to 1
      return { streak: 1, lastQuizDate: today };
    }
  };

  // Award XP and evaluate leveling
  const calculateXPEarned = (correctCount, totalQuestions, scorePercent) => {
    const baseXP = correctCount * 10; // 10 XP per correct question
    const completionBonus = 10; // 10 XP flat participation award
    const speedBonus = 0; // Can trigger dynamically if checked in attempt page
    return baseXP + completionBonus;
  };

  // Core function to append quiz result, award XP, compute level ups, and award achievements/badges
  const addQuizResult = (quizId, correctCount, totalQuestions, scorePercent, timeSpentSeconds, answersReview) => {
    const quizDetails = MOCK_QUIZZES[quizId];
    if (!quizDetails) return null;

    // Calculate XP
    const xpEarned = calculateXPEarned(correctCount, totalQuestions, scorePercent);
    const newXP = userState.xp + xpEarned;
    
    // Level calculation: 100 XP per level
    const newLevel = Math.floor(newXP / 100) + 1;
    const isLevelUp = newLevel > userState.level;

    // Evaluate Streak
    const streakUpdates = checkAndUpdateStreak();

    // Setup history record
    const historyItem = {
      id: `history_${Date.now()}`,
      quizId,
      quizTitle: quizDetails.title,
      categoryId: quizDetails.categoryId,
      correctCount,
      totalQuestions,
      scorePercent,
      timeSpentSeconds,
      xpEarned,
      timestamp: Date.now(),
      dateString: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      answersReview // holds choice details for UI rendering later
    };

    // Evaluate Badge Unlocking
    const newlyUnlockedBadges = [...userState.unlockedBadges];
    
    // Perfect Score badge
    if (scorePercent === 100 && !newlyUnlockedBadges.includes('badge_perfect_score')) {
      newlyUnlockedBadges.push('badge_perfect_score');
    }

    // Speed Demon badge: finished in less than 50% time
    const allocatedSeconds = quizDetails.durationMinutes * 60;
    if (timeSpentSeconds < (allocatedSeconds / 2) && scorePercent >= 70 && !newlyUnlockedBadges.includes('badge_speed_demon')) {
      newlyUnlockedBadges.push('badge_speed_demon');
    }

    // Unstoppable streak badge
    if (streakUpdates.streak >= 5 && !newlyUnlockedBadges.includes('badge_streak_5')) {
      newlyUnlockedBadges.push('badge_streak_5');
    }

    // Quiz Master badge: check if all programming category quizzes are completed
    if (quizDetails.categoryId === 'programming') {
      const programmingQuizIds = Object.values(MOCK_QUIZZES)
        .filter(q => q.categoryId === 'programming')
        .map(q => q.id);
      
      const finishedHistoryIds = [
        ...userState.history.map(h => h.quizId),
        quizId
      ];

      const allProgrammingDone = programmingQuizIds.every(id => finishedHistoryIds.includes(id));
      if (allProgrammingDone && !newlyUnlockedBadges.includes('badge_quiz_master')) {
        newlyUnlockedBadges.push('badge_quiz_master');
      }
    }

    // Update global state
    setUserState(prev => ({
      ...prev,
      xp: newXP,
      level: newLevel,
      streak: streakUpdates.streak,
      lastQuizDate: streakUpdates.lastQuizDate,
      history: [historyItem, ...prev.history],
      unlockedBadges: newlyUnlockedBadges
    }));

    return {
      xpEarned,
      levelUp: isLevelUp,
      newLevel,
      newlyUnlocked: newlyUnlockedBadges.length > userState.unlockedBadges.length
    };
  };

  // Reset database completely
  const resetData = () => {
    setUserState(DEFAULT_USER_STATE);
    localStorage.removeItem('quizify_user_data');
    localStorage.removeItem('quizify_active_quiz_session');
  };

  return (
    <UserContext.Provider value={{
      ...userState,
      updateProfile,
      toggleSound,
      setVolume,
      addQuizResult,
      resetData
    }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
