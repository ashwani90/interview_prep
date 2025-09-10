// app/page.js
import Link from 'next/link';
import { getFeaturedProducts, getRecentPosts, getSiteStats } from '../lib/data';

// This home page uses a mix of rendering strategies
export default async function HomePage() {
  // Static data fetched at build time
  const siteStats = await getSiteStats();
  
  // ISR data with revalidation
  const featuredProducts = await getFeaturedProducts();
  
  // SSR data (fetched on each request)
  const recentPosts = await getRecentPosts();

  return (
    <div>
      <h1>Welcome to Our Hybrid App</h1>
      
      <section>
        <h2>Static Data (Build Time)</h2>
        <p>Total Users: {siteStats.totalUsers}</p>
        <p>Total Products: {siteStats.totalProducts}</p>
      </section>
      
      <section>
        <h2>ISR Data (Revalidated)</h2>
        <div>
          {featuredProducts.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2>SSR Data (Per Request)</h2>
        <div>
          {recentPosts.map(post => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>
      
      <nav>
        <h2>Experience Different Rendering Strategies:</h2>
        <ul>
          <li><Link href="/about">Static Page (SSG)</Link></li>
          <li><Link href="/products/1">ISR Page</Link></li>
          <li><Link href="/dashboard">SSR Page</Link></li>
          <li><Link href="/profile">CSR Page</Link></li>
        </ul>
      </nav>
    </div>
  );
}

// Home page uses ISR with 1-hour revalidation
export const revalidate = 3600;

// Generate static props at build time
export async function generateStaticParams() {
  return []; // No dynamic params for home page
}

export const metadata = {
  title: 'Hybrid Rendering Demo',
  description: 'Experience different Next.js rendering strategies',
};