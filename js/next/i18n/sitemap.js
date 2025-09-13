// app/sitemap.js
import { i18n } from '../lib/i18n';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const routes = ['', '/about', '/contact'];
  
  const sitemapEntries = [];

  for (const locale of i18n.locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map(l => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    }
  }

  return sitemapEntries;
}