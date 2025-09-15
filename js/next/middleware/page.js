// app/products/[id]/page.js
import { notFound } from 'next/navigation';
import { getPreloadedData } from '../../../lib/preload-utils';

export default async function ProductPage({ params }) {
  // Get preloaded data from request headers
  const preloadedData = getPreloadedData();
  const productId = params.id;
  
  let product = preloadedData?.product;
  
  // If no preloaded data or data doesn't match, fetch normally
  if (!product || product.id !== productId) {
    try {
      product = await fetchData(`/api/products/${productId}`);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      notFound();
    }
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-2xl font-bold">${product.price}</p>
      
      {preloadedData && (
        <div className="mt-4 p-2 bg-green-100 text-green-800 text-sm">
          🚀 This data was preloaded via middleware for faster loading!
        </div>
      )}
    </div>
  );
}

// Generate static params for SSG
export async function generateStaticParams() {
  const products = await fetchData('/api/products');
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const product = await fetchData(`/api/products/${params.id}`);
  
  return {
    title: product.name,
    description: product.description,
  };
}