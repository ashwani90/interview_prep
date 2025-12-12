import { useMutation, useQueryClient } from '@tanstack/react-query';

// api handler
const createPost = async (newPost) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
};

const CreatePostForm = () => {
    // Initialize the query client
  const queryClient = useQueryClient();
  
//   Mutatuon that will sabe the post
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch the posts query after successful mutation
      queryClient.invalidateQueries({ 
        queryKey: ['posts'] 
      });
      
      // Alternative: Update cache directly for instant UI update
    //   this may or may not be used
      // queryClient.setQueryData(['posts'], (old) => [...old, newPost]);
    },
    onError: (error) => {
      console.error('Error creating post:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
      title: formData.get('title'),
      content: formData.get('content'),
    };
    mutation.mutate(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Post content" required />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create Post'}
      </button>
      {mutation.isError && (
        <div className="error">Error: {mutation.error.message}</div>
      )}
    </form>
  );
};