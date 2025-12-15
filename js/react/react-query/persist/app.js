// src/App.jsx
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, initPersistence } from './queryClient';
import UserProfile from './UserProfile';

function App() {
  useEffect(() => {
    initPersistence();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // Optional: Resume mutations after cache restore
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      <UserProfile />
    </PersistQueryClientProvider>
  );
}

export default App;