import { useState, useEffect } from 'react';

/**
 * Custom hook to monitor network status
 * @returns {Object} Network status information
 */
const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState(null);
  const [effectiveType, setEffectiveType] = useState(null);
  const [saveData, setSaveData] = useState(false);
  
  useEffect(() => {
    // Handle online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Use Network Information API if available
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      // Set initial values
      setConnectionType(connection.type);
      setEffectiveType(connection.effectiveType);
      setSaveData(connection.saveData);
      
      // Listen for changes
      const handleConnectionChange = () => {
        setConnectionType(connection.type);
        setEffectiveType(connection.effectiveType);
        setSaveData(connection.saveData);
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection.removeEventListener('change', handleConnectionChange);
      };
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return {
    isOnline,
    connectionType,
    effectiveType,
    saveData,
    isSlowConnection: effectiveType === 'slow-2g' || effectiveType === '2g'
  };
};

export default useNetworkStatus;