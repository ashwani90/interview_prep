import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const fetchPostsByPage = async (page) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  return data;
};

export const PaginatedPosts = () => {
  const [page, setPage] = useState(1);
  const {
    data: posts,
    isLoading,
    isError,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPostsByPage(page),
    keepPreviousData: true, // Smooth transitions between pages
    staleTime: 5000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Paginated Posts (Page {page})</h1>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => {
            if (!isPlaceholderData) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || posts.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
};