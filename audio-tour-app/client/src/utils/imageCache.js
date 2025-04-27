/**
 * Image Cache Utility
 * Provides caching and prefetching functionality for images
 */

// In-memory cache for images
const imageCache = new Map();

/**
 * Prefetch an image and store it in the cache
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when the image is loaded
 */
export const prefetchImage = (src) => {
  // Skip if already in cache
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src));
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // Store in cache
      imageCache.set(src, img);
      resolve(img);
    };
    
    img.onerror = (error) => {
      reject(error);
    };
    
    img.src = src;
  });
};

/**
 * Prefetch multiple images at once
 * @param {Array} sources - Array of image source URLs
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const prefetchImages = (sources) => {
  return Promise.allSettled(sources.map(src => prefetchImage(src)));
};

/**
 * Check if an image is already cached
 * @param {string} src - Image source URL
 * @returns {boolean} - True if the image is cached
 */
export const isImageCached = (src) => {
  return imageCache.has(src);
};

/**
 * Prefetch images for a specific route or page
 * @param {string} routeName - Name of the route or page
 * @param {Array} imageSources - Array of image sources to prefetch
 */
export const prefetchRouteImages = (routeName, imageSources) => {
  // Skip if already prefetched
  if (sessionStorage.getItem(`prefetched_${routeName}`)) {
    return;
  }
  
  // Prefetch images in the background
  setTimeout(() => {
    prefetchImages(imageSources)
      .then(() => {
        // Mark as prefetched for this session
        sessionStorage.setItem(`prefetched_${routeName}`, 'true');
        console.log(`Prefetched ${imageSources.length} images for ${routeName}`);
      })
      .catch(error => {
        console.warn(`Error prefetching images for ${routeName}:`, error);
      });
  }, 300); // Small delay to not block other resources
};

/**
 * Clear the image cache
 */
export const clearImageCache = () => {
  imageCache.clear();
};

/**
 * Get the size of the image cache
 * @returns {number} - Number of cached images
 */
export const getImageCacheSize = () => {
  return imageCache.size;
};