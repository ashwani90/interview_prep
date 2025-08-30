import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, max_requests: int, time_window: int):
        """
        Initialize rate limiter.
        
        Args:
            max_requests: Maximum allowed requests per time window
            time_window: Time window in seconds
        """
        self.max_requests = max_requests
        self.time_window = time_window
        self.request_logs = defaultdict(list)  # {user_id/ip: [timestamps]}
    
    def is_allowed(self, identifier: str) -> bool:
        """
        Check if a request is allowed.
        
        Args:
            identifier: User ID, IP address, or other unique identifier
            
        Returns:
            bool: True if request is allowed, False if rate limited
        """
        current_time = time.time()
        
        # Remove old timestamps outside the time window
        self.request_logs[identifier] = [
            ts for ts in self.request_logs[identifier]
            if current_time - ts <= self.time_window
        ]
        
        # Check if under rate limit
        if len(self.request_logs[identifier]) < self.max_requests:
            self.request_logs[identifier].append(current_time)
            return True
        
        return False

# Example usage
if __name__ == "__main__":
    # Allow 5 requests per 10 seconds
    limiter = RateLimiter(max_requests=5, time_window=10)
    
    # Simulate requests from a user
    user_ip = "192.168.1.100"
    
    print("Testing rate limiter (5 requests per 10 seconds):")
    for i in range(1, 8):
        if limiter.is_allowed(user_ip):
            print(f"Request {i}: Allowed")
        else:
            print(f"Request {i}: Rate limited! (wait 10 seconds)")
        
        # Add delay between requests
        time.sleep(1)
    
    # After waiting, requests are allowed again
    print("\nWaiting 10 seconds...")
    time.sleep(10)
    
    print("\nAfter waiting:")
    for i in range(1, 4):
        if limiter.is_allowed(user_ip):
            print(f"Request {i}: Allowed")
        else:
            print(f"Request {i}: Rate limited!")