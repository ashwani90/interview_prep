"""
Create a Config class using the Borg Pattern to share state across instances.
"""

class Config:
    _shared_state = {}
    
    def __init__(self):
        self.__dict__ = self._shared_state
        if not hasattr(self, 'initialized'):
            self.initialized = True
            self.debug_mode = False
            self.log_level = 'INFO'
            self.database_url = 'sqlite:///default.db'
            self.max_connections = 10
            self.timeout = 30.0
    
    def __str__(self):
        return str(self._shared_state)
    
    def update_config(self, **kwargs):
        """Update multiple configuration settings at once"""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
            else:
                raise AttributeError(f"'{self.__class__.__name__}' has no attribute '{key}'")
            
    def reset_config(self):
        """Reset configuration to default values"""
        self._shared_state.clear()
        self.__init__()  # Reinitialize with defaults


# Example usage
if __name__ == "__main__":
    # Create first config instance
    config1 = Config()
    print("Initial config1:", config1)
    
    # Create second config instance - shares state with config1
    config2 = Config()
    print("Initial config2:", config2)
    
    # Modify through config1
    config1.debug_mode = True
    config1.log_level = 'DEBUG'
    config1.database_url = 'postgresql://user:pass@localhost/db'
    
    print("\nAfter modifying config1:")
    print("config1:", config1)
    print("config2:", config2)
    
    # Modify through config2
    config2.max_connections = 20
    config2.timeout = 45.0
    
    print("\nAfter modifying config2:")
    print("config1:", config1)
    print("config2:", config2)
    
    # Test update_config method
    config1.update_config(log_level='WARNING', timeout=60.0)
    
    print("\nAfter bulk update:")
    print("config1:", config1)
    print("config2:", config2)        