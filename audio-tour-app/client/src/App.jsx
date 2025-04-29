import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import NetworkStatus from './components/NetworkStatus';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LandmarkPage = lazy(() => import('./pages/LandmarkPage'));
const CityPage = lazy(() => import('./pages/CityPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {


  return (
    <ThemeProvider>
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
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
