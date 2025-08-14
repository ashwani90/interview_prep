import threading
from typing import Any

class ThreadSafeSingleton:
    """Thread-safe singleton implementation using double-checked locking"""
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls, *args, **kwargs) -> Any:
        # Double-checked locking pattern
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance
    
    def __init__(self, *args, **kwargs) -> None:
        """Initialize only once"""
        if self._initialized:
            return
        
        with self._lock:
            if self._initialized:
                return
            
            # Your initialization code here
            self.data = kwargs.get('data', 'default')
            self.counter = 0
            
            self._initialized = True
    
    def increment_counter(self) -> None:
        """Thread-safe method example"""
        with self._lock:
            self.counter += 1
    
    def get_counter(self) -> int:
        """Thread-safe read method"""
        with self._lock:
            return self.counter

# Alternative implementation using module-level singleton
class ThreadSafeSingletonAlt:
    """Thread-safe singleton using module-level initialization"""
    _instance = None
    _lock = threading.Lock()
    
    @classmethod
    def get_instance(cls, *args, **kwargs) -> Any:
        """Get singleton instance (thread-safe)"""
        with cls._lock:
            if cls._instance is None:
                cls._instance = cls(*args, **kwargs)
        return cls._instance
    
    def __init__(self, *args, **kwargs) -> None:
        """Initialize instance"""
        self.data = kwargs.get('data', 'default')
        self.counter = 0

# Example usage
def test_singleton_thread_safety():
    singleton = ThreadSafeSingleton(data='test')
    print(f"Initial data: {singleton.data}")
    print(f"Initial counter: {singleton.get_counter()}")
    
    def worker():
        for _ in range(1000):
            singleton.increment_counter()
    
    # Create and start multiple threads
    threads = []
    for _ in range(10):
        t = threading.Thread(target=worker)
        threads.append(t)
        t.start()
    
    # Wait for all threads to complete
    for t in threads:
        t.join()
    
    print(f"Final counter (should be 10000): {singleton.get_counter()}")

if __name__ == "__main__":
    # Test basic singleton behavior
    s1 = ThreadSafeSingleton(data='first')
    s2 = ThreadSafeSingleton(data='second')
    
    print(f"Same instance? {s1 is s2}")  # Should be True
    print(f"s1 data: {s1.data}")  # Should be 'first'
    print(f"s2 data: {s2.data}")  # Should be 'first' (initialization only happens once)
    
    # Test thread safety
    test_singleton_thread_safety()