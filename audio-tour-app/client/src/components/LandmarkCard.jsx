import React from 'react';
import { Link } from 'react-router-dom';
import './LandmarkCard.css';

const LandmarkCard = ({ landmark }) => {
  // Ensure landmark is defined with fallback values
  const { 
    id = 0, 
    name = 'Landmark Name', 
    city = 'City', 
    imageUrl = 'https://via.placeholder.com/300x200?text=Landmark', 
    shortDescription = 'This is a placeholder description for this landmark.' 
  } = landmark || {};
  
  return (
    <div className="landmark-card">
      <div className="landmark-image">
        <img src={imageUrl} alt={name} />
        <div className="landmark-city">{city}</div>
      </div>
      <div className="landmark-info">
        <h3>{name}</h3>
        <p>{shortDescription}</p>
        <Link to={`/landmark/${id}`} className="view-button">
          Listen to Tour
        </Link>
      </div>
    </div>
  );
};

export default LandmarkCard;
