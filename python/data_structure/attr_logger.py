import logging
from typing import Any, Optional

class AttributeLogger:
    """Class that logs all attribute changes"""
    
    def __init__(self, name: Optional[str] = None, logger: Optional[logging.Logger] = None):
        """
        Args:
            name: Name for this instance (for logging)
            logger: Custom logger instance (default creates one)
        """
        self._name = name or self.__class__.__name__
        self._logger = logger or self._create_logger()
        
        # Initialize attributes without triggering logging
        super().__setattr__('_initialized', False)
        super().__setattr__('_attributes', {})
        super().__setattr__('_initialized', True)
    
    def _create_logger(self) -> logging.Logger:
        """Create and configure a logger instance"""
        logger = logging.getLogger(self._name)
        logger.setLevel(logging.INFO)
        
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            logger.addHandler(handler)
        
        return logger
    
    def __setattr__(self, name: str, value: Any):
        """Log all attribute assignments"""
        if not getattr(self, '_initialized', False):
            # Allow initialization of private attributes
            super().__setattr__(name, value)
            return
        
        old_value = getattr(self, name, '<undefined>')
        
        # Store the attribute in our tracking dict
        self._attributes[name] = value
        
        # Log the change
        self._logger.info(
            f"Attribute changed: {name} from {old_value!r} to {value!r}"
        )
        
        # Actually set the attribute
        super().__setattr__(name, value)
    
    def get_attribute_history(self) -> dict:
        """Get a dictionary of all tracked attributes and their current values"""
        return self._attributes.copy()
    
    def __repr__(self) -> str:
        return f"{self.__class__.__name__}(name={self._name!r})"

# Example usage
if __name__ == "__main__":
    # Configure root logger for the example
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    class Person(AttributeLogger):
        def __init__(self, name, age):
            super().__init__(name=f"Person({name})")
            self.name = name  # This will be logged
            self.age = age    # This will be logged
            self._secret = "shhh"  # Won't be logged (set before _initialized)
        
        def birthday(self):
            self.age += 1  # This will be logged
    
    print("Creating person...")
    p = Person("Alice", 30)
    
    print("\nModifying attributes...")
    p.age = 31
    p.name = "Alicia"
    p.new_attribute = "value"  # Dynamic attributes are also logged
    
    print("\nCalling method that modifies attributes...")
    p.birthday()
    
    print("\nCurrent attributes:")
    print(p.get_attribute_history())
    
    print("\nTrying to set private attribute...")
    p._secret = "not so secret"  # This will be logged too

    print("\nFinal state:")
    print(f"Name: {p.name}, Age: {p.age}")