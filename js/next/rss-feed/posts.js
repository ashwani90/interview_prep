// lib/posts.js
// This is where you'd fetch your posts from CMS, database, or local files
export async function getBlogPosts() {
    // Example: Fetch from local Markdown files or CMS
    // In a real app, this would come from your data source
    
    const posts = [
      {
        slug: 'nextjs-rss-feed',
        title: 'How to Generate RSS Feed in Next.js',
        excerpt: 'Learn how to create a static RSS feed for your Next.js blog',
        content: 'Full content of the blog post...',
        publishedAt: '2024-01-15T10:00:00.000Z',
        updatedAt: '2024-01-15T10:00:00.000Z',
        author: 'John Doe',
        tags: ['nextjs', 'rss', 'seo'],
        image: '/images/nextjs-rss.jpg',
      },
      {
        slug: 'static-site-generation',
        title: 'Static Site Generation with Next.js',
        excerpt: 'Complete guide to SSG in Next.js',
        content: 'Full content about SSG...',
        publishedAt: '2024-01-10T14:30:00.000Z',
        author: 'Jane Smith',
        tags: ['nextjs', 'ssg', 'performance'],
        image: '/images/ssg-guide.jpg',
      },
      // Add more posts...
    ];
  
    // Sort by date, newest first
    return posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }
  
  export async function getPostBySlug(slug) {
    const posts = await getBlogPosts();
    return posts.find(post => post.slug === slug);
  }
  
  export async function getAllPostSlugs() {
    const posts = await getBlogPosts();
    return posts.map(post => ({ slug: post.slug }));
  }