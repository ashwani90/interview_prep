import { useQueryClient } from '@tanstack/react-query';
import { useIntent } from './useIntent'; // Hypothetical hook

const ProductListWithIntent = () => {
  const queryClient = useQueryClient();
  const { registerIntent } = useIntent();
  
  // Register prefetch intent when user shows interest
  useEffect(() => {
    const unsubscribe = registerIntent('view-product', (productId) => {
      queryClient.prefetchQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(productId),
      });
    });
    
    return () => unsubscribe();
  }, [queryClient, registerIntent]);

  // ... render product list
};