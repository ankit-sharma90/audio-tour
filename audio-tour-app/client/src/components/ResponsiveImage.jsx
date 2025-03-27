import React, { useState } from 'react';
import { createSrcSet, supportsLazyLoading, shouldLoadHighQuality } from '../utils/imageOptimizer';

const ResponsiveImage = ({ 
  src, 
  alt, 
  sizes = '(max-width: 768px) 100vw, 50vw',
  widths = [320, 640, 960, 1280],
  className = '',
  lowQualityWidth = 20,
  placeholderColor = '#e0e0e0'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Generate srcset for responsive loading
  const imageSrcSet = createSrcSet(src, widths);
  
  // Determine if we should use native lazy loading
  const lazyLoadingAttr = supportsLazyLoading() ? 'lazy' : undefined;
  
  // For low-quality image placeholder (LQIP)
  const lqipSrc = `${src.replace(/\.[^/.]+$/, '')}_${lowQualityWidth}w.jpg`;
  
  // Determine if we should load high quality images based on user preferences and connection
  const loadHighQuality = shouldLoadHighQuality();
  
  // Handle image load complete
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };
  
  // Handle image load error
  const handleImageError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };
  
  return (
    <div 
      className={`responsive-image-container ${className}`}
      style={{ 
        position: 'relative',
        backgroundColor: placeholderColor,
        overflow: 'hidden'
      }}
    >
      {/* Low quality placeholder image */}
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
            filter: 'blur(10px)',
            transform: 'scale(1.1)', // Prevent blur edges from showing
            objectFit: 'cover'
          }}
        />
      )}
      
      {/* Main image */}
      {!error && loadHighQuality && (
        <img
          srcSet={imageSrcSet}
          sizes={sizes}
          src={`${src.replace(/\.[^/.]+$/, '')}_640w.jpg`} // Fallback
          alt={alt}
          loading={lazyLoadingAttr}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{
            width: '100%',
            height: 'auto',
            display: isLoaded ? 'block' : 'none'
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