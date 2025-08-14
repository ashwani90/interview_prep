import sys
import time
from typing import Optional, Type, Any, Tuple

class TimerContext:
    """Custom context manager for timing code blocks"""
    
    def __init__(self, name: str = "block"):
        self.name = name
        self.start_time = None
        self.end_time = None
    
    def __enter__(self):
        """Entry point for the context manager"""
        self.start_time = time.perf_counter()
        print(f"Starting {self.name}...")
        return self  # Can return an object to be used with 'as'
    
    def __exit__(
        self,
        exc_type: Optional[Type[BaseException]],
        exc_val: Optional[BaseException],
        exc_tb: Optional[Any]
    ) -> bool:
        """Exit point for the context manager"""
        self.end_time = time.perf_counter()
        elapsed = self.end_time - self.start_time
        print(f"Finished {self.name} in {elapsed:.4f} seconds")
        
        # Return True to suppress any exception that occurred
        # Return False or None to propagate the exception
        return False
    
    def elapsed(self) -> float:
        """Get elapsed time in seconds"""
        if self.start_time is None or self.end_time is None:
            raise RuntimeError("Context not yet completed")
        return self.end_time - self.start_time

class DatabaseConnection:
    """Custom context manager for database connections"""
    
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connection = None
    
    def __enter__(self):
        """Establish database connection"""
        print(f"Connecting to {self.connection_string}...")
        # Simulate connection
        self.connection = {"handle": "db_connection", "status": "open"}
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Clean up database connection"""
        if self.connection:
            print("Closing database connection...")
            self.connection["status"] = "closed"
        
        # Handle any exceptions that occurred in the block
        if exc_type is not None:
            print(f"An error occurred: {exc_val}")
            # Here you could log the error or rollback a transaction
        
        # Don't suppress any exceptions
        return False

def file_opener(file_path: str, mode: str = "r"):
    """Generator-based context manager without contextlib"""
    # Setup phase
    f = open(file_path, mode)
    print(f"Opened file {file_path}")
    
    try:
        yield f  # This is where the with block executes
    finally:
        # Cleanup phase
        f.close()
        print(f"Closed file {file_path}")

# Example usage
if __name__ == "__main__":
    print("=== Timer Context Example ===")
    with TimerContext("calculation") as timer:
        # Simulate some work
        sum(x * x for x in range(10_000))
    
    print(f"Elapsed time: {timer.elapsed():.6f} seconds\n")

    print("=== Database Connection Example ===")
    try:
        with DatabaseConnection("postgres://user:pass@localhost/db") as db:
            print(f"Using connection: {db}")
            # Simulate database operation
            if db["handle"] == "db_connection":
                print("Executing query...")
            # Simulate an error
            # raise ValueError("Query failed!")
    except Exception as e:
        print(f"Caught exception: {e}")
    finally:
        print("Database example complete\n")

    print("=== File Opener Example (generator-based) ===")
    try:
        # Using our generator-based context manager
        with file_opener(__file__, "r") as f:
            print(f"First line: {f.readline().strip()}")
            # The file will be automatically closed
    except Exception as e:
        print(f"File error: {e}")

    # Demonstration of exception handling
    print("\n=== Exception Handling Demonstration ===")
    class ExceptionHandler:
        def __enter__(self):
            print("Entering context")
            return self
        
        def __exit__(self, exc_type, exc_val, exc_tb):
            print(f"Exiting context with exception: {exc_val}")
            # Return True to suppress the exception
            return True  # Change to False to see the exception propagate
    
    with ExceptionHandler():
        print("Inside context")
        raise ValueError("This error will be suppressed!")
    print("This line executes because the exception was suppressed")