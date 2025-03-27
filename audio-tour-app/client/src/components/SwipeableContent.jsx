import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSwipeDetector } from '../utils/touchGestures';

/**
 * A component that adds swipe navigation to content
 * Allows users to swipe between landmarks or pages
 */
const SwipeableContent = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight,
  nextUrl,
  prevUrl,
  className = '',
  threshold = 70
}) => {
  const contentRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!contentRef.current) return;
    
    const handleSwipeLeft = (e) => {
      if (onSwipeLeft) {
        onSwipeLeft(e);
      } else if (nextUrl) {
        navigate(nextUrl);
      }
    };
    
    const handleSwipeRight = (e) => {
      if (onSwipeRight) {
        onSwipeRight(e);
      } else if (prevUrl) {
        navigate(prevUrl);
      }
    };
    
    const detector = createSwipeDetector(
      contentRef.current, 
      {
        left: handleSwipeLeft,
        right: handleSwipeRight
      },
      threshold
    );
    
    return () => {
      detector.cleanup();
    };
  }, [onSwipeLeft, onSwipeRight, nextUrl, prevUrl, navigate, threshold]);
  
  return (
    <div 
      ref={contentRef} 
      className={`swipeable-content ${className}`}
      style={{ touchAction: 'pan-y' }} // Allow vertical scrolling
    >
      {children}
      
      {/* Visual indicators for swipe navigation */}
      {(nextUrl || onSwipeLeft) && (
        <div className="swipe-indicator swipe-indicator-right">
          <span className="swipe-arrow">›</span>
        </div>
      )}
      
      {(prevUrl || onSwipeRight) && (
        <div className="swipe-indicator swipe-indicator-left">
          <span className="swipe-arrow">‹</span>
        </div>
      )}
    </div>
  );
};

export default SwipeableContent;