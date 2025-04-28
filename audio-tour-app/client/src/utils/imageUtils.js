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
  
  // Use classList to toggle a class instead of directly setting style
  // This is more performant as it avoids style recalculation
  if (isDarkMode) {
    imgElement.classList.add('dark-mode-image');
    imgElement.style.filter = ''; // Remove inline style if any
  } else {
    imgElement.classList.remove('dark-mode-image');
    imgElement.style.filter = ''; // Remove inline style if any
  }
};

/**
 * Hook to apply dark mode filter to all images on a page
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
export const applyDarkModeToAllImages = (isDarkMode) => {
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    // Get only visible images for initial processing
    const allImages = Array.from(document.querySelectorAll('img'));
    
    // Separate visible and non-visible images
    const visibleImages = [];
    const nonVisibleImages = [];
    
    allImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const isVisible = (
        rect.top >= -rect.height &&
        rect.left >= -rect.width &&
        rect.bottom <= window.innerHeight + rect.height &&
        rect.right <= window.innerWidth + rect.width
      );
      
      if (isVisible) {
        visibleImages.push(img);
      } else {
        nonVisibleImages.push(img);
      }
    });
    
    // Process in chunks to avoid blocking the main thread
    const processImagesInChunks = (images, startIndex, chunkSize, delay) => {
      const endIndex = Math.min(startIndex + chunkSize, images.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        applyDarkModeFilter(images[i], isDarkMode);
      }
      
      if (endIndex < images.length) {
        setTimeout(() => {
          processImagesInChunks(images, endIndex, chunkSize, delay);
        }, delay);
      }
    };
    
    // Process visible images first with smaller chunks and faster timing
    processImagesInChunks(visibleImages, 0, isDarkMode ? 10 : 5, isDarkMode ? 0 : 5);
    
    // Then process non-visible images with larger delay
    setTimeout(() => {
      processImagesInChunks(nonVisibleImages, 0, 20, 10);
    }, 100);
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