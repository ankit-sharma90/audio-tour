/**
 * Audio Optimizer Utility
 * Handles progressive loading and optimization of audio files for mobile
 */

/**
 * Checks if the device is on a metered connection
 * @returns {boolean} True if on a metered connection
 */
export const isMeteredConnection = () => {
  if (!navigator.connection) return false;
  return navigator.connection.saveData || navigator.connection.type === 'cellular';
};

/**
 * Determines the optimal audio quality based on network conditions
 * @returns {string} Quality level: 'low', 'medium', or 'high'
 */
export const getOptimalAudioQuality = () => {
  // If no Connection API, default to medium quality
  if (!navigator.connection) return 'medium';
  
  // Check if user has enabled data saving mode
  if (navigator.connection.saveData) return 'low';
  
  // Check connection type
  const connectionType = navigator.connection.type;
  if (connectionType === 'cellular') {
    // Check effective connection type for cellular
    const effectiveType = navigator.connection.effectiveType;
    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return 'low';
      case '3g':
        return 'medium';
      case '4g':
        return 'high';
      default:
        return 'medium';
    }
  }
  
  // For wifi, ethernet, etc.
  return 'high';
};

/**
 * Gets the appropriate audio format based on browser support
 * @returns {string} Supported format: 'mp3', 'ogg', or 'aac'
 */
export const getSupportedAudioFormat = () => {
  const audio = document.createElement('audio');
  
  if (audio.canPlayType('audio/ogg; codecs="opus"').replace(/no/, '')) {
    return 'ogg'; // Opus in Ogg container (smaller file size)
  } else if (audio.canPlayType('audio/aac').replace(/no/, '')) {
    return 'aac'; // AAC (good compromise)
  } else {
    return 'mp3'; // Fallback to MP3 (most compatible)
  }
};

/**
 * Constructs the optimal audio URL based on quality and format
 * @param {string} baseUrl - Base URL for the audio file without extension
 * @returns {string} Optimized audio URL
 */
export const getOptimizedAudioUrl = (baseUrl) => {
  const quality = getOptimalAudioQuality();
  const format = getSupportedAudioFormat();
  
  return `${baseUrl}_${quality}.${format}`;
};

/**
 * Preloads audio for faster playback
 * @param {string} audioUrl - URL of the audio file to preload
 * @returns {Promise} Promise that resolves when preloading is complete
 */
export const preloadAudio = (audioUrl) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = 'auto';
    
    audio.oncanplaythrough = () => {
      resolve(audio);
    };
    
    audio.onerror = (error) => {
      reject(error);
    };
    
    audio.src = audioUrl;
    audio.load();
  });
};

/**
 * Creates a progressive audio loader that loads audio in chunks
 * @param {string} audioUrl - URL of the audio file
 * @param {Object} options - Configuration options
 * @returns {Object} Controller for the progressive loader
 */
export const createProgressiveAudioLoader = (audioUrl, options = {}) => {
  const defaults = {
    chunkSize: 1024 * 1024, // 1MB chunks
    initialBufferSize: 256 * 1024, // 256KB initial buffer
    onProgress: () => {},
    onReady: () => {},
    onError: () => {}
  };
  
  const settings = { ...defaults, ...options };
  let abortController = new AbortController();
  let audioBuffer = null;
  let isLoading = false;
  let loadedBytes = 0;
  let totalBytes = 0;
  
  const loadInitialChunk = async () => {
    try {
      isLoading = true;
      
      const response = await fetch(audioUrl, {
        headers: {
          Range: `bytes=0-${settings.initialBufferSize - 1}`
        },
        signal: abortController.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Get total size from Content-Range header
      const contentRange = response.headers.get('Content-Range');
      if (contentRange) {
        totalBytes = parseInt(contentRange.split('/')[1], 10);
      }
      
      const initialChunk = await response.arrayBuffer();
      loadedBytes = initialChunk.byteLength;
      
      settings.onProgress({
        loaded: loadedBytes,
        total: totalBytes,
        percent: (loadedBytes / totalBytes) * 100
      });
      
      settings.onReady(initialChunk);
      return initialChunk;
    } catch (error) {
      if (error.name !== 'AbortError') {
        settings.onError(error);
      }
      throw error;
    } finally {
      isLoading = false;
    }
  };
  
  const loadNextChunk = async () => {
    if (isLoading || loadedBytes >= totalBytes) return;
    
    try {
      isLoading = true;
      
      const endByte = Math.min(loadedBytes + settings.chunkSize - 1, totalBytes - 1);
      
      const response = await fetch(audioUrl, {
        headers: {
          Range: `bytes=${loadedBytes}-${endByte}`
        },
        signal: abortController.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const chunk = await response.arrayBuffer();
      loadedBytes += chunk.byteLength;
      
      settings.onProgress({
        loaded: loadedBytes,
        total: totalBytes,
        percent: (loadedBytes / totalBytes) * 100
      });
      
      return chunk;
    } catch (error) {
      if (error.name !== 'AbortError') {
        settings.onError(error);
      }
      throw error;
    } finally {
      isLoading = false;
    }
  };
  
  return {
    start: loadInitialChunk,
    loadNextChunk,
    cancel: () => {
      abortController.abort();
      abortController = new AbortController();
    },
    getProgress: () => ({
      loaded: loadedBytes,
      total: totalBytes,
      percent: totalBytes ? (loadedBytes / totalBytes) * 100 : 0
    })
  };
};