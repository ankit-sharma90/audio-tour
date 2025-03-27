/**
 * Image Optimizer Utility
 * Handles responsive images and lazy loading
 */

/**
 * Determines if the browser supports modern image formats
 * @returns {Object} Object containing support status for various formats
 */
export const getImageFormatSupport = () => {
  const formats = {
    webp: false,
    avif: false
  };
  
  // Check WebP support
  const webpCheck = new Image();
  webpCheck.onload = function() {
    formats.webp = (webpCheck.width > 0) && (webpCheck.height > 0);
  };
  webpCheck.onerror = function() {
    formats.webp = false;
  };
  webpCheck.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  
  // Check AVIF support
  const avifCheck = new Image();
  avifCheck.onload = function() {
    formats.avif = (avifCheck.width > 0) && (avifCheck.height > 0);
  };
  avifCheck.onerror = function() {
    formats.avif = false;
  };
  avifCheck.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK';
  
  return formats;
};

/**
 * Gets the optimal image URL based on device capabilities
 * @param {string} baseUrl - Base URL for the image
 * @param {number} width - Desired image width
 * @returns {string} The optimized image URL
 */
export const getOptimizedImageUrl = (baseUrl, width) => {
  const formats = getImageFormatSupport();
  const extension = formats.avif ? 'avif' : formats.webp ? 'webp' : 'jpg';
  
  // Remove any existing extension from baseUrl
  const basePath = baseUrl.replace(/\.[^/.]+$/, '');
  
  return `${basePath}_${width}w.${extension}`;
};

/**
 * Creates a srcset attribute for responsive images
 * @param {string} baseUrl - Base URL for the image
 * @param {Array} sizes - Array of image widths to include
 * @returns {string} The srcset attribute value
 */
export const createSrcSet = (baseUrl, sizes = [320, 640, 960, 1280]) => {
  const formats = getImageFormatSupport();
  const extension = formats.avif ? 'avif' : formats.webp ? 'webp' : 'jpg';
  
  // Remove any existing extension from baseUrl
  const basePath = baseUrl.replace(/\.[^/.]+$/, '');
  
  return sizes
    .map(size => `${basePath}_${size}w.${extension} ${size}w`)
    .join(', ');
};

/**
 * Checks if the browser supports native lazy loading
 * @returns {boolean} True if native lazy loading is supported
 */
export const supportsLazyLoading = () => {
  return 'loading' in HTMLImageElement.prototype;
};

/**
 * Checks if the device is on a slow connection
 * @returns {boolean} True if on a slow connection
 */
export const isSlowConnection = () => {
  if (!navigator.connection) return false;
  
  return (
    navigator.connection.saveData ||
    ['slow-2g', '2g'].includes(navigator.connection.effectiveType)
  );
};

/**
 * Determines if high-quality images should be loaded
 * @returns {boolean} True if high-quality images should be loaded
 */
export const shouldLoadHighQuality = () => {
  return !isSlowConnection() && !window.matchMedia('(prefers-reduced-data: reduce)').matches;
};