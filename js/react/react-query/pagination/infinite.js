import { useInfiniteQuery } from '@tanstack/react-query';

// In your component:
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['search', searchTerm],
  queryFn: ({ pageParam = 1 }) => fetchResults({ queryKey: ['search', searchTerm], pageParam }),
  getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
});

// Add this effect for infinite scroll
useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasNextPage) {
      fetchNextPage();
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [hasNextPage, fetchNextPage]);