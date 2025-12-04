// src/components/QueryErrorBoundary.jsx
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function QueryErrorBoundary({ children }) {
  const { reset } = useQueryErrorResetBoundary();
  
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div>
          <h2>Something went wrong</h2>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

// Usage in App.jsx
<QueryClientProvider client={queryClient}>
  <QueryErrorBoundary>
    <AppRoutes />
  </QueryErrorBoundary>
</QueryClientProvider>