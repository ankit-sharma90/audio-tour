/**
 * Image debugging utilities
 */

// Add event listeners to all images to track loading status
export const initImageDebug = () => {
  // Create debug info element
  const debugInfo = document.createElement('div');
  debugInfo.className = 'debug-info';
  debugInfo.innerHTML = 'Image Debug Info:<br>';
  document.body.appendChild(debugInfo);
  
  // Track image loading
  const imageStatus = {};
  
  // Add load and error listeners to all images
  const addImageListeners = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
      if (!img.dataset.debugId) {
        const id = `img_${index}_${Date.now()}`;
        img.dataset.debugId = id;
        imageStatus[id] = 'loading';
        
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          imageStatus[id] = 'loaded';
          updateDebugInfo();
        });
        
        img.addEventListener('error', () => {
          imageStatus[id] = 'error';
          updateDebugInfo();
          console.error(`Failed to load image: ${img.src}`);
        });
      }
    });
    
    updateDebugInfo();
  };
  
  // Update debug info display
  const updateDebugInfo = () => {
    let html = 'Image Debug Info:<br>';
    
    Object.entries(imageStatus).forEach(([id, status]) => {
      const img = document.querySelector(`[data-debug-id="${id}"]`);
      if (img) {
        const src = img.src.substring(0, 30) + '...';
        html += `<div>${src}: <span style="color:${status === 'loaded' ? 'lightgreen' : status === 'error' ? 'red' : 'yellow'}">${status}</span></div>`;
      }
    });
    
    debugInfo.innerHTML = html;
  };
  
  // Initial scan
  addImageListeners();
  
  // Periodically check for new images
  setInterval(addImageListeners, 1000);
  
  return {
    disable: () => {
      document.body.removeChild(debugInfo);
      clearInterval(intervalId);
    }
  };
};