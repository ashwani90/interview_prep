import time
from functools import wraps
from typing import Any, Callable, Dict, Tuple, Optional
import inspect

class ExpiringCache:
    """Cache storage with time-based expiration"""
    
    def __init__(self):
        self._cache: Dict[Tuple[Tuple, frozenset], Tuple[Any, float]] = {}
    
    def get(self, key: Tuple[Tuple, frozenset]) -> Optional[Any]:
        """Get a cached value if it exists and hasn't expired"""
        if key not in self._cache:
            return None
        
        value, expiry = self._cache[key]
        if time.time() > expiry:
            del self._cache[key]
            return None
        
        return value
    
    def set(self, key: Tuple[Tuple, frozenset], value: Any, ttl: float) -> None:
        """Store a value with expiration time"""
        expiry = time.time() + ttl
        self._cache[key] = (value, expiry)
    
    def clear(self) -> None:
        """Clear all cached values"""
        self._cache.clear()

def memoize_with_ttl(ttl_seconds: float = 60, max_size: Optional[int] = None):
    """
    Memoization decorator with time-based expiration.
    
    Args:
        ttl_seconds: Time to live for cached results in seconds
        max_size: Maximum number of items to cache (None for unlimited)
    """
    cache = ExpiringCache()
    
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            # Create a cache key based on function arguments
            key = (args, frozenset(kwargs.items()))
            
            # Try to get cached result
            cached_result = cache.get(key)
            if cached_result is not None:
                return cached_result
            
            # Call the function if not in cache
            result = func(*args, **kwargs)
            
            # Store the result with expiration
            cache.set(key, result, ttl_seconds)
            
            # Enforce max size if specified
            if max_size is not None and len(cache._cache) > max_size:
                # Simple strategy: clear the cache when it exceeds max size
                cache.clear()
                cache.set(key, result, ttl_seconds)
            
            return result
        
        # Add cache management methods to the wrapper
        wrapper.clear_cache = cache.clear
        wrapper.cache_info = lambda: {
            'size': len(cache._cache),
            'ttl_seconds': ttl_seconds,
            'max_size': max_size
        }
        
        return wrapper
    return decorator

# Example usage
if __name__ == "__main__":
    # Example 1: Simple function with TTL
    @memoize_with_ttl(ttl_seconds=2)  # Cache expires after 2 seconds
    def calculate(x: int, y: int) -> int:
        print("Performing expensive calculation...")
        return x * y + x ** y
    
    print("=== Example 1: Basic Usage ===")
    print(calculate(2, 3))  # Will compute
    print(calculate(2, 3))  # Will return cached
    time.sleep(3)  # Wait for cache to expire
    print(calculate(2, 3))  # Will compute again
    print("Cache info:", calculate.cache_info())
    
    # Example 2: Function with keyword arguments
    @memoize_with_ttl(ttl_seconds=5)
    def greet(name: str, title: str = "Mr.") -> str:
        print("Generating greeting...")
        return f"Hello, {title} {name}!"
    
    print("\n=== Example 2: Keyword Arguments ===")
    print(greet("Alice", title="Dr."))
    print(greet("Alice", title="Dr."))  # Cached
    print(greet("Bob"))  # Different args
    print("Cache info:", greet.cache_info())
    
    # Example 3: Function with max cache size
    @memoize_with_ttl(ttl_seconds=10, max_size=2)
    def get_user(id: int) -> dict:
        print(f"Fetching user {id} from database...")
        return {"id": id, "name": f"User{id}"}
    
    print("\n=== Example 3: Cache Size Limit ===")
    print(get_user(1))
    print(get_user(2))
    print(get_user(1))  # Cached
    print(get_user(3))  # Will exceed cache size, causing clear
    print("Cache info:", get_user.cache_info())
    
    # Example 4: Clearing the cache manually
    @memoize_with_ttl(ttl_seconds=60)
    def get_config(key: str) -> str:
        print(f"Loading config {key}...")
        return f"config_value_for_{key}"
    
    print("\n=== Example 4: Cache Management ===")
    print(get_config("timeout"))
    print(get_config("timeout"))  # Cached
    get_config.clear_cache()  # Manual clear
    print(get_config("timeout"))  # Will compute again