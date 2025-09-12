// app/(isr)/blog/[slug]/page.js
import { notFound } from 'next/navigation';

async function getPost(slug) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { tags: [`post-${slug}`] } // Add cache tag for on-demand revalidation
  });
  
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch post');
  }
  
  return res.json();
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <p>This page uses ISR with on-demand revalidation.</p>
    </article>
  );
}

export const revalidate = 86400; // Fallback: revalidate daily
export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }
  });
  
  const posts = await res.json();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// API route for on-demand revalidation
// app/api/revalidate/route.js
import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    const { secret, tags, paths } = await request.json();
    
    // Validate secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }
    
    // Revalidate by tags
    if (tags && Array.isArray(tags)) {
      tags.forEach(tag => revalidateTag(tag));
    }
    
    // Revalidate by paths
    if (paths && Array.isArray(paths)) {
      paths.forEach(path => revalidatePath(path));
    }
    
    return NextResponse.json({ 
      success: true, 
      revalidated: true,
      now: Date.now()
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    );
  }
}