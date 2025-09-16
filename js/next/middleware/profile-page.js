// app/user/[id]/page.js
import { getPreloadedData } from '../../../lib/preload-utils';
import { fetchData } from '../../../lib/data-fetcher';
import { notFound } from 'next/navigation';

export default async function UserProfile({ params }) {
  const preloadedData = getPreloadedData();
  const userId = params.id;
  
  let user = preloadedData?.user;
  let posts = preloadedData?.posts;
  
  // Fetch data if not preloaded
  if (!user || user.id !== userId) {
    user = await fetchData(`/api/users/${userId}`);
  }
  
  if (!posts) {
    posts = await fetchData(`/api/users/${userId}/posts`);
  }
  
  if (!user) {
    notFound();
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
        <p className="text-gray-600 mb-6">{user.email}</p>
        
        {preloadedData && (
          <div className="mb-6 p-3 bg-green-100 text-green-800 rounded">
            🚀 User data preloaded via middleware!
          </div>
        )}
        
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <article key={post.id} className="border-b pb-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}