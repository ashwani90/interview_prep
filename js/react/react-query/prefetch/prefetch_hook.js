import { useQueryClient } from '@tanstack/react-query';

export const usePrefetch = (queryKey, queryFn, options = {}) => {
  const queryClient = useQueryClient();
  
  return (variables) => {
    queryClient.prefetchQuery({
      queryKey: typeof queryKey === 'function' 
        ? queryKey(variables) 
        : [...queryKey, variables],
      queryFn: () => queryFn(variables),
      staleTime: 60 * 1000,
      ...options,
    });
  };
};

// Usage in component
const ProductListWithHook = () => {
  const prefetchProduct = usePrefetch(
    ['product'], 
    fetchProduct,
    { staleTime: 5 * 60 * 1000 } // 5 minutes
  );
  
  // ... rest of component
  return (
    <Link 
      to={`/products/${product.id}`}
      onMouseEnter={() => prefetchProduct(product.id)}
    >
      {product.title}
    </Link>
  );
};