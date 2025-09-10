// lib/data.js
// Static data (build time)
export async function getSiteStats() {
    // This data is fetched at build time and won't change
    return {
      totalUsers: 10000,
      totalProducts: 500,
      established: 2020
    };
  }
  
  // ISR data with revalidation
  export async function getFeaturedProducts() {
    const res = await fetch('https://api.example.com/products/featured', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch featured products');
    }
    
    return res.json();
  }
  
  // SSR data (per request)
  export async function getRecentPosts() {
    const res = await fetch('https://api.example.com/posts/recent', {
      cache: 'no-store' // No caching - fresh data every request
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch recent posts');
    }
    
    return res.json();
  }
  
  // Client-side data fetching
  export async function getUserData(userId) {
    const res = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    return res.json();
  }