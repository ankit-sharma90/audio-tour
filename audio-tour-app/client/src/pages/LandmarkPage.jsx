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

  return (
    <div className="landmark-page">
      <div className="landmark-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${landmark.imageUrl})` }}>
        <div className="landmark-hero-content">
          <h1>{landmark.name}</h1>
          <p className="landmark-location">{landmark.city}</p>
        </div>
      </div>

      <div className="landmark-content">
        <div className="landmark-info-section">
          <h2>About {landmark.name}</h2>
          <p className="landmark-description">{landmark.description}</p>
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
