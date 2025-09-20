// components/RSSLink.js
export default function RSSLink() {
    return (
      <a
        href="/rss.xml"
        className="flex items-center text-orange-600 hover:text-orange-700"
        title="Subscribe via RSS"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
          <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1z" />
          <path d="M3 15a2 2 0 114 0 2 2 0 01-4 0z" />
        </svg>
        RSS Feed
      </a>
    );
  }