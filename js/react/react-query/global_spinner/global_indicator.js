import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

const GlobalLoadingIndicator = () => {
  // Track both queries and mutations
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching + isMutating > 0;

  // Different messages based on what's loading
  const loadingMessage = 
    isMutating ? 'Saving changes...' : 
    isFetching ? 'Loading data...' : '';

  // Different spinner based on context
  const SpinnerComponent = isMutating ? ClipLoader : CircularProgress;

  if (!isLoading) return null;

  return (
    <div className="global-loading-indicator">
      <div className="loading-content">
        <SpinnerComponent 
          size={isMutating ? 35 : 50} 
          color={isMutating ? '#4CAF50' : '#3F51B5'}
        />
        <p>{loadingMessage}</p>
      </div>
    </div>
  );
};