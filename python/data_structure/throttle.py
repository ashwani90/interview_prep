import time
from functools import wraps

def throttle(seconds: int):
    """
    Decorator that prevents a function from being called more than once every N seconds
    
    Args:
        seconds: Minimum time interval between allowed function calls
    """
    def decorator(func):
        # Store the last called time
        last_called = 0
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            nonlocal last_called
            current_time = time.time()
            elapsed = current_time - last_called
            
            if elapsed < seconds:
                remaining = seconds - elapsed
                print(f"Throttled! Please wait {remaining:.1f} more seconds to call {func.__name__}")
                return None
            
            last_called = current_time
            return func(*args, **kwargs)
        
        return wrapper
    return decorator

# Example usage
if __name__ == "__main__":
    @throttle(3)  # Only allow one call every 3 seconds
    def expensive_operation():
        print("Performing expensive operation...")
        return "Result"
    
    # First call - allowed
    print("1:", expensive_operation())
    
    # Immediate second call - throttled
    print("2:", expensive_operation())
    
    # Wait 2 seconds - still throttled
    time.sleep(2)
    print("3:", expensive_operation())
    
    # Wait 1 more second (total 3) - allowed
    time.sleep(1)
    print("4:", expensive_operation())
    
    # After another 3 seconds - allowed again
    time.sleep(3)
    print("5:", expensive_operation())