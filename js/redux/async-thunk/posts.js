import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAction, fetchPostDetailsAction } from '../store/actions/postActions';
import Loading from './Loading';
import Error from './Error';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, postDetails, loading, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  const handlePostClick = (postId) => {
    dispatch(fetchPostDetailsAction(postId));
  };

  if (loading && !posts.length) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="posts-container">
      <div className="posts-list">
        <h2>Posts</h2>
        {loading && <Loading small />}
        <ul>
          {posts.map(post => (
            <li key={post.id} onClick={() => handlePostClick(post.id)}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="post-details">
        <h2>Post Details</h2>
        {postDetails ? (
          <div>
            <h3>{postDetails.title}</h3>
            <p>{postDetails.body}</p>
          </div>
        ) : (
          <p>Select a post to view details</p>
        )}
        {loading && postDetails && <Loading small />}
      </div>
    </div>
  );
};

export default Posts;