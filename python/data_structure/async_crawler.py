import asyncio
import aiohttp
from urllib.parse import urlparse
import time
from typing import List, Dict, Optional
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class AsyncWebCrawler:
    def __init__(self, max_concurrent: int = 10, timeout: int = 10):
        """
        Initialize the web crawler.
        
        Args:
            max_concurrent: Maximum concurrent requests
            timeout: Timeout in seconds for each request
        """
        self.max_concurrent = max_concurrent
        self.timeout = aiohttp.ClientTimeout(total=timeout)
        self.visited_urls = set()
        self.session: Optional[aiohttp.ClientSession] = None
        self.semaphore = asyncio.Semaphore(max_concurrent)

    async def fetch(self, url: str) -> Optional[str]:
        """
        Fetch the content of a single URL.
        
        Returns:
            The HTML content as string, or None if request failed
        """
        if not url.startswith(('http://', 'https://')):
            logger.warning(f"Invalid URL scheme: {url}")
            return None

        try:
            async with self.semaphore:
                async with self.session.get(url, timeout=self.timeout) as response:
                    if response.status == 200:
                        content = await response.text()
                        logger.info(f"Fetched {url} (length: {len(content)})")
                        return content
                    else:
                        logger.warning(f"Failed to fetch {url} - Status: {response.status}")
                        return None
        except asyncio.TimeoutError:
            logger.warning(f"Timeout fetching {url}")
            return None
        except aiohttp.ClientError as e:
            logger.warning(f"Error fetching {url}: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error fetching {url}: {str(e)}")
            return None

    async def crawl(self, urls: List[str]) -> Dict[str, Optional[str]]:
        """
        Crawl multiple URLs concurrently.
        
        Returns:
            Dictionary mapping URLs to their content (or None if failed)
        """
        self.visited_urls.update(urls)
        self.session = aiohttp.ClientSession()

        try:
            tasks = []
            for url in urls:
                if url not in self.visited_urls:
                    task = asyncio.create_task(self.fetch(url))
                    tasks.append(task)

            results = await asyncio.gather(*tasks, return_exceptions=False)
            return dict(zip(urls, results))
        finally:
            await self.session.close()

    def get_domain(self, url: str) -> str:
        """Extract domain from URL"""
        parsed = urlparse(url)
        return parsed.netloc

async def main():
    # Example usage
    urls = [
        'https://www.python.org',
        'https://www.github.com',
        'https://www.example.com',
        'https://www.wikipedia.org',
        'https://www.google.com',
        'https://www.stackoverflow.com',
        'https://www.reddit.com',
        'https://www.amazon.com',
        'https://www.microsoft.com',
        'https://www.apple.com',
    ]

    logger.info("Starting web crawler...")
    start_time = time.time()

    crawler = AsyncWebCrawler(max_concurrent=5)
    results = await crawler.crawl(urls)

    elapsed = time.time() - start_time
    logger.info(f"Crawling completed in {elapsed:.2f} seconds")
    
    # Print summary
    success_count = sum(1 for content in results.values() if content is not None)
    logger.info(f"Successfully fetched {success_count}/{len(urls)} URLs")

if __name__ == "__main__":
    asyncio.run(main())