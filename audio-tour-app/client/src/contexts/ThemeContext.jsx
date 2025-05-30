import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference stored in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    // Also check for system preference if no saved preference
    const prefersDark = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return savedTheme ? JSON.parse(savedTheme) : prefersDark;
  });

  // Update localStorage and apply theme when darkMode changes
  useEffect(() => {
    // Use requestAnimationFrame to apply theme changes during the next paint
    requestAnimationFrame(() => {
      // Apply theme to document first for better perceived performance
      if (darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        // Add a class to body for easier targeting
        document.body.classList.add('dark-theme');
      } else {
        document.documentElement.removeAttribute('data-theme');
        // Remove the class from body
        document.body.classList.remove('dark-theme');
      }
      
      // Optimize paint performance by forcing a repaint of just the background
      const tempDiv = document.createElement('div');
      tempDiv.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0.01;';
      document.body.appendChild(tempDiv);
      
      // Force a reflow
      void tempDiv.offsetHeight;
      
      // Clean up
      document.body.removeChild(tempDiv);
      
      // Then save to localStorage (less time-sensitive)
      setTimeout(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
      }, 50);
    });
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    // Add listener for theme changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};