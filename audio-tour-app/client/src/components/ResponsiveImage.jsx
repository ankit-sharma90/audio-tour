import React, { useState, useEffect, useRef } from 'react';
import { createSrcSet, supportsLazyLoading, shouldLoadHighQuality } from '../utils/imageOptimizer';

const ResponsiveImage = ({ 
  src, 
  alt, 
  sizes = '(max-width: 768px) 100vw, 50vw',
  widths = [320, 640, 960, 1280],
  className = '',
  lowQualityWidth = 20,
  placeholderColor = '#e0e0e0',
  priority = false, // New prop for priority loading
  maxHeight = null, // New prop to control maximum height
  aspectRatio = null // New prop to control aspect ratio
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  
  // Temporarily disable srcset for direct image loading
  const imageSrcSet = null;
  
  // Determine if we should use native lazy loading
  // Don't use lazy loading for priority images
  const lazyLoadingAttr = !priority && supportsLazyLoading() ? 'lazy' : undefined;
  
  // For low-quality image placeholder (LQIP) - using direct src for now
  const lqipSrc = src;
  
  // Determine if we should load high quality images based on user preferences and connection
  const loadHighQuality = shouldLoadHighQuality();
  
  // Preload priority images
  useEffect(() => {
    if (priority && !isLoaded) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = src; // Use direct source URL
      document.head.appendChild(preloadLink);
      
      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [priority, src, isLoaded]);
  
  // Use Intersection Observer for non-priority images
  useEffect(() => {
    if (!priority && imgRef.current && !isLoaded) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Start loading the image when it's near the viewport
              const img = entry.target;
              img.style.display = 'block';
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: '200px 0px' } // Start loading when image is within 200px of viewport
      );
      
      observer.observe(imgRef.current);
      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, [priority, isLoaded]);
  
  // Handle image load complete
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };
  
  // Handle image load error
  const handleImageError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };
  
  // Calculate appropriate fallback size based on screen width
  const getFallbackSize = () => {
    const screenWidth = window.innerWidth;
    // Find the smallest width that is larger than the screen
    const appropriate = widths.find(w => w >= screenWidth) || widths[widths.length - 1];
    return appropriate;
  };
  
  // Calculate aspect ratio style
  const aspectRatioStyle = aspectRatio ? {
    paddingTop: `${(1 / aspectRatio) * 100}%`
  } : {};
  
  // Calculate max height style
  const maxHeightStyle = maxHeight ? {
    maxHeight: `${maxHeight}px`
  } : {};
  
  return (
    <div 
      className={`responsive-image-container ${className}`}
      style={{ 
        position: 'relative',
        backgroundColor: placeholderColor,
        overflow: 'hidden',
        width: '100%',
        height: 'auto',
        ...maxHeightStyle,
        ...aspectRatioStyle
      }}
    >
      {/* Low quality placeholder image - load immediately */}
      {!isLoaded && !error && (
        <img
          src={lqipSrc}
          alt=""
          className="lqip"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            filter: 'blur(8px)',
            transform: 'scale(1.1)', // Prevent blur edges from showing
            objectFit: 'cover',
            transition: 'opacity 0.2s'
          }}
          onError={() => console.warn(`LQIP failed to load: ${lqipSrc}`)}
        />
      )}
      
      {/* Main image */}
      {!error && loadHighQuality && (
        <img
          ref={imgRef}
          src={src} // Use direct source URL
          alt={alt}
          loading={lazyLoadingAttr}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{
            width: '100%',
            height: 'auto',
            display: priority ? 'block' : 'none', // Only hide non-priority images initially
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.2s'
          }}
        />
      )}
      
      {/* Fallback for errors or data saving mode */}
      {(error || !loadHighQuality) && (
        <div className="image-fallback" style={{ padding: '20px', textAlign: 'center' }}>
          {error ? (
            <span>Unable to load image: {alt}</span>
          ) : (
            <span>Image loading disabled to save data</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;