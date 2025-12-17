import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

const fetchProduct = async (productId) => {
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const ProductList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const products = [
    { id: 1, title: 'Product 1' },
    { id: 2, title: 'Product 2' },
    { id: 3, title: 'Product 3' },
  ];

  // Prefetch when hovering over a link
  const handleMouseEnter = (productId) => {
    queryClient.prefetchQuery({
      queryKey: ['product', productId],
      queryFn: () => fetchProduct(productId),
      staleTime: 60 * 1000, // 1 minute
    });
  };

  // Prefetch before programmatic navigation
  const handleButtonClick = (productId) => {
    queryClient.prefetchQuery({
      queryKey: ['product', productId],
      queryFn: () => fetchProduct(productId),
    }).then(() => {
      navigate(`/products/${productId}`);
    });
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {/* Link with hover prefetch */}
            <Link 
              to={`/products/${product.id}`}
              onMouseEnter={() => handleMouseEnter(product.id)}
              className="product-link"
            >
              {product.title}
            </Link>
            
            {/* Button with click prefetch */}
            <button 
              onClick={() => handleButtonClick(product.id)}
              className="view-details-btn"
            >
              View Details (Prefetch)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};