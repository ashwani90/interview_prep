import time
import random
from functools import wraps
from typing import Callable, Type, Tuple, Optional, Union
import logging

# Configure logging
logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class RetryExhaustedError(Exception):
    """Exception raised when all retry attempts are exhausted"""
    def __init__(self, original_exception: Exception, last_attempt: int):
        self.original_exception = original_exception
        self.last_attempt = last_attempt
        super().__init__(
            f"Retry exhausted after {last_attempt} attempts. Last error: {original_exception}"
        )

def retry_with_backoff(
    exceptions: Union[Type[Exception], Tuple[Type[Exception], ...]] = Exception,
    max_retries: int = 5,
    initial_delay: float = 1.0,
    max_delay: float = 60.0,
    exponential_base: float = 2.0,
    jitter: bool = True,
):
    """
    Decorator that retries a function with exponential backoff.
    
    Args:
        exceptions: Exception type(s) to catch and retry on
        max_retries: Maximum number of retry attempts
        initial_delay: Initial delay between retries in seconds
        max_delay: Maximum delay between retries in seconds
        exponential_base: Base for exponential backoff
        jitter: If True, adds random jitter to delays
    """
    def decorator(func: Callable):
        @wraps(func)
        def wrapper(*args, **kwargs):
            delay = initial_delay
            for attempt in range(1, max_retries + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_retries:
                        logger.error(
                            f"Attempt {attempt}/{max_retries} failed. No more retries."
                        )
                        raise RetryExhaustedError(e, attempt) from e
                    
                    # Calculate next delay with exponential backoff
                    delay = min(
                        initial_delay * (exponential_base ** (attempt - 1)),
                        max_delay
                    )
                    
                    # Add jitter to avoid thundering herd problem
                    if jitter:
                        delay = random.uniform(0, delay)
                    
                    logger.warning(
                        f"Attempt {attempt}/{max_retries} failed. "
                        f"Retrying in {delay:.2f} seconds. Error: {str(e)}"
                    )
                    time.sleep(delay)
        
        return wrapper
    return decorator

# Example usage
if __name__ == "__main__":
    # Example 1: Basic retry with exponential backoff
    @retry_with_backoff(
        exceptions=(ConnectionError, TimeoutError),
        max_retries=5,
        initial_delay=1,
        max_delay=10,
        exponential_base=2,
        jitter=True
    )
    def unreliable_api_call():
        """Simulates an unreliable API that fails 70% of the time"""
        if random.random() < 0.7:
            raise ConnectionError("API request failed")
        return "API response data"

    print("=== Example 1: Basic Retry ===")
    try:
        result = unreliable_api_call()
        print(f"Success: {result}")
    except RetryExhaustedError as e:
        print(f"Failed after retries: {e}")

    # Example 2: More complex scenario with custom exceptions
    class PaymentError(Exception):
        pass

    class PaymentProcessor:
        @retry_with_backoff(
            exceptions=PaymentError,
            max_retries=3,
            initial_delay=0.5,
            max_delay=5,
            exponential_base=1.5,
            jitter=True
        )
        def process_payment(self, amount: float):
            """Simulates a payment processor with occasional failures"""
            if random.random() < 0.6:
                raise PaymentError("Payment gateway timeout")
            return f"Processed ${amount:.2f}"

    print("\n=== Example 2: Class Method Retry ===")
    processor = PaymentProcessor()
    try:
        result = processor.process_payment(42.99)
        print(f"Payment result: {result}")
    except RetryExhaustedError as e:
        print(f"Payment failed after retries: {e.original_exception}")

    # Example 3: Different exception types
    @retry_with_backoff(
        exceptions=(ValueError, TypeError),
        max_retries=4,
        initial_delay=0.1
    )
    def parse_data(data: str):
        """Simulates data parsing that might fail"""
        if not data:
            raise ValueError("Empty data")
        if random.random() < 0.5:
            raise TypeError("Invalid data format")
        return {"data": data, "status": "parsed"}

    print("\n=== Example 3: Multiple Exception Types ===")
    try:
        result = parse_data("test")
        print(f"Parsed data: {result}")
    except RetryExhaustedError as e:
        print(f"Parsing failed: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")