# Implement a plugin architecture where classes register themselves automatically via decorator.

from typing import Dict, Type, Any

class PluginRegistry:
    """Registry for decorator-based plugins"""
    
    _plugins: Dict[str, Type[Any]] = {}
    
    @classmethod
    def register(cls, name: str = None):
        """Decorator factory for plugin registration"""
        def decorator(plugin_class: Type[Any]):
            plugin_name = name or plugin_class.__name__.lower()
            cls._plugins[plugin_name] = plugin_class
            print(f"Registered plugin: {plugin_name}")
            return plugin_class
        return decorator
    
    @classmethod
    def get_plugin(cls, name: str):
        """Get a plugin by name"""
        return cls._plugins.get(name)
    
    @classmethod
    def get_all_plugins(cls):
        """Get all registered plugins"""
        return cls._plugins.copy()


# Base class for plugins (optional)
class BasePlugin:
    def execute(self, *args, **kwargs):
        raise NotImplementedError("Plugins must implement execute()")


# Example plugins using decorator
@PluginRegistry.register("csv_loader")
class CSVLoader(BasePlugin):
    def execute(self, source):
        return f"Loading CSV from {source}"

@PluginRegistry.register("json_processor")
class JSONProcessor:
    def execute(self, data):
        return f"Processing JSON: {data}"

@PluginRegistry.register()  # Uses class name lowercase as default
class ExcelExporter:
    def execute(self, data):
        return f"Exporting to Excel: {data}"


# Using the plugins
if __name__ == "__main__":
    print("\nAvailable plugins:", PluginRegistry.get_all_plugins().keys())
    
    loader = PluginRegistry.get_plugin("csv_loader")()
    processor = PluginRegistry.get_plugin("json_processor")()
    exporter = PluginRegistry.get_plugin("excelexporter")()  # Default name
    
    data = loader.execute("data.csv")
    processed = processor.execute(data)
    result = exporter.execute(processed)
    print("\nPlugin execution result:", result)