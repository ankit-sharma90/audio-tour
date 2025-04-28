import { useContext, useCallback, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { applyDarkModeToAllImages } from '../utils/imageUtils';

/**
 * Custom hook to handle dark mode with performance optimizations
 * @returns {Object} darkMode state and toggle function
 */
const useDarkMode = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  
  // Optimize image processing
  const optimizedToggle = useCallback(() => {
    // Toggle the theme state first for immediate UI feedback
    toggleDarkMode();
    
    // Defer non-critical operations
    setTimeout(() => {
      // Apply image filters after a short delay to avoid blocking the main thread
      applyDarkModeToAllImages(!darkMode);
    }, 50);
  }, [darkMode, toggleDarkMode]);
  
  // Apply image filters on initial render with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      applyDarkModeToAllImages(darkMode);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    darkMode,
    toggleDarkMode: optimizedToggle
  };
};

export default useDarkMode;