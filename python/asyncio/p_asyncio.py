# Asyncio programming


import asyncio

# Simply waits for 1 second and prints "Hello" first and then "World"
# This is a simple coroutine example using asyncio
async def say_hello():
    print("Hello")
    await asyncio.sleep(1)
    print("World")
    await asyncio.gather(
        task("Task 1"),
        task("Task 2"),
        task("Task 3")
    )
    
    
# Now running multiple coroutines concurrently

async def task(name):
    print(f"{name} started")
    await asyncio.sleep(1)
    print(f"{name} finished")
    
# Now create and manage these coroutines using asyncio
async def concur():
    t1 = asyncio.create_task(task("Task 1"))
    t2 = asyncio.create_task(task("Task 2"))
    
    await t1
    await t2
    
# Usage of timeouts
async def delayed():
    await asyncio.sleep(5)
    return "done"

async def timeout_example():
    try:
        result = await asyncio.wait_for(delayed(), timeout=2)
        return result
    except asyncio.TimeoutError:
        print("Operation timed out")
    
    
def main():
    asyncio.run(say_hello())
    asyncio.run(concur())
    asyncio.run(timeout_example())

if __name__ == "__main__":
    main()