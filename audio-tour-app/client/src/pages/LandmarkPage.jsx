import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchLandmarkById } from '../services/api';
import './LandmarkPage.css';

const LandmarkPage = () => {
  const { landmarkId } = useParams();
  const [landmark, setLandmark] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const landmarkData = await fetchLandmarkById(landmarkId);
        
        if (landmarkData) {
          setLandmark(landmarkData);
          // Default to the short tour if available
          if (landmarkData.tours && landmarkData.tours.length > 0) {
            const shortTour = landmarkData.tours.find(tour => tour.type === 'short');
            setSelectedTour(shortTour || landmarkData.tours[0]);
          }
        } else {
          setError(`Landmark with ID "${landmarkId}" not found`);
        }
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [landmarkId]);

  const handleTourSelect = (tour) => {
    setSelectedTour(tour);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Create a summary paragraph from the description
  const getSummary = (text) => {
    // Get first 150 characters or first two sentences, whichever is shorter
    const firstSentences = text.split(/[.!?]/).slice(0, 2).join('. ') + '.';
    return text.length > 150 ? text.substring(0, 150) + '...' : firstSentences;
  };

  return (
    <div className="landmark-page">
      <div className="landmark-content">
        <div className="landmark-info-section">
          {/* City name as location indicator */}
          <p className="landmark-location">{landmark.city}</p>
          
          {/* Summary paragraph that will be visible above the scroll line */}
          <p className="landmark-description">
            {getSummary(landmark.description)}
          </p>
          
          <p className="landmark-address"><strong>Address:</strong> {landmark.address}</p>
          <Link to={`/city/${landmark.city.toLowerCase()}`} className="back-to-city">
            View all landmarks in {landmark.city}
          </Link>
        </div>

        <div className="landmark-tour-section">
          <h2>Audio Tours</h2>
          <div className="tour-options">
            {landmark.tours.map(tour => (
              <button
                key={tour.id}
                className={`tour-option ${selectedTour && selectedTour.id === tour.id ? 'active' : ''}`}
                onClick={() => handleTourSelect(tour)}
              >
                {tour.type === 'short' ? 'Short Tour (5 min)' : 'Full Tour (15 min)'}
              </button>
            ))}
          </div>

          {selectedTour && (
            <div className="selected-tour">
              <div className="audio-player">
                <h3>{selectedTour.type === 'short' ? 'Short Tour' : 'Full Tour'}</h3>
                <audio controls src={selectedTour.audioUrl}>
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div className="transcript">
                <h3>Transcript</h3>
                <p>{selectedTour.transcript}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandmarkPage;
