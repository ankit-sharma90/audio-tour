import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design
 * @param {string} query - Media query string
 * @returns {boolean} - Whether the media query matches
 */
export const useMediaQuery = (query) => {
  // Initialize with a default value based on the current window size
  const getMatches = (query) => {
    // Check if window is available (for SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Update the state initially and whenever the media query changes
    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };
    
    // Add the callback as a listener
    mediaQuery.addEventListener('change', updateMatches);
    
    // Call once initially to set the correct value
    updateMatches();
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
};