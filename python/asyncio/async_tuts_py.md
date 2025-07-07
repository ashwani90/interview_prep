Great! Here's a **detailed tutorial on asynchronous programming in Python** using `asyncio`, covering everything from the basics to advanced concepts.

---

# 🧵 Async Programming in Python: A Detailed Tutorial

---

## 📌 Why Async?

Traditional Python code is synchronous: each line runs one after the other. But in I/O-bound programs (e.g., web scraping, API calls, file/network operations), this can be slow due to blocking.

**Async programming** allows your program to *pause* at a blocking point and do something else while waiting—resulting in better performance.

---

## 🧠 Key Concepts

* **Coroutine**: A special function declared with `async def` that can be paused and resumed.
* **`await`**: Used inside an `async def` function to wait for an `awaitable` to complete.
* **Event loop**: The core of `asyncio`. It runs coroutines, tasks, and handles I/O.
* **Task**: A wrapper for coroutine execution, allowing it to run concurrently.

---

## ✅ Getting Started

### 1. **Your First Coroutine**

```python
import asyncio

async def say_hello():
    print("Hello")
    await asyncio.sleep(1)  # Simulate I/O
    print("World")

asyncio.run(say_hello())
```

---

### 2. **Running Multiple Coroutines Concurrently**

```python
async def task(name):
    print(f"{name} started")
    await asyncio.sleep(1)
    print(f"{name} finished")

async def main():
    await asyncio.gather(
        task("A"),
        task("B"),
        task("C")
    )

asyncio.run(main())
```

---

### 3. **Creating and Managing Tasks**

```python
async def task(name, delay):
    print(f"Start {name}")
    await asyncio.sleep(delay)
    print(f"End {name}")

async def main():
    t1 = asyncio.create_task(task("A", 2))
    t2 = asyncio.create_task(task("B", 1))
    await t1
    await t2

asyncio.run(main())
```

---

## ⏰ Timeouts

```python
async def delayed():
    await asyncio.sleep(5)
    return "done"

async def main():
    try:
        result = await asyncio.wait_for(delayed(), timeout=2)
    except asyncio.TimeoutError:
        print("Timeout!")

asyncio.run(main())
```

---

## 🌀 Real Example: Async Web Requests with `aiohttp`

```python
import aiohttp
import asyncio

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = ["https://httpbin.org/delay/1", "https://httpbin.org/delay/2"]
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        print(results)

asyncio.run(main())
```

---

## 📋 Parallelism vs Concurrency

* **Concurrency**: Doing many tasks at once but not necessarily in parallel (asyncio).
* **Parallelism**: Running tasks literally at the same time on multiple cores (use `multiprocessing`).

---

## 🧱 Advanced Features

### 1. **Queues for Communication**

```python
async def producer(queue):
    for i in range(5):
        await queue.put(i)
        print(f"Produced {i}")

async def consumer(queue):
    while True:
        item = await queue.get()
        print(f"Consumed {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue()
    await asyncio.gather(
        producer(queue),
        consumer(queue),
    )

asyncio.run(main())
```

---

### 2. **Event Loop Customization**

```python
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

async def hello():
    print("Custom loop")
    await asyncio.sleep(1)
    print("Done")

loop.run_until_complete(hello())
```

---

### 3. **Async Generators**

```python
async def async_gen():
    for i in range(3):
        yield i
        await asyncio.sleep(1)

async def main():
    async for value in async_gen():
        print(value)

asyncio.run(main())
```

---

## 📚 Best Practices

* Use `asyncio.run()` only once (entry point).
* Avoid blocking calls (like `time.sleep()`), use `await asyncio.sleep()`.
* Use `asyncio.create_task()` for fire-and-forget tasks.
* Catch exceptions with `try/except` around `await` and `gather()`.

---

## 🔍 Resources

* [Official asyncio docs](https://docs.python.org/3/library/asyncio.html)
* `aiohttp` for async HTTP requests
* `asyncpg` for async Postgres
* `trio` and `curio`: alternative async frameworks

---

Would you like:

* A **PDF version** of this tutorial?
* A **hands-on project** using async (like building a web scraper, async downloader, or API client)?
* Daily **practice exercises with solutions**?

Let me know how you'd like to continue!



Great! Let’s build a **hands-on async web scraper in Python** using `asyncio` and `aiohttp`.

---

## 🧪 Project: Async Web Scraper with Python

We’ll scrape the `<title>` of multiple web pages concurrently using `aiohttp` and `BeautifulSoup`.

---

### 📦 Dependencies

Install the required libraries:

```bash
pip install aiohttp beautifulsoup4
```

---

### 🧱 File: `async_scraper.py`

```python
import asyncio
import aiohttp
from bs4 import BeautifulSoup
from typing import List

# List of URLs to scrape
URLS = [
    "https://example.com",
    "https://httpbin.org/html",
    "https://www.python.org",
    "https://www.wikipedia.org",
    "https://realpython.com"
]

# Fetch a single page and extract its <title>
async def fetch_title(session: aiohttp.ClientSession, url: str) -> str:
    try:
        async with session.get(url, timeout=10) as response:
            html = await response.text()
            soup = BeautifulSoup(html, "html.parser")
            title = soup.title.string.strip() if soup.title else "No title found"
            return f"{url} → {title}"
    except Exception as e:
        return f"{url} → Error: {str(e)}"

# Orchestrate concurrent scraping
async def scrape_all(urls: List[str]) -> None:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_title(session, url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=False)

        print("\nScraped Titles:")
        for result in results:
            print(result)

# Entry point
if __name__ == "__main__":
    asyncio.run(scrape_all(URLS))
```

---

### ✅ Output (Example):

```bash
https://example.com → Example Domain
https://httpbin.org/html → Herman Melville - Moby-Dick
https://www.python.org → Welcome to Python.org
https://www.wikipedia.org → Wikipedia
https://realpython.com → Python Tutorials – Real Python
```

---

### 🔄 What You Learned

* Using `aiohttp` for non-blocking HTTP requests
* Extracting data using `BeautifulSoup`
* Creating and running async tasks with `asyncio.gather`
* Handling exceptions gracefully in async workflows

---

### 🧠 Want to Extend This?

Here are a few ideas:

* Save titles to a CSV or database.
* Extract `<meta>` tags or `h1` headers.
* Add retry logic and timeout handling.
* Use an async queue and producer-consumer model for large-scale scraping.

Would you like to expand this into a full **async web crawler**, or scrape paginated APIs with rate limiting?

Let me know!
s