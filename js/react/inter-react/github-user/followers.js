import React from 'react';
import './styles/GitHubUser.css';

const Followers = ({ followers }) => {
  return (
    <div className="followers">
      <h3>Followers</h3>
      {followers.length > 0 ? (
        <div className="follower-grid">
          {followers.map((follower) => (
            <a
              key={follower.id}
              href={follower.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="follower"
            >
              <img 
                src={follower.avatar_url} 
                alt={follower.login} 
                width="60" 
                height="60" 
              />
              <span>{follower.login}</span>
            </a>
          ))}
        </div>
      ) : (
        <p>No followers found</p>
      )}
    </div>
  );
};

export default Followers;