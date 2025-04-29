/**
 * Utility functions for performance optimization
 */

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

/**
 * Throttle function to limit how often a function is called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Runs a function during the browser's idle periods
 * @param {Function} func - The function to run
 */
export const runWhenIdle = (func) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => func());
  } else {
    setTimeout(func, 1);
  }
};

/**
 * Splits a heavy task into smaller chunks to avoid blocking the main thread
 * @param {Array} items - The items to process
 * @param {Function} processItem - Function to process each item
 * @param {number} chunkSize - Number of items to process in each chunk
 */
export const processInChunks = (items, processItem, chunkSize = 5) => {
  const processChunk = (startIndex) => {
    const endIndex = Math.min(startIndex + chunkSize, items.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      processItem(items[i], i);
    }
    
    if (endIndex < items.length) {
      setTimeout(() => {
        processChunk(endIndex);
      }, 0);
    }
  };
  
  processChunk(0);
};