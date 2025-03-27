import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import NetworkStatus from './components/NetworkStatus';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LandmarkPage = lazy(() => import('./pages/LandmarkPage'));
const CityPage = lazy(() => import('./pages/CityPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app">
      <Header />
      <NetworkStatus />
      <main className="container scrollable-content">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city/:cityName" element={<CityPage />} />
            <Route path="/landmark/:landmarkId" element={<LandmarkPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </main>
      {isMobile ? <MobileNav /> : <Footer />}
      {!isMobile && <Footer />}
    </div>
  );
}

export default App;
