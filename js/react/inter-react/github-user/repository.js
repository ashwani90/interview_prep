import React from 'react';
import './styles/GitHubUser.css';

const Repositories = ({ repos }) => {
  return (
    <div className="repositories">
      <h3>Latest Repositories</h3>
      {repos.length > 0 ? (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
              <p>{repo.description}</p>
              <div className="repo-stats">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span>{repo.language}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No repositories found</p>
      )}
    </div>
  );
};

export default Repositories;