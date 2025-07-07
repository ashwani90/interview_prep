import asyncio
import aiohttp
from bs4 import BeautifulSoup
from typing import List 

URLS = [
    "https://example.com",
    "https://httpbin.org/html",
    "https://www.python.org",
    "https://www.wikipedia.org",
    "https://realpython.com"
]

async def fetch_title(session: aiohttp.ClientSession, url: str) -> str:
    try:
        async with session.get(url) as response:
            html = await response.text()
            soup = BeautifulSoup(html, 'html.parser')
            title = soup.title.string if soup.title else 'No title found'
            return f"{url}: {title}"
    except Exception as e:
        return f"{url}: Error fetching title - {str(e)}"


# Add concurrent reading
async def scrape_all(urls: List[str]) -> List[str]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_title(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        print("Scraped title")
        for result in results:
            print(result)

if __name__ == "__main__":
    asyncio.run(scrape_all(URLS))
    print("All titles scraped.")