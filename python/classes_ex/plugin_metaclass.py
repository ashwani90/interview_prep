# Implement a plugin architecture where classes register themselves automatically via metaclass or decorator.

from typing import Dict, Type, Any

class PluginMeta(type):
    """Metaclass that automatically registers plugins"""
    
    _plugins: Dict[str, Type[Any]] = {}
    
    def __new__(cls, name, bases, namespace):
        new_class = super().__new__(cls, name, bases, namespace)
        
        # Don't register abstract base classes
        if not namespace.get('__abstract__', False):
            plugin_name = namespace.get('__plugin_name__', name.lower())
            cls._plugins[plugin_name] = new_class
            print(f"Registered plugin: {plugin_name}")
        
        return new_class
    
    @classmethod
    def get_plugin(cls, name: str):
        """Get a plugin by name"""
        return cls._plugins.get(name)
    
    @classmethod
    def get_all_plugins(cls):
        """Get all registered plugins"""
        return cls._plugins.copy()


# Base class for plugins using the metaclass
class PluginBase(metaclass=PluginMeta):
    __abstract__ = True  # Marks this as an abstract base class
    
    def execute(self, *args, **kwargs):
        raise NotImplementedError("Plugins must implement execute()")


# Example plugins
class DataLoader(PluginBase):
    __plugin_name__ = "data_loader"
    
    def execute(self, source):
        return f"Loading data from {source}"

class DataProcessor(PluginBase):
    __plugin_name__ = "data_processor"
    
    def execute(self, data):
        return f"Processing {data}"

class DataExporter(PluginBase):
    __plugin_name__ = "data_exporter"
    
    def execute(self, data):
        return f"Exporting {data}"


# Using the plugins
if __name__ == "__main__":
    print("\nAvailable plugins:", PluginMeta.get_all_plugins().keys())
    
    loader = PluginMeta.get_plugin("data_loader")()
    processor = PluginMeta.get_plugin("data_processor")()
    exporter = PluginMeta.get_plugin("data_exporter")()
    
    data = loader.execute("database")
    processed = processor.execute(data)
    result = exporter.execute(processed)
    print("\nPlugin execution result:", result)