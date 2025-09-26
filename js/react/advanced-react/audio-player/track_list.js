import React from 'react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import './TrackList.css';

const tracks = [
  {
    id: 1,
    title: 'Sample Track 1',
    artist: 'Artist A',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 2,
    title: 'Sample Track 2',
    artist: 'Artist B',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 3,
    title: 'Sample Track 3',
    artist: 'Artist C',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

const TrackList = () => {
  const { loadTrack, currentTrack } = useAudioPlayer();

  return (
    <div className="track-list">
      <h3>Available Tracks</h3>
      <ul>
        {tracks.map(track => (
          <li 
            key={track.id} 
            className={currentTrack?.id === track.id ? 'active' : ''}
            onClick={() => loadTrack(track)}
          >
            <span className="track-title">{track.title}</span>
            <span className="track-artist">{track.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;