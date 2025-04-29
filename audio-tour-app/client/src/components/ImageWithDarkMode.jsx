import React, { useEffect, useRef } from 'react';
import useTheme from '../hooks/useTheme';
import { applyDarkModeFilter } from '../utils/imageUtils';

/**
 * Component that renders an image with dark mode support
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {Object} props.style - Additional style properties
 * @param {string} props.className - CSS class names
 */
const ImageWithDarkMode = ({ src, alt, style = {}, className = '', ...props }) => {
  const { darkMode } = useTheme();
  const imgRef = useRef(null);
  
  useEffect(() => {
    if (imgRef.current) {
      applyDarkModeFilter(imgRef.current, darkMode);
    }
  }, [darkMode]);
  
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`dark-mode-image ${className}`}
      style={style}
      {...props}
    />
  );
};

export default ImageWithDarkMode;