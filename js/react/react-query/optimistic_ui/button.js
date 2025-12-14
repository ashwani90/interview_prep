import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

// Mock API function for liking/unliking
const toggleLike = async (postId) => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate random failure (20% chance)
  if (Math.random() < 0.2) {
    throw new Error('Failed to update like');
  }
  return { success: true };
};

const LikeButton = ({ postId, initialLiked, likeCount }) => {
  const queryClient = useQueryClient();
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [localLiked, setLocalLiked] = useState(initialLiked);

  const mutation = useMutation({
    mutationFn: () => toggleLike(postId),
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['posts']);

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts']);

      // Optimistically update to the new value
      queryClient.setQueryData(['posts'], (old) => {
        return old.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                liked: !post.liked, 
                likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1 
              }
            : post
        );
      });

      // Update local state immediately
      setLocalLiked(!localLiked);
      setLocalLikeCount(localLiked ? localLikeCount - 1 : localLikeCount + 1);

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      console.error('Like failed:', err);
      queryClient.setQueryData(['posts'], context.previousPosts);
      setLocalLiked(initialLiked);
      setLocalLikeCount(likeCount);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const handleLike = () => {
    mutation.mutate();
  };

  return (
    <button 
      onClick={handleLike}
      disabled={mutation.isLoading}
      className={`like-button ${localLiked ? 'liked' : ''}`}
    >
      <span className="icon">{localLiked ? '❤️' : '🤍'}</span>
      <span className="count">{localLikeCount}</span>
      {mutation.isLoading && <span className="loading">...</span>}
      {mutation.isError && <span className="error">!</span>}
    </button>
  );
};

// Usage example:
const Post = ({ post }) => {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <LikeButton 
        postId={post.id} 
        initialLiked={post.liked} 
        likeCount={post.likeCount} 
      />
    </div>
  );
};