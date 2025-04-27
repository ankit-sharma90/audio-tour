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
    imageUrl: '/images/san_francisco.jpg',
    description: 'San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California.',
    landmarkCount: 10
  },
  {
    id: 2,
    name: 'New York',
    imageUrl: '/images/new_york.jpg',
    description: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean.',
    landmarkCount: 10
  },
  {
    id: 3,
    name: 'Boston',
    imageUrl: '/images/boston.jpg',
    description: 'Boston is Massachusetts\' capital and largest city. Founded in 1630, it\'s one of the oldest cities in the U.S.',
    landmarkCount: 10
  }
];

const fallbackLandmarks = [
  {
    id: 1,
    name: 'Golden Gate Bridge',
    city: 'San Francisco',
    imageUrl: '/images/golden_gate.jpg',
    shortDescription: 'An iconic suspension bridge spanning the Golden Gate Strait.',
    duration: 10
  },
  {
    id: 2,
    name: 'Statue of Liberty',
    city: 'New York',
    imageUrl: '/images/statue_liberty.jpg',
    shortDescription: 'A colossal neoclassical sculpture on Liberty Island in New York Harbor.',
    duration: 12
  },
  {
    id: 3,
    name: 'Freedom Trail',
    city: 'Boston',
    imageUrl: '/images/freedom_trail.jpg',
    shortDescription: 'A 2.5-mile-long path through downtown Boston that passes by 16 locations significant to the history of the United States.',
    duration: 15
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
    
    // Preload all city images to ensure they load quickly
    // This is especially important for the Boston image that wasn't loading
    const preloadAllImages = () => {
      // Preload with high priority
      const bostonImage = new Image();
      bostonImage.importance = 'high'; // Modern browsers support this attribute
      bostonImage.src = fallbackCities[2].imageUrl; // Boston is index 2
      
      // Preload other images with normal priority
      fallbackCities.forEach((city, index) => {
        if (index !== 2) { // Skip Boston as we already loaded it
          const img = new Image();
          img.src = city.imageUrl;
        }
      });
    };
    
    preloadAllImages();
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
              <img 
                src={city.imageUrl} 
                alt={city.name}
                loading={city.id === 3 ? "eager" : "lazy"}
                className="city-image"
                onError={(e) => {
                  console.error(`Failed to load image: ${e.target.src}`);
                  // Fallback to our local placeholder if the original fails
                  if (city.name === 'Boston') {
                    e.target.src = "/images/boston_placeholder.svg";
                  } else {
                    e.target.src = "/images/" + city.name.toLowerCase().replace(' ', '_') + ".jpg";
                  }
                }}
              />
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
