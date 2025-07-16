# Create a Logger class using the Singleton pattern.

import threading

class Logger:
    _instance = None
    _lock = threading.Lock()
    
    # remember we use this as this controls the object creation
    #  we cannot use __init__ method as it executes when the object has already been created
    # so you can not return the instance in it 
    def __new__(cls, *args, **kwargs):
        # Double-checked locking pattern for thread safety
        if not cls._instance:
            with cls._lock:
                if not cls._instance:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        """Initialize the logger instance"""
        self.log_level = "INFO"  # Default log level
        self.log_file = None     # Default to no file logging
        self._lock = threading.Lock()
    
    def set_log_level(self, level):
        """Set the log level (e.g., DEBUG, INFO, WARNING, ERROR, CRITICAL)"""
        valid_levels = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
        if level.upper() in valid_levels:
            self.log_level = level.upper()
        else:
            raise ValueError(f"Invalid log level. Must be one of: {', '.join(valid_levels)}")
    
    def set_log_file(self, file_path):
        """Set a file to write logs to"""
        self.log_file = file_path
    
    def log(self, message, level="INFO"):
        """Log a message with the specified level"""
        level = level.upper()
        log_entry = f"[{level}] {message}"
        
        # Check if the message should be logged based on log level
        levels = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
        if levels.index(level) >= levels.index(self.log_level):
            with self._lock:
                print(log_entry)  # Always print to console
                if self.log_file:
                    with open(self.log_file, "a") as f:
                        f.write(log_entry + "\n")
    
    # Convenience methods for different log levels
    def debug(self, message):
        self.log(message, "DEBUG")
    
    def info(self, message):
        self.log(message, "INFO")
    
    def warning(self, message):
        self.log(message, "WARNING")
    
    def error(self, message):
        self.log(message, "ERROR")
    
    def critical(self, message):
        self.log(message, "CRITICAL")


# Example usage
if __name__ == "__main__":
    # Get logger instances
    logger1 = Logger()
    logger2 = Logger()
    
    # Verify it's the same instance (Singleton)
    print(f"Are loggers the same instance? {logger1 is logger2}")  # True
    
    # Configure logging
    logger1.set_log_level("DEBUG")
    logger1.set_log_file("app.log")
    
    # Log some messages
    logger1.debug("This is a debug message")
    logger1.info("This is an info message")
    logger1.warning("This is a warning message")
    logger2.error("This is an error message")  # Uses the same instance
    logger1.critical("This is a critical message")