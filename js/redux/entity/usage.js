import React from 'react';
import { useSelector } from 'react-redux';
import { makeGetUserWithPostsSelector } from './entitySelectors';

function UserProfile({ userId }) {
  const getUserWithPosts = makeGetUserWithPostsSelector();
  const user = useSelector(state => getUserWithPosts(state, userId));
  
  if (!user) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Posts:</h3>
      <ul>
        {user.posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}