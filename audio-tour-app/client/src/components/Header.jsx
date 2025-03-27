import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);
  
  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <h1>Audio Tour</h1>
          <p className="tagline">If these walls could talk</p>
        </Link>
        
        <button 
          className="menu-toggle" 
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          ☰
        </button>
        
        <div className={`overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
        
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <button 
            className="close-menu" 
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            ✕
          </button>
          <ul>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
