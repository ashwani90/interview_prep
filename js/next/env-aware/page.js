// app/posts/page.js
import { apiClient } from '../../lib/api';
import { getEnvironment, isProduction } from '../../lib/env';
import PostList from '../../components/PostList';

export default async function PostsPage() {
  const environment = getEnvironment();
  const posts = await apiClient.getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <span className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
          Environment: {environment}
        </span>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <PostList posts={posts} />
      
      {!isProduction() && (
        <div className="mt-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <h3 className="font-semibold text-yellow-800">Development Notice</h3>
          <p className="text-yellow-700">
            This is the {environment} environment. Content may differ from production.
          </p>
        </div>
      )}
    </div>
  );
}

// SSG: Generate static pages at build time
export async function generateStaticParams() {
  const environment = getEnvironment();
  
  // In production, fetch actual posts to generate paths
  if (environment === 'production') {
    try {
      const posts = await apiClient.getPosts();
      return posts.map((post) => ({
        slug: post.slug,
      }));
    } catch (error) {
      console.warn('Failed to fetch posts for static generation:', error.message);
      return [];
    }
  }
  
  // In development/staging, use mock data or empty array
  if (environment === 'development' && process.env.USE_MOCK_DATA === 'true') {
    const posts = await apiClient.getMockPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  }
  
  return [];
}

// Revalidate based on environment
export const revalidate = () => {
  const environment = getEnvironment();
  const config = {
    development: 60, // 1 minute
    staging: 300, // 5 minutes
    production: 3600, // 1 hour
  };
  
  return config[environment] || 60;
};

export const metadata = {
  title: 'Blog Posts',
  description: 'Latest blog posts from our team',
};