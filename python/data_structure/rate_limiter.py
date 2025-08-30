import time
import asyncio
import threading
from collections import deque
from typing import Optional, Union

class TokenBucketRateLimiter:
    """Thread-safe token bucket rate limiter implementation"""
    
    def __init__(self, rate: float, capacity: int):
        """
        Args:
            rate: Tokens added per second
            capacity: Maximum tokens the bucket can hold
        """
        self.rate = rate
        self.capacity = capacity
        self.tokens = capacity
        self.last_refill = time.monotonic()
        self._lock = threading.Lock()
    
    def _refill(self):
        """Refill tokens based on elapsed time"""
        now = time.monotonic()
        elapsed = now - self.last_refill
        new_tokens = elapsed * self.rate
        
        if new_tokens > 0:
            with self._lock:
                self.tokens = min(self.capacity, self.tokens + new_tokens)
                self.last_refill = now
    
    def consume(self, tokens: int = 1) -> bool:
        """
        Attempt to consume tokens from the bucket.
        
        Returns:
            True if tokens were available and consumed, False otherwise
        """
        self._refill()
        
        with self._lock:
            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False
    
    def wait_for_token(self, tokens: int = 1) -> float:
        """
        Block until requested tokens are available.
        
        Returns:
            Time waited in seconds
        """
        start_time = time.monotonic()
        while not self.consume(tokens):
            time.sleep(0.01)  # Small sleep to prevent busy waiting
        return time.monotonic() - start_time

class AsyncTokenBucketRateLimiter:
    """Asyncio-compatible token bucket rate limiter"""
    
    def __init__(self, rate: float, capacity: int):
        """
        Args:
            rate: Tokens added per second
            capacity: Maximum tokens the bucket can hold
        """
        self.rate = rate
        self.capacity = capacity
        self.tokens = capacity
        self.last_refill = time.monotonic()
        self._lock = asyncio.Lock()
    
    async def _refill(self):
        """Refill tokens based on elapsed time"""
        now = time.monotonic()
        elapsed = now - self.last_refill
        new_tokens = elapsed * self.rate
        
        if new_tokens > 0:
            async with self._lock:
                self.tokens = min(self.capacity, self.tokens + new_tokens)
                self.last_refill = now
    
    async def consume(self, tokens: int = 1) -> bool:
        """
        Attempt to consume tokens from the bucket.
        
        Returns:
            True if tokens were available and consumed, False otherwise
        """
        await self._refill()
        
        async with self._lock:
            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False
    
    async def wait_for_token(self, tokens: int = 1) -> float:
        """
        Wait asynchronously until requested tokens are available.
        
        Returns:
            Time waited in seconds
        """
        start_time = time.monotonic()
        while not await self.consume(tokens):
            await asyncio.sleep(0.01)  # Small sleep to prevent busy waiting
        return time.monotonic() - start_time

def sync_example():
    """Example usage of synchronous rate limiter"""
    print("Synchronous Rate Limiter Example")
    limiter = TokenBucketRateLimiter(rate=2, capacity=5)  # 2 tokens per second, max 5
    
    for i in range(10):
        if limiter.consume():
            print(f"Operation {i+1}: Success")
        else:
            wait_time = limiter.wait_for_token()
            print(f"Operation {i+1}: Waited {wait_time:.2f}s")
        time.sleep(0.3)  # Simulate work

async def async_example():
    """Example usage of asynchronous rate limiter"""
    print("\nAsynchronous Rate Limiter Example")
    limiter = AsyncTokenBucketRateLimiter(rate=1, capacity=3)  # 1 token per second, max 3
    
    async def make_request(i):
        start = time.monotonic()
        if await limiter.consume():
            print(f"Request {i}: Success (immediate)")
        else:
            wait_time = await limiter.wait_for_token()
            print(f"Request {i}: Waited {wait_time:.2f}s")
        return time.monotonic() - start
    
    # Run 10 requests concurrently
    tasks = [make_request(i) for i in range(10)]
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    sync_example()
    
    # Run async example
    asyncio.run(async_example())