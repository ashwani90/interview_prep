// app/posts/[slug]/page.js
import { apiClient } from '../../../lib/api';
import { getEnvironment, isProduction } from '../../../lib/env';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }) {
  const environment = getEnvironment();
  const post = await apiClient.getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <span className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
          Environment: {environment}
        </span>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <time className="text-gray-600 block mb-8">
        {new Date(post.publishedAt).toLocaleDateString()}
      </time>
      
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
      
      {!isProduction() && (
        <div className="mt-8 p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <p className="text-blue-700">
            This post is being served from the {environment} environment.
            {environment === 'development' && ' Using mock data for development.'}
          </p>
        </div>
      )}
    </article>
  );
}

// Generate static params for SSG
export async function generateStaticParams() {
  const environment = getEnvironment();
  
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
  
  // For non-production environments, generate only a few sample pages
  return [
    { slug: 'hello-world' },
    { slug: 'sample-post' },
  ];
}

// Generate metadata
export async function generateMetadata({ params }) {
  const post = await apiClient.getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

// Revalidation based on environment
export const revalidate = () => {
  const environment = getEnvironment();
  const config = {
    development: 60,
    staging: 300,
    production: 3600,
  };
  
  return config[environment] || 60;
};