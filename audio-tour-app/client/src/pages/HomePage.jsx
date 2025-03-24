import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LandmarkCard from '../components/LandmarkCard';
import './HomePage.css';
import { fetchFeaturedLandmarks, fetchCities } from '../services/api';

// Fallback data in case API fails
const fallbackCities = [
  {
    id: 1,
    name: 'San Francisco',
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
    description: 'San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California.',
    landmarkCount: 10
  },
  {
    id: 2,
    name: 'New York',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    description: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean.',
    landmarkCount: 10
  },
  {
    id: 3,
    name: 'Boston',
    imageUrl: 'https://images.unsplash.com/photo-1501979376754-f46f582a0593',
    description: 'Boston is Massachusetts\' capital and largest city. Founded in 1630, it\'s one of the oldest cities in the U.S.',
    landmarkCount: 10
  }
];

const fallbackLandmarks = [
  {
    id: 1,
    name: 'Golden Gate Bridge',
    city: 'San Francisco',
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
    shortDescription: 'An iconic suspension bridge spanning the Golden Gate Strait.'
  },
  {
    id: 2,
    name: 'Statue of Liberty',
    city: 'New York',
    imageUrl: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a',
    shortDescription: 'A colossal neoclassical sculpture on Liberty Island in New York Harbor.'
  },
  {
    id: 3,
    name: 'Freedom Trail',
    city: 'Boston',
    imageUrl: 'https://images.unsplash.com/photo-1569261995036-70d757e4219f',
    shortDescription: 'A 2.5-mile-long path through downtown Boston that passes by 16 locations significant to the history of the United States.'
  }
];

const HomePage = () => {
  const [featuredLandmarks, setFeaturedLandmarks] = useState(fallbackLandmarks);
  const [cities, setCities] = useState(fallbackCities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // In a real app, these would be API calls
        const landmarksData = await fetchFeaturedLandmarks();
        const citiesData = await fetchCities();
        
        if (landmarksData && landmarksData.length > 0) {
          setFeaturedLandmarks(landmarksData);
        }
        
        if (citiesData && citiesData.length > 0) {
          setCities(citiesData);
        }
      } catch (err) {
        console.error(err);
        // We're using fallback data, so no need to show error
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the Stories Behind Famous Landmarks</h1>
          <p>Listen to audio tours for thousands of popular landmarks across the United States</p>
        </div>
      </section>

      <section className="cities-section">
        <h2>Explore by City</h2>
        <div className="cities-grid">
          {cities.map(city => (
            <Link to={`/city/${city.name.toLowerCase()}`} key={city.id} className="city-card">
              <img src={city.imageUrl} alt={city.name} />
              <div className="city-overlay">
                <h3>{city.name}</h3>
                <p>{city.landmarkCount} landmarks</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Landmarks</h2>
        <div className="landmarks-grid">
          {featuredLandmarks.map(landmark => (
            <LandmarkCard key={landmark.id} landmark={landmark} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
