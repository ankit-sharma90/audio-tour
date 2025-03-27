import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (!showStatus) return null;
  
  return (
    <div className={`network-status ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? (
        <p>You're back online! Content will sync automatically.</p>
      ) : (
        <p>You're offline. Some features may be limited.</p>
      )}
    </div>
  );
};

export default NetworkStatus;