import React, { useState, useEffect } from 'react';
import UserSearch from './components/UserSearch';
import UserProfile from './components/UserProfile';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rateLimit, setRateLimit] = useState({ remaining: 60, limit: 60 });

  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, [username]);

  const fetchUserData = async (username) => {
    setLoading(true);
    setError(null);
    
    try {
      // Check rate limit first
      const rateResponse = await fetch('https://api.github.com/rate_limit');
      const rateData = await rateResponse.json();
      setRateLimit(rateData.resources.core);

      if (rateData.resources.core.remaining < 1) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }

      // Fetch user data
      const [userResponse, reposResponse, followersResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`),
        fetch(`https://api.github.com/users/${username}/followers?per_page=5`)
      ]);

      // Handle errors
      if (!userResponse.ok) {
        throw new Error(userResponse.status === 404 
          ? 'User not found' 
          : 'Failed to fetch user data');
      }

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();
      const followersData = await followersResponse.json();

      setUserData(userData);
      setRepos(reposData);
      setFollowers(followersData);
    } catch (err) {
      setError(err.message);
      setUserData(null);
      setRepos([]);
      setFollowers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>GitHub User Finder</h1>
      <UserSearch onSearch={setUsername} />
      <div className="rate-limit">
        API calls remaining: {rateLimit.remaining}/{rateLimit.limit}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {userData && (
        <UserProfile 
          user={userData} 
          repos={repos} 
          followers={followers} 
        />
      )}
    </div>
  );
}

export default App;