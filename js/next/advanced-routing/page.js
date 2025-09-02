// app/user/[[...slug]]/page.js
import { notFound, redirect } from 'next/navigation';

export default function UserCatchAll({ params }) {
  const { slug } = params;
  
  // Handle different slug patterns
  if (!slug || slug.length === 0) {
    // Redirect to user list if no slug provided
    redirect('/users');
  }

  // Handle different slug lengths
  switch (slug.length) {
    case 1:
      // /user/123 → User profile
      return <UserProfile userId={slug[0]} />;
    
    case 2:
      // /user/123/posts → User posts
      if (slug[1] === 'posts') {
        return <UserPosts userId={slug[0]} />;
      }
      // /user/123/followers → User followers
      if (slug[1] === 'followers') {
        return <UserFollowers userId={slug[0]} />;
      }
      break;
    
    case 3:
      // /user/123/posts/456 → Specific post
      if (slug[1] === 'posts') {
        return <UserPost userId={slug[0]} postId={slug[2]} />;
      }
      // /user/123/settings/profile → Profile settings
      if (slug[1] === 'settings') {
        return <UserSettings userId={slug[0]} tab={slug[2]} />;
      }
      break;
    
    default:
      // Too many segments → 404
      notFound();
  }

  // If no pattern matches → 404
  notFound();
}

// Component for user profile
function UserProfile({ userId }) {
  return (
    <div>
      <h1>User Profile: {userId}</h1>
      <p>This is the profile page for user {userId}</p>
    </div>
  );
}

// Component for user posts
function UserPosts({ userId }) {
  return (
    <div>
      <h1>Posts by User {userId}</h1>
      <p>List of posts from user {userId}</p>
    </div>
  );
}

// Component for specific post
function UserPost({ userId, postId }) {
  return (
    <div>
      <h1>Post {postId} by User {userId}</h1>
      <p>Detailed view of post {postId}</p>
    </div>
  );
}

// Component for user settings
function UserSettings({ userId, tab }) {
  return (
    <div>
      <h1>Settings for User {userId}</h1>
      <p>Current tab: {tab}</p>
    </div>
  );
}

// Generate static params for common routes
export async function generateStaticParams() {
  // Generate common user routes for SSG
  return [
    { slug: ['1'] },           // /user/1
    { slug: ['1', 'posts'] },  // /user/1/posts
    { slug: ['1', 'settings', 'profile'] }, // /user/1/settings/profile
    { slug: ['2'] },           // /user/2
    { slug: ['2', 'posts'] },  // /user/2/posts
  ];
}

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  if (slug.length === 1) {
    return {
      title: `User ${slug[0]} Profile`,
      description: `Profile page for user ${slug[0]}`,
    };
  }
  
  if (slug.length === 2 && slug[1] === 'posts') {
    return {
      title: `Posts by User ${slug[0]}`,
      description: `Posts created by user ${slug[0]}`,
    };
  }
  
  return {
    title: 'User Page',
    description: 'User information page',
  };
}