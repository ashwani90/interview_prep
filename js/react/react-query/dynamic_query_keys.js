import { useQuery } from '@tanstack/react-query';

// Simple post call
const fetchPostsByUser = async (userId) => {
  const response = await fetch(`/api/users/${userId}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

// Component that displays posts for a specific user
const UserPosts = ({ userId }) => {
    // simple get data function
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', userId], // Dynamic query key
    queryFn: () => fetchPostsByUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts by User {userId}</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Example parent component that switches between users
const UserPostsDashboard = () => {
  const [currentUserId, setCurrentUserId] = useState(1);

  return (
    <div>
      <div className="user-selector">
        <button onClick={() => setCurrentUserId(1)}>User 1</button>
        <button onClick={() => setCurrentUserId(2)}>User 2</button>
        <button onClick={() => setCurrentUserId(3)}>User 3</button>
      </div>
      
      <UserPosts userId={currentUserId} />
    </div>
  );
};

const queryClient = useQueryClient();
// mutation to add a new post
const addPost = useMutation({
  mutationFn: (newPost) => createPost(newPost),
  onSuccess: (newPost) => {
    // Invalidate only this user's posts
    queryClient.invalidateQueries({
      queryKey: ['posts', newPost.userId]
    });
    
    // Alternative: Optimistic update
    // queryClient.setQueryData(['posts', newPost.userId], (old) => [...old, newPost]);
  }
});

