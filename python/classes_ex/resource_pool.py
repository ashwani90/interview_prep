# Build a ResourcePool class using the Flyweight pattern to reuse limited objects.

import threading
from typing import Dict, Generic, TypeVar, Optional, Callable
from queue import Queue

T = TypeVar('T')

class ResourcePool(Generic[T]):
    """
    A thread-safe resource pool that reuses objects (Flyweight pattern)
    
    Features:
    - Reuses expensive-to-create objects
    - Limits maximum number of instances
    - Thread-safe operations
    - Optional cleanup callback
    """
    
    def __init__(
        self,
        creator: Callable[[], T],
        max_size: int = 10,
        cleanup: Optional[Callable[[T], None]] = None
    ):
        """
        Initialize the resource pool
        
        Args:
            creator: Function to create new resources
            max_size: Maximum number of resources to create
            cleanup: Function to clean up resources before reuse
        """
        self._creator = creator
        self._max_size = max_size
        self._cleanup = cleanup
        self._pool: Queue[T] = Queue(maxsize=max_size)
        self._lock = threading.Lock()
        self._active_instances: Dict[int, T] = {}
        self._created_count = 0

    def acquire(self) -> T:
        """
        Acquire a resource from the pool
        
        Returns:
            A resource object (either reused or newly created)
        """
        with self._lock:
            # Try to get from pool first
            if not self._pool.empty():
                resource = self._pool.get()
                self._active_instances[id(resource)] = resource
                return resource
            
            # Create new if under max size
            if self._created_count < self._max_size:
                resource = self._creator()
                self._created_count += 1
                self._active_instances[id(resource)] = resource
                return resource
            
            # Wait for a resource to be released
            while True:
                if not self._pool.empty():
                    resource = self._pool.get()
                    self._active_instances[id(resource)] = resource
                    return resource
                # In real implementation, you might want a timeout here

    def release(self, resource: T) -> None:
        """
        Release a resource back to the pool
        
        Args:
            resource: The resource to release
        """
        with self._lock:
            if id(resource) not in self._active_instances:
                raise ValueError("Resource not from this pool")
            
            # Clean up before returning to pool
            if self._cleanup:
                self._cleanup(resource)
            
            del self._active_instances[id(resource)]
            self._pool.put(resource)

    @property
    def available(self) -> int:
        """Number of resources currently available in the pool"""
        return self._pool.qsize()

    @property
    def in_use(self) -> int:
        """Number of resources currently in use"""
        return len(self._active_instances)

    @property
    def total_created(self) -> int:
        """Total number of resources created"""
        return self._created_count

    def __enter__(self):
        """Support for context manager protocol"""
        return self.acquire()

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Support for context manager protocol"""
        self.release(self)


# Example usage
if __name__ == "__main__":
    print("=== Database Connection Pool Example ===")
    
    class DatabaseConnection:
        def __init__(self, conn_id):
            self.conn_id = conn_id
            print(f"Created new connection {conn_id}")
        
        def query(self, sql):
            print(f"Connection {self.conn_id} executing: {sql}")
            return f"Results for: {sql}"
        
        def close(self):
            print(f"Closing connection {self.conn_id}")

    # Create a pool of database connections
    def create_connection():
        return DatabaseConnection(conn_id=hash(threading.get_ident()) % 1000)

    def cleanup_connection(conn):
        conn.close()

    pool = ResourcePool[DatabaseConnection](
        creator=create_connection,
        max_size=3,
        cleanup=cleanup_connection
    )

    # Use the pool
    def execute_query(pool, query):
        with pool as conn:  # Automatically acquires and releases
            return conn.query(query)

    queries = [
        "SELECT * FROM users",
        "SELECT * FROM orders",
        "UPDATE products SET stock = stock - 1",
        "DELETE FROM temp_data",
        "SELECT COUNT(*) FROM logs"
    ]

    from concurrent.futures import ThreadPoolExecutor

    with ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(
            lambda q: execute_query(pool, q),
            queries
        ))

    print("\nQuery results:", results)
    print(f"Pool stats - Created: {pool.total_created}, "
          f"In use: {pool.in_use}, Available: {pool.available}")