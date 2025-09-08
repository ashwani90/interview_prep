// lib/edge-data.js
const PRODUCTS = {
    '1': { name: 'Wireless Headphones', description: 'Premium sound quality', price: 199 },
    '2': { name: 'Smart Watch', description: 'Track your fitness goals', price: 299 },
    '3': { name: 'Phone Case', description: 'Protective and stylish', price: 39 },
  };
  
  export async function getProductData(id) {
    // Simulate fetching from edge-optimized data store
    await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay
    
    const product = PRODUCTS[id] || { 
      name: 'Product Not Found', 
      description: 'This product does not exist' 
    };
  
    return {
      ...product,
      servedFrom: 'edge',
      timestamp: new Date().toISOString(),
    };
  }
  
  // Edge-optimized fetch with cache
  export async function edgeFetch(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'x-edge-runtime': 'true',
      },
      next: { 
        revalidate: 60, // Cache for 60 seconds
        ...options.next 
      },
    });
  
    return response;
  }