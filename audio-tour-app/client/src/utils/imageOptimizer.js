/**
 * Image Optimizer Utility
 * Handles responsive images and lazy loading
 */

// Cache format support results to avoid redundant checks
let formatSupportCache = null;

/**
 * Determines if the browser supports modern image formats
 * @returns {Object} Object containing support status for various formats
 */
export const getImageFormatSupport = () => {
  // Return cached result if available
  if (formatSupportCache) return formatSupportCache;
  
  const formats = {
    webp: false,
    avif: false
  };
  
  // Use feature detection for WebP
  if (self.createImageBitmap) {
    const webpData = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    fetch(webpData)
      .then(r => r.blob())
      .then(blob => {
        createImageBitmap(blob).then(() => {
          formats.webp = true;
          formatSupportCache = {...formats};
        }).catch(() => {
          formats.webp = false;
          formatSupportCache = {...formats};
        });
      }).catch(() => {
        formats.webp = false;
        formatSupportCache = {...formats};
      });
  }
  
  // Check AVIF support more efficiently
  if ('HTMLPictureElement' in window) {
    const avif = document.createElement('img');
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK';
    avif.onload = () => {
      formats.avif = true;
      formatSupportCache = {...formats};
    };
    avif.onerror = () => {
      formats.avif = false;
      formatSupportCache = {...formats};
    };
  }
  
  // Cache the results for future calls
  formatSupportCache = {...formats};
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
  
  // Sort sizes in ascending order for better browser handling
  const sortedSizes = [...sizes].sort((a, b) => a - b);
  
  return sortedSizes
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