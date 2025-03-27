import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './mobile.css';
import './styles/mobile-components.css';

// Register service worker for offline capabilities and PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}

// Add touch event polyfill for browsers that need it
if (!('ontouchstart' in window)) {
  console.log('Adding touch event polyfill for desktop testing');
  document.addEventListener('mousedown', function(e) {
    const touch = new Touch({
      identifier: Date.now(),
      target: e.target,
      clientX: e.clientX,
      clientY: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 0,
      force: 1
    });
    
    const touchEvent = new TouchEvent('touchstart', {
      cancelable: true,
      bubbles: true,
      touches: [touch],
      targetTouches: [touch],
      changedTouches: [touch]
    });
    
    e.target.dispatchEvent(touchEvent);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);