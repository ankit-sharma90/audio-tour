import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { darkMode } = useContext(ThemeContext);
  
  // Close menu when screen size changes to desktop and track mobile state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (!mobile && menuOpen) {
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
    <header className={`header ${darkMode ? 'dark' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <h1>Audio Tour</h1>
          <p className="tagline">If these walls could talk</p>
        </Link>
        
        <div className="header-right">
          <div className="desktop-nav">
            <ul>
              <li><Link to="/" onClick={closeMenu}>Home</Link></li>
              <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            </ul>
          </div>
          
          <div className="header-actions">
            <ThemeToggle />
            
            <button 
              className="menu-toggle" 
              aria-label="Toggle navigation menu"
              onClick={toggleMenu}
            >
              ☰
            </button>
          </div>
        </div>
        
        <div className={`overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
        
        <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          {isMobile && (
            <button 
              className="close-menu" 
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              ✕
            </button>
          )}
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
