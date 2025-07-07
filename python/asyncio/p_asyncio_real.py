# Real examples of asyncio usage

#  this does tasks at once but not in parallel
# for parallel execution we would need to use multiprocessing

import aiohttp
import asyncio

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()
    
async def main():
    urls = ["https://httpbin.org/delay/1", "https://httpbin.org/delay/2"]
    async with aiohttp.ClientSession() as session:
        # this basically gives array of two coroutines
        tasks = [fetch_url(session, url) for url in urls]
        # pointer to coroutines are passed here
        results = await asyncio.gather(*tasks)
        print(results)

if __name__ == "__main__":
    asyncio.run(main())