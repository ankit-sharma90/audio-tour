import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Audio Tour</h1>
        <p>Discover the stories behind famous landmarks</p>
      </div>
      
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At Audio Tour, we believe that every landmark has a story to tell. Our mission is to make these stories accessible to everyone, 
          anywhere, anytime. We provide high-quality audio tours for thousands of landmarks across the United States, 
          allowing you to explore and learn at your own pace.
        </p>
      </section>
      
      <section className="about-section">
        <h2>How It Works</h2>
        <div className="how-it-works">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse Landmarks</h3>
            <p>Explore our collection of landmarks by city or featured attractions.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Select a Tour</h3>
            <p>Choose between short overviews or in-depth tours based on your interest and available time.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Listen & Learn</h3>
            <p>Play the audio tour while visiting the landmark or from the comfort of your home.</p>
          </div>
        </div>
      </section>
      
      <section className="about-section">
        <h2>Our Team</h2>
        <p>
          Audio Tour was founded in 2023 by a group of history enthusiasts and travel lovers. 
          Our team includes historians, travel guides, audio engineers, and software developers 
          who work together to create immersive and educational experiences.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or suggestions? We'd love to hear from you!
        </p>
        <div className="contact-info">
          <p><strong>Email:</strong> info@audiotour.example.com</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
          <p><strong>Address:</strong> 123 Landmark Ave, San Francisco, CA 94105</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
