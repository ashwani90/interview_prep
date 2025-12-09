import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@react-hook/in-view';
import { useRef, useEffect } from 'react';

const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );
  return {
    data: await res.json(),
    nextPage: pageParam + 1,
    totalPages: 10,
  };
};

export const InfiniteScrollPosts = () => {
  const loadMoreRef = useRef();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts-infinite'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
  });

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (status === 'pending') return <div>Loading initial posts...</div>;
  if (status === 'error') return <div>Error loading posts</div>;

  return (
    <div>
      <h1>Infinite Scroll Posts</h1>
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
      
      <div ref={loadMoreRef} className="load-more-trigger">
        {isFetchingNextPage && <div>Loading more posts...</div>}
        {!hasNextPage && <div>No more posts to load</div>}
      </div>
    </div>
  );
};