# event loop customization
import asyncio

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

async def say_hello():
    print("Hello")
    await asyncio.sleep(1)
    print("World")

loop.run_until_complete(say_hello())

import aiohttp  # Third-party async HTTP client

URLS = [
    'https://httpbin.org/delay/1',
    'https://httpbin.org/delay/2',
    'https://httpbin.org/delay/3',
]

async def fetch(session, url):
    async with session.get(url) as response:
        print(f"Started {url}")
        data = await response.text()
        print(f"Finished {url}")
        return data

async def main():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in URLS]
        results = await asyncio.gather(*tasks)
        print(f"Fetched {len(results)} pages.")

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(main())
    print("All fetches completed.")

# so this could be another way to use coroutines
# with a custom event loop