import React, { useState } from 'react';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';
import './styles/App.css';

function App() {
  const [password, setPassword] = useState('');

  return (
    <div className="app">
      <h1>Password Strength Meter</h1>
      <div className="password-container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <PasswordStrengthMeter password={password} />
      </div>
    </div>
  );
}

export default App;