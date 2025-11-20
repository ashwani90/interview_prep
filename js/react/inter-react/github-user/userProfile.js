import React from 'react';
import Repositories from './Repositories';
import Followers from './Followers';
import './styles/GitHubUser.css';

const UserProfile = ({ user, repos, followers }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
        <div className="profile-info">
          <h2>{user.name || user.login}</h2>
          {user.bio && <p className="bio">{user.bio}</p>}
          <div className="stats">
            <div className="stat">
              <strong>{user.public_repos}</strong>
              <span>Repos</span>
            </div>
            <div className="stat">
              <strong>{user.followers}</strong>
              <span>Followers</span>
            </div>
            <div className="stat">
              <strong>{user.following}</strong>
              <span>Following</span>
            </div>
          </div>
          {user.location && (
            <p className="location">
              <i className="fas fa-map-marker-alt"></i> {user.location}
            </p>
          )}
          {user.blog && (
            <p className="blog">
              <a href={user.blog} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-link"></i> {user.blog}
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="profile-details">
        <Repositories repos={repos} />
        <Followers followers={followers} />
      </div>
    </div>
  );
};

export default UserProfile;