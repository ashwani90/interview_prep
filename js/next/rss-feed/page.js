// app/blog/page.js
import { getBlogPosts } from '../../lib/posts';
import RSSLink from '../../components/RSSLink';
import HeadWithRSS from '../../components/HeadWithRSS';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <HeadWithRSS
        title="Blog - My Website"
        description="Latest articles and news from our blog"
        canonical="/blog"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog</h1>
          <RSSLink />
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-2">
                <a href={`/blog/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </a>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString()}
                </time>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export const revalidate = 3600; // Revalidate every hour