import React from 'react';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import Waveform from './Waveform';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    seek,
    setVolume,
    toggleMute
  } = useAudioPlayer();

  if (!currentTrack) {
    return <div className="audio-player empty">No track selected</div>;
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="audio-player">
      <div className="player-info">
        <h3 className="track-title">{currentTrack.title}</h3>
        <p className="track-artist">{currentTrack.artist}</p>
      </div>

      <Waveform 
        currentTime={currentTime} 
        duration={duration} 
        onSeek={seek}
      />

      <div className="time-display">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="player-controls">
        <button className="control-btn" onClick={() => seek(currentTime - 5)}>
          ⏪ 5s
        </button>
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '⏵'}
        </button>
        <button className="control-btn" onClick={() => seek(currentTime + 5)}>
          5s ⏩
        </button>
      </div>

      <div className="volume-controls">
        <button className="mute-btn" onClick={toggleMute}>
          {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;