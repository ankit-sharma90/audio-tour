import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Update time and duration
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Play/pause functionality
  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle seek
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="audio-player-title">
        <h3>{title}</h3>
      </div>
      
      <div className="audio-controls">
        <button 
          className="play-button" 
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span> / </span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <div 
        className="progress-bar-container" 
        onClick={handleSeek}
      >
        <div 
          className="progress-bar" 
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
      
      <div className="audio-controls-secondary">
        <button 
          className="control-button" 
          onClick={() => {
            audioRef.current.currentTime = Math.max(0, currentTime - 10);
          }}
          aria-label="Rewind 10 seconds"
        >
          -10s
        </button>
        
        <button 
          className="control-button" 
          onClick={() => {
            audioRef.current.currentTime = Math.min(duration, currentTime + 10);
          }}
          aria-label="Forward 10 seconds"
        >
          +10s
        </button>
        
        <select 
          className="playback-rate" 
          onChange={(e) => {
            audioRef.current.playbackRate = parseFloat(e.target.value);
          }}
          aria-label="Playback speed"
        >
          <option value="0.75">0.75x</option>
          <option value="1.0" selected>1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2.0">2x</option>
        </select>
      </div>
    </div>
  );
};

export default AudioPlayer;