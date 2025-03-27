import React from 'react';
import { Link } from 'react-router-dom';

const LandmarkCard = ({ landmark }) => {
  // Destructure landmark properties
  const { id, name, shortDescription, imageUrl, city, duration } = landmark;

  return (
    <div className="landmark-card">
      <Link to={`/landmark/${id}`} className="landmark-link">
        <div className="landmark-image-container">
          <img 
            src={imageUrl} 
            alt={name}
            loading="lazy" 
            className="landmark-image"
          />
          <div className="landmark-duration">
            <span>{duration} min</span>
          </div>
        </div>
        <div className="landmark-content">
          <h3 className="landmark-title">{name}</h3>
          <p className="landmark-location">{city}</p>
          <p className="landmark-description">{shortDescription}</p>
        </div>
      </Link>
    </div>
  );
};

export default LandmarkCard;