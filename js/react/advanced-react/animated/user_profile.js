import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../Skeleton/SkeletonLoader';
import './UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
        setUserData({
          name: 'John Doe',
          email: 'john@example.com',
          bio: 'Frontend developer passionate about creating beautiful user interfaces.',
          stats: {
            posts: 42,
            followers: 1024,
            following: 128
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-profile">
      <SkeletonLoader isLoading={isLoading}>
        {userData && (
          <>
            <div className="profile-header">
              <div className="avatar"></div>
              <h2>{userData.name}</h2>
              <p className="email">{userData.email}</p>
            </div>
            <p className="bio">{userData.bio}</p>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">{userData.stats.posts}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat">
                <span className="stat-number">{userData.stats.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-number">{userData.stats.following}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </>
        )}
      </SkeletonLoader>
    </div>
  );
};

export default UserProfile;