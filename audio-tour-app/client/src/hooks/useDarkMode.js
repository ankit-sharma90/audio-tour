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
    // Create a visual indicator that toggle is happening
    const toggleIndicator = document.createElement('div');
    toggleIndicator.className = 'theme-transition-indicator';
    document.body.appendChild(toggleIndicator);
    
    // Toggle the theme state first for immediate UI feedback
    toggleDarkMode();
    
    // Handle image processing differently based on direction
    // Going to light mode needs more optimization
    if (darkMode) {
      // When going from dark to light, process in smaller chunks with longer delays
      setTimeout(() => {
        applyDarkModeToAllImages(false);
        // Remove the indicator after processing is complete
        setTimeout(() => toggleIndicator.remove(), 50);
      }, 10);
    } else {
      // When going from light to dark, we can process more quickly
      setTimeout(() => {
        applyDarkModeToAllImages(true);
        // Remove the indicator after processing is complete
        setTimeout(() => toggleIndicator.remove(), 50);
      }, 10);
    }
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