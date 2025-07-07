# Async generators

import asyncio

async def async_generator():
    for i in range(5):
        yield i
        await asyncio.sleep(1)

async def main():
    async for value in async_generator():
        print(f"Received: {value}")
        
asyncio.run(main())

# Use asyncio.run() only once (entry point).
