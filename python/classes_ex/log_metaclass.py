# This code defines a metaclass that logs method calls of classes that use it.
import logging
from functools import wraps
from typing import Any, Callable

class LoggingMeta(type):
    """Metaclass that logs all method calls of classes that use it"""
    
    def __new__(cls, name, bases, namespace):
        # Configure logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('method_calls.log'),
                logging.StreamHandler()
            ]
        )
        
        # Create the class first
        new_class = super().__new__(cls, name, bases, namespace)
        
        # Iterate through all attributes of the class
        for attr_name, attr_value in namespace.items():
            if callable(attr_value) and not attr_name.startswith('__'):
                # Replace the method with a wrapped version
                setattr(new_class, attr_name, cls._wrap_method(attr_name, attr_value))
        
        return new_class
    
    @staticmethod
    def _wrap_method(method_name: str, method: Callable) -> Callable:
        """Wrap a method with logging functionality"""
        @wraps(method)
        def wrapper(*args, **kwargs) -> Any:
            # Get the class name from the first argument (self)
            class_name = args[0].__class__.__name__ if args else 'UnknownClass'
            
            # Log method entry
            logging.info(
                f"Entering {class_name}.{method_name} with "
                f"args: {args[1:]}, kwargs: {kwargs}"
            )
            
            try:
                # Call the original method
                result = method(*args, **kwargs)
                
                # Log successful exit
                logging.info(
                    f"Exiting {class_name}.{method_name} with result: {result}"
                )
                return result
            except Exception as e:
                # Log exceptions
                logging.error(
                    f"Exception in {class_name}.{method_name}: {str(e)}",
                    exc_info=True
                )
                raise
        
        return wrapper


# Example usage
if __name__ == "__main__":
    class ExampleClass(metaclass=LoggingMeta):
        def __init__(self, value):
            self.value = value
        
        def add(self, x, y):
            return x + y + self.value
        
        def multiply(self, x, y):
            return x * y * self.value
        
        def risky_method(self):
            raise ValueError("Intentional error for demonstration")
    
    print("Creating instance and calling methods...")
    print("(Check console output and method_calls.log file)")
    
    example = ExampleClass(10)
    print("Result of add:", example.add(5, 3))
    print("Result of multiply:", example.multiply(2, 4))
    
    try:
        example.risky_method()
    except ValueError:
        print("Caught expected exception from risky_method")