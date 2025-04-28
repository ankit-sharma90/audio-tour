/**
 * Utility functions for handling images in dark mode
 */

/**
 * Applies dark mode filter to an image element
 * @param {HTMLImageElement} imgElement - The image element to apply filter to
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
export const applyDarkModeFilter = (imgElement, isDarkMode) => {
  if (!imgElement) return;
  
  if (isDarkMode) {
    imgElement.style.filter = 'brightness(0.8) contrast(0.85) sepia(0.15) hue-rotate(320deg)';
  } else {
    imgElement.style.filter = 'none';
  }
};

/**
 * Hook to apply dark mode filter to all images on a page
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
export const applyDarkModeToAllImages = (isDarkMode) => {
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    // Use a more efficient selector if possible
    const images = document.querySelectorAll('img');
    
    // Process in chunks to avoid blocking the main thread
    const processImagesInChunks = (startIndex, chunkSize) => {
      const endIndex = Math.min(startIndex + chunkSize, images.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        applyDarkModeFilter(images[i], isDarkMode);
      }
      
      if (endIndex < images.length) {
        setTimeout(() => {
          processImagesInChunks(endIndex, chunkSize);
        }, 0);
      }
    };
    
    // Process 10 images at a time
    processImagesInChunks(0, 10);
  });
};

/**
 * Creates a dark mode compatible image URL
 * @param {string} originalUrl - Original image URL
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {string} - URL with dark mode parameter if needed
 */
export const getDarkModeImageUrl = (originalUrl, isDarkMode) => {
  if (!isDarkMode) return originalUrl;
  
  // For server-side dark mode image processing (if implemented)
  // This is a placeholder implementation
  const url = new URL(originalUrl, window.location.origin);
  url.searchParams.append('darkMode', 'true');
  return url.toString();
};