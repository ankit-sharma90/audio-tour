import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';

const LandmarkCard = ({ landmark }) => {
  // Destructure landmark properties
  const { id, name, shortDescription, imageUrl, city, duration } = landmark;
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="landmark-card">
      <Link to={`/landmark/${id}`} className="landmark-link">
        {/* Only show image on desktop view */}
        {!isMobile && (
          <div className="landmark-image-container">
            <img 
              src={imageUrl} 
              alt={name}
              loading="lazy" 
              className="landmark-image"
              onError={(e) => {
                console.error(`Failed to load landmark image: ${e.target.src}`);
                // Fallback to a local image based on landmark name
                const landmarkKey = name.toLowerCase().replace(/\s+/g, '_');
                e.target.src = `/images/${landmarkKey}.jpg`;
              }}
            />
            <div className="landmark-duration">
              <span>{duration} min</span>
            </div>
          </div>
        )}
        <div className="landmark-content">
          <h3 className="landmark-title">{name}</h3>
          {isMobile && (
            <div className="landmark-duration-mobile">
              <span>{duration} min</span>
            </div>
          )}
          <p className="landmark-location">{city}</p>
          <p className="landmark-description">{shortDescription}</p>
        </div>
      </Link>
    </div>
  );
};

export default LandmarkCard;