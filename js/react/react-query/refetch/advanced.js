const AdvancedUserProfile = () => {
    const {
      data: user,
      refetch,
      isRefetching,
      // Additional states for more control
      isStale,
      failureCount,
    } = useQuery({
      queryKey: ['userData'],
      queryFn: fetchUserData,
      refetchOnWindowFocus: false,
      // Customize stale behavior
      staleTime: 30 * 1000, // 30 seconds until stale
    });
  
    const handleRefresh = async () => {
      try {
        await refetch({ cancelRefetch: true }); // Cancel previous refetch if still running
        // Show toast notification on success
        toast.success('Data refreshed successfully');
      } catch (err) {
        // Show error notification
        toast.error('Refresh failed');
      }
    };
  
    return (
      <div className="user-profile">
        {/* ... existing profile display ... */}
        
        <div className="data-status">
          {isStale && !isRefetching && (
            <span className="stale-warning">Data may be outdated</span>
          )}
          {failureCount > 0 && (
            <span className="retry-count">(Retry attempt: {failureCount})</span>
          )}
        </div>
      </div>
    );
  };