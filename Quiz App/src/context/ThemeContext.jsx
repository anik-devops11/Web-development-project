import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // 1. Check local storage first
    const savedTheme = localStorage.getItem('quizify_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // 2. Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    // 3. Fallback to dark
    return 'dark';
  });

  useEffect(() => {
    // Update data attribute on root HTML node
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('quizify_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const setExplicitTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setExplicitTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
