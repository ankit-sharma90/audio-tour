import React from 'react';
import useDarkMode from '../hooks/useDarkMode';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <span className="theme-toggle-icon">☀</span>
      ) : (
        <span className="theme-toggle-icon">☾</span>
      )}
    </button>
  );
};

export default ThemeToggle;