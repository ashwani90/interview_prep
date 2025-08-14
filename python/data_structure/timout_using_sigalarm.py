import signal
import threading
from functools import wraps
from typing import Callable, Any
import time

class TimeoutError(Exception):
    """Exception raised when a function times out"""
    pass

def time_limit(timeout_sec: int) -> Callable:
    """
    Decorator to limit function execution time.
    
    Args:
        timeout_sec: Maximum allowed execution time in seconds
    """
    def decorator(func: Callable) -> Callable:
        if hasattr(signal, 'SIGALRM'):
            # UNIX version using signals
            @wraps(func)
            def unix_wrapper(*args, **kwargs) -> Any:
                def handler(signum, frame):
                    raise TimeoutError(f"Function {func.__name__} timed out after {timeout_sec} seconds")
                
                # Set the signal handler
                old_handler = signal.signal(signal.SIGALRM, handler)
                signal.alarm(timeout_sec)  # Set the alarm
                
                try:
                    result = func(*args, **kwargs)
                finally:
                    # Clean up
                    signal.alarm(0)  # Cancel the alarm
                    signal.signal(signal.SIGALRM, old_handler)  # Restore original handler
                
                return result
            
            return unix_wrapper
        else:
            # Cross-platform version using threads
            @wraps(func)
            def thread_wrapper(*args, **kwargs) -> Any:
                result = None
                exception = None

                def target():
                    nonlocal result, exception
                    try:
                        result = func(*args, **kwargs)
                    except Exception as e:
                        exception = e

                thread = threading.Thread(target=target)
                thread.daemon = True
                thread.start()
                thread.join(timeout=timeout_sec)

                if thread.is_alive():
                    # Thread is still running - timeout occurred
                    raise TimeoutError(f"Function {func.__name__} timed out after {timeout_sec} seconds")
                elif exception is not None:
                    raise exception
                else:
                    return result
            
            return thread_wrapper
    
    return decorator

# Example usage
if __name__ == "__main__":
    @time_limit(2)
    def long_running_function(seconds: int) -> str:
        """Function that might run too long"""
        time.sleep(seconds)
        return f"Completed after {seconds} seconds"

    # Test cases
    test_cases = [1, 3, 2]
    
    for duration in test_cases:
        print(f"\nTesting with {duration} second runtime (timeout=2):")
        try:
            result = long_running_function(duration)
            print("Success:", result)
        except TimeoutError as e:
            print("Error:", e)