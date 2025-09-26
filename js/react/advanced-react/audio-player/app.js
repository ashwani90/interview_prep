import React from 'react';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import TrackList from './components/TrackList';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>React Audio Player</h1>
      <AudioPlayerProvider>
        <TrackList />
        <AudioPlayer />
      </AudioPlayerProvider>
    </div>
  );
}

export default App;