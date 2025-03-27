/**
 * Touch Gesture Utility
 * Provides swipe detection and other touch interactions for mobile
 */

/**
 * Creates a swipe detector for an element
 * @param {HTMLElement} element - The element to detect swipes on
 * @param {Object} callbacks - Callback functions for different swipe directions
 * @param {number} threshold - Minimum distance in pixels to trigger a swipe (default: 50)
 * @returns {Object} Object with cleanup method
 */
export const createSwipeDetector = (element, callbacks = {}, threshold = 50) => {
  let startX = 0;
  let startY = 0;
  let startTime = 0;
  const MAX_SWIPE_TIME = 300; // Maximum time in ms for a gesture to be considered a swipe
  
  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
  };
  
  const handleTouchEnd = (e) => {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    const elapsedTime = Date.now() - startTime;
    
    // Only register as a swipe if it's a quick gesture
    if (elapsedTime > MAX_SWIPE_TIME) return;
    
    // Determine swipe direction
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (Math.abs(diffX) < threshold) return;
      
      if (diffX > 0 && callbacks.right) {
        callbacks.right(e);
      } else if (diffX < 0 && callbacks.left) {
        callbacks.left(e);
      }
    } else {
      // Vertical swipe
      if (Math.abs(diffY) < threshold) return;
      
      if (diffY > 0 && callbacks.down) {
        callbacks.down(e);
      } else if (diffY < 0 && callbacks.up) {
        callbacks.up(e);
      }
    }
    
    // Reset values
    startX = 0;
    startY = 0;
  };
  
  // Add event listeners
  element.addEventListener('touchstart', handleTouchStart, { passive: true });
  element.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Return cleanup function
  return {
    cleanup: () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    }
  };
};

/**
 * Hook to use swipe detection in React components
 * @param {React.RefObject} ref - React ref object for the element
 * @param {Object} callbacks - Callback functions for different swipe directions
 * @param {number} threshold - Minimum distance to trigger a swipe
 */
export const useSwipeDetection = (ref, callbacks = {}, threshold = 50) => {
  React.useEffect(() => {
    if (!ref.current) return;
    
    const detector = createSwipeDetector(ref.current, callbacks, threshold);
    
    return () => {
      detector.cleanup();
    };
  }, [ref, callbacks, threshold]);
};

/**
 * Detects double tap gestures
 * @param {HTMLElement} element - The element to detect double taps on
 * @param {Function} callback - Function to call on double tap
 * @param {number} delay - Maximum delay between taps in ms (default: 300)
 * @returns {Object} Object with cleanup method
 */
export const createDoubleTapDetector = (element, callback, delay = 300) => {
  let lastTap = 0;
  
  const handleTap = (e) => {
    const currentTime = Date.now();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < delay && tapLength > 0) {
      callback(e);
      e.preventDefault();
    }
    
    lastTap = currentTime;
  };
  
  element.addEventListener('touchend', handleTap);
  
  return {
    cleanup: () => {
      element.removeEventListener('touchend', handleTap);
    }
  };
};

/**
 * Adds pinch-to-zoom functionality to an element
 * @param {HTMLElement} element - The element to add pinch zoom to
 * @param {Object} options - Configuration options
 * @returns {Object} Object with cleanup method
 */
export const createPinchZoom = (element, options = {}) => {
  const defaults = {
    minScale: 1,
    maxScale: 3,
    scaleStep: 0.01,
    onZoomStart: () => {},
    onZoom: () => {},
    onZoomEnd: () => {}
  };
  
  const settings = { ...defaults, ...options };
  let startDistance = 0;
  let currentScale = 1;
  let initialScale = 1;
  
  const getDistance = (touches) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };
  
  const handleTouchStart = (e) => {
    if (e.touches.length !== 2) return;
    
    startDistance = getDistance(e.touches);
    initialScale = currentScale;
    settings.onZoomStart(e);
  };
  
  const handleTouchMove = (e) => {
    if (e.touches.length !== 2) return;
    
    const distance = getDistance(e.touches);
    const scale = (distance / startDistance) * initialScale;
    
    // Clamp scale to min/max
    currentScale = Math.min(
      Math.max(settings.minScale, scale),
      settings.maxScale
    );
    
    settings.onZoom(e, currentScale);
  };
  
  const handleTouchEnd = (e) => {
    if (e.touches.length > 0) return;
    settings.onZoomEnd(e, currentScale);
  };
  
  element.addEventListener('touchstart', handleTouchStart);
  element.addEventListener('touchmove', handleTouchMove);
  element.addEventListener('touchend', handleTouchEnd);
  
  return {
    cleanup: () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    },
    getScale: () => currentScale,
    setScale: (scale) => {
      currentScale = Math.min(
        Math.max(settings.minScale, scale),
        settings.maxScale
      );
      return currentScale;
    }
  };
};