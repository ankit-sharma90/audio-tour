import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  
  // Hide navigation when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 10) {
        setShowNav(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Check if the current path matches the nav item
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`mobile-nav ${showNav ? 'visible' : 'hidden'}`}>
      <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
        <div className="mobile-nav-icon">🏠</div>
        <span>Home</span>
      </Link>
      <Link to="/search" className={`mobile-nav-item ${isActive('/search') ? 'active' : ''}`}>
        <div className="mobile-nav-icon">🔍</div>
        <span>Search</span>
      </Link>
      <Link to="/map" className={`mobile-nav-item ${isActive('/map') ? 'active' : ''}`}>
        <div className="mobile-nav-icon">🗺️</div>
        <span>Map</span>
      </Link>
      <Link to="/audio" className={`mobile-nav-item ${isActive('/audio') ? 'active' : ''}`}>
        <div className="mobile-nav-icon">🎧</div>
        <span>Audio</span>
      </Link>
    </nav>
  );
};

export default MobileNav;