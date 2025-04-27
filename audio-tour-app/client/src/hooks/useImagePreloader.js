import { useEffect } from 'react';
import { prefetchImages, prefetchRouteImages } from '../utils/imageCache';

/**
 * Hook to preload critical images for a page
 * @param {Array} images - Array of image URLs to preload
 * @param {Object} options - Options for preloading
 * @param {string} options.routeName - Name of the current route for caching
 * @param {boolean} options.immediate - Whether to load immediately or with a delay
 * @param {number} options.priority - Priority order (lower numbers load first)
 */
const useImagePreloader = (images, options = {}) => {
  const { 
    routeName = window.location.pathname,
    immediate = false,
    priority = 1
  } = options;
  
  useEffect(() => {
    if (!images || images.length === 0) return;
    
    if (immediate) {
      // Load immediately for critical images
      prefetchImages(images)
        .catch(err => console.warn('Error preloading images:', err));
    } else {
      // Use the route-based prefetching with delay
      prefetchRouteImages(routeName, images);
    }
  }, [images, routeName, immediate, priority]);
};

export default useImagePreloader;