// app/blog/[category]/[post]/page.js
import { notFound } from 'next/navigation';

export default function BlogPost({ params }) {
  const { category, post } = params;
  
  // Validate category and post
  const isValid = validatePost(category, post);
  
  if (!isValid) {
    notFound();
  }
  
  return (
    <article className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        {decodeURIComponent(post.replace(/-/g, ' '))}
      </h1>
      <p className="text-gray-600 mb-6">
        Category: {decodeURIComponent(category)}
      </p>
      <div className="prose">
        <p>This is the content for the blog post about {post} in category {category}.</p>
      </div>
    </article>
  );
}

function validatePost(category, post) {
  // In a real app, you might check against a database
  const validCategories = ['technology', 'travel', 'food'];
  return validCategories.includes(category);
}

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = [
    { category: 'technology', post: 'nextjs-routing' },
    { category: 'technology', post: 'react-patterns' },
    { category: 'travel', post: 'europe-trip' },
    { category: 'food', post: 'italian-recipes' },
  ];
  
  return posts;
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { category, post } = params;
  const title = decodeURIComponent(post.replace(/-/g, ' '));
  
  return {
    title: `${title} - ${decodeURIComponent(category)}`,
    description: `Read about ${title} in our ${category} category`,
    openGraph: {
      title,
      description: `Article about ${title}`,
      type: 'article',
    },
  };
}