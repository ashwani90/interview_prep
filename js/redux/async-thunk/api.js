const API_BASE = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
  const response = await fetch(`${API_BASE}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return await response.json();
};

export const fetchPostDetails = async (postId) => {
  const response = await fetch(`${API_BASE}/posts/${postId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post details');
  }
  return await response.json();
};