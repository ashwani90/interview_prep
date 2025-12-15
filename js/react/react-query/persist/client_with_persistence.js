// src/queryClient.js
import { QueryClient } from '@tanstack/react-query';
import { persister } from './persistence';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Persist the cache
export async function initPersistence() {
  await persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    buster: 'v1', // change this to invalidate cache when needed
  });
}