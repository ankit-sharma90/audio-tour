import { useState, useEffect } from 'react';

/**
 * Custom hook to manage offline caching of content
 * @param {string} key - Unique identifier for the cached content
 * @param {Function} fetchFunction - Function to fetch the data if not cached
 * @returns {Object} The cached data and status information
 */
const useOfflineCache = (key, fetchFunction) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCached, setIsCached] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // First try to get from localStorage
        const cachedData = localStorage.getItem(`offline_${key}`);
        
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setIsCached(true);
          setIsLoading(false);
          
          // If we're online, fetch fresh data in the background
          if (navigator.onLine) {
            try {
              const freshData = await fetchFunction();
              localStorage.setItem(`offline_${key}`, JSON.stringify(freshData));
              setData(freshData);
            } catch (backgroundError) {
              console.warn('Background refresh failed:', backgroundError);
            }
          }
        } else if (navigator.onLine) {
          // No cached data, fetch fresh if online
          const freshData = await fetchFunction();
          localStorage.setItem(`offline_${key}`, JSON.stringify(freshData));
          setData(freshData);
          setIsLoading(false);
        } else {
          // Offline with no cache
          throw new Error('No cached data available while offline');
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [key, fetchFunction]);
  
  // Function to manually update the cache
  const updateCache = async () => {
    if (!navigator.onLine) {
      return { success: false, message: 'Cannot update while offline' };
    }
    
    try {
      setIsLoading(true);
      const freshData = await fetchFunction();
      localStorage.setItem(`offline_${key}`, JSON.stringify(freshData));
      setData(freshData);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, message: err.message };
    }
  };
  
  return { data, isLoading, error, isCached, updateCache };
};

export default useOfflineCache;