import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LandmarkCard from '../components/LandmarkCard';
import { fetchCityByName, fetchLandmarksByCity } from '../services/api';
import './CityPage.css';

const CityPage = () => {
  const { cityName } = useParams();
  const [city, setCity] = useState(null);
  const [landmarks, setLandmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const cityData = await fetchCityByName(cityName);
        const landmarksData = await fetchLandmarksByCity(cityName);
        
        if (cityData) {
          setCity(cityData);
        } else {
          setError(`City "${cityName}" not found`);
        }
        
        setLandmarks(landmarksData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [cityName]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="city-page">
      <div className="city-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${city.imageUrl})` }}>
        <div className="city-hero-content">
          <h1>{city.name}</h1>
          <p>{city.description}</p>
        </div>
      </div>

      <section className="landmarks-section">
        <h2 className="landmarks-heading">Landmarks in {city.name}</h2>
        {landmarks.length > 0 ? (
          <div className="landmarks-grid">
            {landmarks.map(landmark => (
              <LandmarkCard key={landmark.id} landmark={landmark} />
            ))}
          </div>
        ) : (
          <p className="no-landmarks">No landmarks found for {city.name}.</p>
        )}
      </section>
    </div>
  );
};

export default CityPage;
