// src/persistence.js
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
  // Optional: Custom key for localStorage
  key: 'REACT_QUERY_OFFLINE_CACHE',
  // Optional: Throttle saving to localStorage to prevent excessive writes
  throttleTime: 1000,
});

