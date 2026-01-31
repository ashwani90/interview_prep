// In your component
import { useDispatch } from 'react-redux';
import { optimisticUpdate } from './optimisticActions';

function LikeButton({ postId, currentLikes }) {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(optimisticUpdate(
      `posts.${postId}.likes`, // Key path in your state
      currentLikes + 1, // Optimistic value
      () => fetch(`/api/posts/${postId}/like`, { method: 'POST' }) // API call
    ));
  };

  return (
    <button onClick={handleLike}>
      Like ({currentLikes})
    </button>
  );
}