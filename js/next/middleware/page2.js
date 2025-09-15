// app/page.js
import { getPreloadedData } from '../lib/preload-utils';
import { fetchData } from '../lib/data-fetcher';

export default async function HomePage() {
  const preloadedData = getPreloadedData();
  
  let featuredProducts = preloadedData?.featuredProducts;
  let recentPosts = preloadedData?.recentPosts;
  
  // Fetch data if not preloaded
  if (!featuredProducts) {
    featuredProducts = await fetchData('/api/products/featured');
  }
  
  if (!recentPosts) {
    recentPosts = await fetchData('/api/posts/recent');
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our Store</h1>
      
      {preloadedData && (
        <div className="mb-6 p-3 bg-blue-100 text-blue-800 rounded">
          ⚡ Page loaded with preloaded data for faster rendering!
        </div>
      )}
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="space-y-4">
          {recentPosts.map(post => (
            <article key={post.id} className="border-b pb-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

// Revalidate every 60 seconds
export const revalidate = 60;