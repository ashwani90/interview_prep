import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const EnhancedUserProfile = ({ userId }) => {
  const { data, error, refetch, status, failureCount } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserData(userId),
    useErrorBoundary: (error) => error instanceof CriticalError, // Only boundary for critical errors
  });

  // Render different UI states based on status
  switch (status) {
    case 'loading':
      return <LoadingSkeleton />;
    case 'error':
      return (
        <ErrorCard 
          error={error}
          onRetry={refetch}
          retryCount={failureCount}
        />
      );
    default:
      return <ProfileData user={data} />;
  }
};

// Error boundary for catastrophic failures
const ProfileErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={CriticalErrorFallback}
      onError={(error) => logErrorToService(error)}
    >
      {children}
    </ErrorBoundary>
  );
};

// Usage
const App = () => (
  <ProfileErrorBoundary>
    <EnhancedUserProfile userId="123" />
  </ProfileErrorBoundary>
);