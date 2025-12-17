import { useEffect } from 'react';
import { useMatches } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const RoutePrefetcher = () => {
  const matches = useMatches();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Prefetch data for routes that might be navigated to next
    const potentialNextRoutes = [
      { path: '/user/:id', queryKey: ['user'], queryFn: fetchUser },
      { path: '/products/:id', queryKey: ['product'], queryFn: fetchProduct },
    ];

    potentialNextRoutes.forEach((route) => {
      const match = matches.find(m => 
        m.pathname.includes(route.path.split('/:')[0])
      );
      
      if (match) {
        const id = match.params.id;
        if (id) {
          queryClient.prefetchQuery({
            queryKey: [...route.queryKey, id],
            queryFn: () => route.queryFn(id),
          });
        }
      }
    });
  }, [matches, queryClient]);

  return null;
};

// Add this component high in your app tree
const App = () => {
  return (
    <>
      <RoutePrefetcher />
      {/* rest of your app */}
    </>
  );
};