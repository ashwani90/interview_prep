import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [state, setState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentTrack: null,
    volume: 0.7,
    isMuted: false
  });

  // Load track metadata when changed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateMetadata = () => {
      setState(prev => ({
        ...prev,
        duration: audio.duration || 0,
        currentTime: audio.currentTime
      }));
    };

    audio.addEventListener('loadedmetadata', updateMetadata);
    return () => audio.removeEventListener('loadedmetadata', updateMetadata);
  }, []);

  // Update current time during playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    audio.addEventListener('timeupdate', updateTime);
    return () => audio.removeEventListener('timeupdate', updateTime);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(state.currentTime + 5);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(state.currentTime - 5);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(state.volume + 0.1, 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(state.volume - 0.1, 0));
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.volume, state.currentTime]);

  const loadTrack = (track) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = track.url;
      audioRef.current.load();
      setState({
        ...state,
        currentTrack: track,
        isPlaying: false,
        currentTime: 0
      });
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (state.isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(time, state.duration));
      audioRef.current.currentTime = newTime;
      setState(prev => ({ ...prev, currentTime: newTime }));
    }
  };

  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const isMuted = !state.isMuted;
      audioRef.current.muted = isMuted;
      setState(prev => ({ ...prev, isMuted }));
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        ...state,
        audioRef,
        loadTrack,
        togglePlay,
        seek,
        setVolume,
        toggleMute
      }}
    >
      {children}
      <audio ref={audioRef} />
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);