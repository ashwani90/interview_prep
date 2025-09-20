// lib/rss.js
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const RSS = require('rss');

export async function generateRSSFeed() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const posts = await getBlogPosts(); // Your function to get posts

  // Create RSS feed
  const feed = new RSS({
    title: 'My Blog',
    description: 'Latest blog posts from My Blog',
    site_url: baseUrl,
    feed_url: `${baseUrl}/rss.xml`,
    image_url: `${baseUrl}/icon-512.png`,
    managingEditor: 'editor@example.com',
    webMaster: 'webmaster@example.com',
    copyright: `© ${new Date().getFullYear()} My Blog`,
    language: 'en',
    pubDate: new Date().toISOString(),
    ttl: 60, // Time to live in minutes
  });

  // Add posts to feed
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt || post.content.substring(0, 200) + '...',
      url: `${baseUrl}/blog/${post.slug}`,
      guid: `${baseUrl}/blog/${post.slug}`,
      categories: post.tags || [],
      author: post.author || 'Admin',
      date: post.publishedAt,
      enclosure: post.image ? {
        url: `${baseUrl}${post.image}`,
        type: 'image/jpeg'
      } : undefined,
    });
  });

  // Generate XML
  const rssXml = feed.xml({ indent: true });

  // Write to public directory
  const publicDir = join(process.cwd(), 'public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  writeFileSync(join(publicDir, 'rss.xml'), rssXml);
  writeFileSync(join(publicDir, 'rss.json'), JSON.stringify(posts, null, 2)); // Optional JSON feed

  console.log('✅ RSS feed generated successfully');
  return rssXml;
}

// Generate multiple feed formats
export async function generateAllFeeds() {
  await generateRSSFeed();
  await generateJSONFeed();
  await generateAtomFeed();
}

// JSON Feed (alternative format)
async function generateJSONFeed() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const posts = await getBlogPosts();

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'My Blog',
    description: 'Latest blog posts from My Blog',
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    icon: `${baseUrl}/icon-512.png`,
    favicon: `${baseUrl}/favicon.ico`,
    authors: [{ name: 'My Blog Team' }],
    language: 'en',
    items: posts.map(post => ({
      id: `${baseUrl}/blog/${post.slug}`,
      url: `${baseUrl}/blog/${post.slug}`,
      title: post.title,
      content_text: post.excerpt,
      content_html: post.content,
      summary: post.excerpt,
      image: post.image ? `${baseUrl}${post.image}` : undefined,
      date_published: post.publishedAt,
      date_modified: post.updatedAt || post.publishedAt,
      authors: [{ name: post.author || 'Admin' }],
      tags: post.tags || [],
    })),
  };

  const publicDir = join(process.cwd(), 'public');
  writeFileSync(join(publicDir, 'feed.json'), JSON.stringify(jsonFeed, null, 2));
}

// Atom Feed (alternative format)
async function generateAtomFeed() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const posts = await getBlogPosts();

  const atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>My Blog</title>
  <subtitle>Latest blog posts from My Blog</subtitle>
  <link href="${baseUrl}/atom.xml" rel="self"/>
  <link href="${baseUrl}"/>
  <id>${baseUrl}/</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>My Blog Team</name>
  </author>
  ${posts.map(post => `
    <entry>
      <title>${escapeXML(post.title)}</title>
      <link href="${baseUrl}/blog/${post.slug}"/>
      <id>${baseUrl}/blog/${post.slug}</id>
      <updated>${new Date(post.publishedAt).toISOString()}</updated>
      <summary>${escapeXML(post.excerpt || '')}</summary>
      <content type="html">${escapeXML(post.content)}</content>
      <author>
        <name>${escapeXML(post.author || 'Admin')}</name>
      </author>
    </entry>
  `).join('')}
</feed>`;

  const publicDir = join(process.cwd(), 'public');
  writeFileSync(join(publicDir, 'atom.xml'), atomFeed);
}

function escapeXML(string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}