const AdvancedStockTracker = () => {
    // ... same state declarations as before
    
    const { data, isLoading, isError, error, isRefetching } = useQuery({
      queryKey: ['stockPrice', symbol],
      queryFn: () => fetchStockPrice(symbol),
      refetchInterval: isPolling ? pollInterval : false,
      refetchIntervalInBackground: true,
      staleTime: 0,
      // Only continue polling while this condition is true
      enabled: isPolling && symbol.length > 0,
      // Exponential backoff for retries
      retryDelay: (attempt) => Math.min(attempt * 1000, 10000),
    });
  
    // Visual indicator when background refetch is happening
    const isUpdating = isRefetching && !isLoading;
  
    return (
      <div className="stock-tracker">
        {/* ... same controls as before ... */}
        
        <div className="stock-data">
          {isLoading ? (
            <p>Loading initial data...</p>
          ) : isError ? (
            <p className="error">Error: {error.message}</p>
          ) : (
            <>
              <h3>{data.symbol}</h3>
              <p className={`price ${isUpdating ? 'updating' : ''}`}>
                ${data.price}
                {isUpdating && <span className="updating-indicator">↻</span>}
              </p>
              {/* ... rest of display ... */}
            </>
          )}
        </div>
      </div>
    );
  };