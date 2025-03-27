import React, { useState, useEffect, useRef } from 'react';
import { getOptimizedAudioUrl, isMeteredConnection } from '../utils/audioOptimizer';
import './AudioPlayer.css';

/**
 * An optimized audio player component for mobile devices
 * Features progressive loading, network-aware quality selection,
 * and touch-friendly controls
 */
const OptimizedAudioPlayer = ({
  audioSrc,
  title,
  transcript,
  onPlay,
  onPause,
  onEnded,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMetered, setIsMetered] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Optimize audio URL based on network conditions
  const optimizedAudioUrl = getOptimizedAudioUrl(audioSrc);
  
  useEffect(() => {
    // Check if on metered connection
    setIsMetered(isMeteredConnection());
    
    // Add connection change listener
    if (navigator.connection) {
      const handleConnectionChange = () => {
        setIsMetered(isMeteredConnection());
      };
      
      navigator.connection.addEventListener('change', handleConnectionChange);
      return () => {
        navigator.connection.removeEventListener('change', handleConnectionChange);
      };
    }
  }, []);
  
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleCanPlay = () => {
      setIsLoading(false);
      setDuration(audio.duration);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
      if (onPlay) onPlay();
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      if (onPause) onPause();
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      if (onEnded) onEnded();
    };
    
    // Add event listeners
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    
    // Clean up
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onPlay, onPause, onEnded]);
  
  // Handle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      // If we're on a metered connection, confirm before playing
      if (isMetered && !localStorage.getItem('audioWarningDismissed')) {
        const confirm = window.confirm(
          'You are on a metered connection (cellular data). Playing audio may use your data plan. Continue?'
        );
        
        if (confirm) {
          localStorage.setItem('audioWarningDismissed', 'true');
          audio.play();
        }
      } else {
        audio.play();
      }
    }
  };
  
  // Handle seeking
  const handleSeek = (e) => {
    const progressBar = progressBarRef.current;
    const audio = audioRef.current;
    
    if (!progressBar || !audio) return;
    
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * audio.duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(clickPosition * 100);
  };
  
  // Format time in MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className={`optimized-audio-player ${className}`}>
      {title && <h3 className="audio-title">{title}</h3>}
      
      <div className="player-controls">
        <button 
          className={`play-pause-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <span className="loading-indicator">Loading...</span>
          ) : isPlaying ? (
            <span className="pause-icon">❚❚</span>
          ) : (
            <span className="play-icon">▶</span>
          )}
        </button>
        
        <div className="time-display current-time">{formatTime(currentTime)}</div>
        
        <div 
          className="progress-container"
          ref={progressBarRef}
          onClick={handleSeek}
        >
          <div 
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="time-display duration">{formatTime(duration)}</div>
        
        <button 
          className="transcript-toggle"
          onClick={() => setShowTranscript(!showTranscript)}
          aria-label={showTranscript ? 'Hide transcript' : 'Show transcript'}
        >
          {showTranscript ? 'Hide Text' : 'Show Text'}
        </button>
      </div>
      
      {showTranscript && transcript && (
        <div className="transcript">
          <p>{transcript}</p>
        </div>
      )}
      
      {isMetered && (
        <div className="data-usage-warning">
          <small>Using cellular data. Audio quality adjusted.</small>
        </div>
      )}
      
      <audio 
        ref={audioRef}
        src={optimizedAudioUrl}
        preload="metadata"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default OptimizedAudioPlayer;