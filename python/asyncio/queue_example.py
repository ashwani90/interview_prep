# Queue for keeping data across coroutines
import asyncio

async def producer(queue):
    for i in range(10):
        await queue.put(i)
        print(f'Produced {i + 1}')
    await queue.put(None)

async def consumer(queue):
    while True:
        item = await queue.get()
        if item is None:
            queue.task_done()
            break
        print(f'Consumed {item}')
        queue.task_done()

async def main():
    queue = asyncio.Queue()
    consumer_task = asyncio.create_task(consumer(queue))
    # Run producer to produce items
    await producer(queue)
    # What does this do
    # This waits for all items to be processed
    await queue.join()
    await consumer_task
    # await asyncio.gather(
    #     producer(queue),
    #     consumer(queue),
    # )

if __name__ == "__main__":
    asyncio.run(main())
    print("All tasks completed.")