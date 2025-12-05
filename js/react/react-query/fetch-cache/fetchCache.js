import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
      );
      return {
        data,
        nextPage: pageParam + 1,
        totalPages: 10, // Normally you'd get this from API headers
      };
}


export const PostsList = () => {
    // this has to be written like this always
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        getNextPageParam: (lastPage) => {
          return lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined;
        },
        initialPageParam: 1,
        staleTime: 60 * 1000, // Cache for 1 minute
      });

      if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Posts</h1>
      <div className="posts-container">
        {data.pages.map((page, i) => (
          <div key={i}>
            {page.data.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="load-more">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
}