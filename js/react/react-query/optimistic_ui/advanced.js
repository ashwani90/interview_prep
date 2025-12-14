const AdvancedLikeButton = ({ postId, initialLiked, likeCount }) => {
    const queryClient = useQueryClient();
    const [localState, setLocalState] = useState({
      liked: initialLiked,
      count: likeCount,
      error: null,
    });
  
    const mutation = useMutation({
      mutationFn: () => toggleLike(postId),
      onMutate: async () => {
        await queryClient.cancelQueries(['posts']);
        const previousPosts = queryClient.getQueryData(['posts']);
        
        queryClient.setQueryData(['posts'], (old) => {
          return old.map(post => 
            post.id === postId 
              ? { 
                  ...post, 
                  liked: !post.liked, 
                  likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1 
                }
              : post
          );
        });
  
        setLocalState(prev => ({
          liked: !prev.liked,
          count: prev.liked ? prev.count - 1 : prev.count + 1,
          error: null,
        }));
  
        return { previousPosts };
      },
      onError: (err, variables, context) => {
        setLocalState(prev => ({
          ...prev,
          error: err.message,
        }));
        
        setTimeout(() => {
          queryClient.setQueryData(['posts'], context.previousPosts);
          setLocalState({
            liked: initialLiked,
            count: likeCount,
            error: null,
          });
        }, 1000); // Keep error state visible for 1 second before rollback
      },
      onSettled: () => {
        queryClient.invalidateQueries(['posts']);
      },
    });
  
    return (
      <div className="like-container">
        <button 
          onClick={() => mutation.mutate()}
          disabled={mutation.isLoading}
          className={`like-button ${localState.liked ? 'liked' : ''}`}
        >
          <span className="icon">
            {mutation.isLoading ? '⏳' : localState.liked ? '❤️' : '🤍'}
          </span>
          <span className="count">{localState.count}</span>
        </button>
        {localState.error && (
          <div className="error-tooltip">
            Failed to update like: {localState.error}
          </div>
        )}
      </div>
    );
  };