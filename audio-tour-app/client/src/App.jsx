import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LandmarkPage from './pages/LandmarkPage';
import CityPage from './pages/CityPage';
import AboutPage from './pages/AboutPage';

// Add a console log to check if App component is rendering
console.log('App component is rendering');

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:cityName" element={<CityPage />} />
          <Route path="/landmark/:landmarkId" element={<LandmarkPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
