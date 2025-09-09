// lib/api.js
import { getConfig, getEnvironment } from './env';

class ApiClient {
  constructor() {
    this.config = getConfig();
    this.env = getEnvironment();
  }

  async fetch(path, options = {}) {
    const url = `${this.config.apiUrl}${path}`;
    
    const headers = {
      'Content-Type': 'application/json',
      'X-Environment': this.env,
      ...options.headers,
    };

    // Add auth token if available
    const token = process.env.API_TOKEN;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      next: {
        revalidate: this.config.cacheTTL,
        ...options.next,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Environment-specific methods
  async getPosts() {
    // Use mock data in development, real API in production
    if (this.env === 'development' && process.env.USE_MOCK_DATA === 'true') {
      return this.getMockPosts();
    }
    return this.fetch('/posts');
  }

  async getPost(slug) {
    if (this.env === 'development' && process.env.USE_MOCK_DATA === 'true') {
      return this.getMockPost(slug);
    }
    return this.fetch(`/posts/${slug}`);
  }

  // Mock data for development
  async getMockPosts() {
    return [
      {
        id: 1,
        slug: 'hello-world',
        title: 'Hello World',
        content: 'This is a sample post for development.',
        publishedAt: '2024-01-15T10:00:00.000Z',
      },
    ];
  }

  async getMockPost(slug) {
    return {
      id: 1,
      slug,
      title: 'Hello World',
      content: 'This is a sample post for development.',
      publishedAt: '2024-01-15T10:00:00.000Z',
    };
  }
}

export const apiClient = new ApiClient();