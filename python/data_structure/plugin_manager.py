import importlib
import pkgutil
from pathlib import Path
from typing import Dict, Type, Any, Optional, List
import sys
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PluginInterface:
    """Base class that all plugins must implement"""
    
    @classmethod
    def initialize(cls, **kwargs):
        """Initialize the plugin with any configuration"""
        pass
    
    @classmethod
    def execute(cls, *args, **kwargs) -> Any:
        """Execute the plugin's main functionality"""
        raise NotImplementedError("Plugins must implement execute()")

class PluginManager:
    """Manages discovery and loading of plugins"""
    
    def __init__(self, plugin_dir: Optional[str] = None):
        """
        Args:
            plugin_dir: Directory to search for plugins (None for entry points only)
        """
        self.plugins: Dict[str, Type[PluginInterface]] = {}
        self.plugin_dir = Path(plugin_dir) if plugin_dir else None
        
        # Add plugin directory to Python path if specified
        if self.plugin_dir and self.plugin_dir.exists():
            sys.path.append(str(self.plugin_dir))
    
    def discover_plugins(self) -> None:
        """Discover and load all available plugins"""
        self._discover_entry_point_plugins()
        
        if self.plugin_dir:
            self._discover_directory_plugins()
    
    def _discover_entry_point_plugins(self) -> None:
        """Discover plugins registered via package entry points"""
        try:
            from importlib.metadata import entry_points
            eps = entry_points()
            
            # Handle different Python versions
            if hasattr(eps, 'select'):
                # Python 3.10+
                plugin_eps = eps.select(group='my_plugins')
            else:
                # Python < 3.10
                plugin_eps = eps.get('my_plugins', [])
            
            for ep in plugin_eps:
                try:
                    plugin_class = ep.load()
                    if issubclass(plugin_class, PluginInterface):
                        self.plugins[ep.name] = plugin_class
                        logger.info(f"Loaded plugin from entry point: {ep.name}")
                    else:
                        logger.warning(
                            f"Plugin {ep.name} does not implement PluginInterface"
                        )
                except Exception as e:
                    logger.error(f"Failed to load plugin {ep.name}: {str(e)}")
        except ImportError:
            # Fallback for older Python versions
            try:
                import pkg_resources
                for ep in pkg_resources.iter_entry_points('my_plugins'):
                    try:
                        plugin_class = ep.load()
                        if issubclass(plugin_class, PluginInterface):
                            self.plugins[ep.name] = plugin_class
                            logger.info(f"Loaded plugin from entry point: {ep.name}")
                    except Exception as e:
                        logger.error(f"Failed to load plugin {ep.name}: {str(e)}")
            except ImportError:
                logger.warning("Could not check for entry points - pkg_resources not available")
    
    def _discover_directory_plugins(self) -> None:
        """Discover plugins in the specified directory"""
        if not self.plugin_dir or not self.plugin_dir.exists():
            return
        
        logger.info(f"Discovering plugins in directory: {self.plugin_dir}")
        
        # Find all Python files in the plugin directory
        for finder, name, _ in pkgutil.iter_modules([str(self.plugin_dir)]):
            try:
                module = importlib.import_module(name)
                self._register_plugins_from_module(module)
            except Exception as e:
                logger.error(f"Failed to load module {name}: {str(e)}")
    
    def _register_plugins_from_module(self, module) -> None:
        """Register all valid plugins found in a module"""
        for attr_name in dir(module):
            attr = getattr(module, attr_name)
            
            try:
                if (isinstance(attr, type) and 
                    issubclass(attr, PluginInterface) and 
                    attr is not PluginInterface):
                    plugin_name = getattr(attr, 'plugin_name', attr.__name__)
                    self.plugins[plugin_name] = attr
                    logger.info(f"Registered plugin: {plugin_name}")
            except TypeError:
                continue
    
    def initialize_plugins(self, **kwargs) -> None:
        """Initialize all discovered plugins"""
        for name, plugin in self.plugins.items():
            try:
                plugin.initialize(**kwargs)
                logger.info(f"Initialized plugin: {name}")
            except Exception as e:
                logger.error(f"Failed to initialize plugin {name}: {str(e)}")
    
    def get_plugin(self, name: str) -> Optional[Type[PluginInterface]]:
        """Get a plugin by name"""
        return self.plugins.get(name)
    
    def list_plugins(self) -> List[str]:
        """List all available plugin names"""
        return list(self.plugins.keys())

# Example plugin implementations
class GreetingPlugin(PluginInterface):
    """Example plugin that provides greetings"""
    
    plugin_name = "greeter"
    
    @classmethod
    def execute(cls, name: str = "World") -> str:
        return f"Hello, {name}!"

class CalculatorPlugin(PluginInterface):
    """Example plugin that performs calculations"""
    
    plugin_name = "calculator"
    
    @classmethod
    def initialize(cls, **kwargs):
        cls.precision = kwargs.get('precision', 2)
    
    @classmethod
    def execute(cls, operation: str, a: float, b: float) -> float:
        if operation == 'add':
            return round(a + b, cls.precision)
        elif operation == 'subtract':
            return round(a - b, cls.precision)
        raise ValueError(f"Unknown operation: {operation}")

# Example usage
if __name__ == "__main__":
    # Create a temporary plugin directory for demonstration
    import tempfile
    import os
    
    with tempfile.TemporaryDirectory() as temp_dir:
        # Create sample plugin files
        plugin1_path = os.path.join(temp_dir, "plugin1.py")
        with open(plugin1_path, 'w') as f:
            f.write("""
from plugin_system import PluginInterface

class FileAnalysisPlugin(PluginInterface):
    plugin_name = "file_analyzer"
    
    @classmethod
    def execute(cls, filepath: str) -> dict:
        import os
        return {
            'size': os.path.getsize(filepath),
            'exists': os.path.exists(filepath)
        }
            """)
        
        # Initialize plugin manager
        plugin_manager = PluginManager(plugin_dir=temp_dir)
        
        # Manually register our example plugins (in a real app these would be in separate files)
        plugin_manager.plugins['greeter'] = GreetingPlugin
        plugin_manager.plugins['calculator'] = CalculatorPlugin
        
        # Discover plugins (both from directory and entry points)
        plugin_manager.discover_plugins()
        
        # Initialize all plugins
        plugin_manager.initialize_plugins(precision=4)
        
        # List available plugins
        print("Available plugins:", plugin_manager.list_plugins())
        
        # Use the greeter plugin
        greeter = plugin_manager.get_plugin('greeter')
        if greeter:
            print(greeter.execute("Alice"))  # Hello, Alice!
        
        # Use the calculator plugin
        calculator = plugin_manager.get_plugin('calculator')
        if calculator:
            print(calculator.execute('add', 1.23456, 5.6789))  # 6.9135 (rounded to 4 decimals)
        
        # Use the dynamically loaded file analyzer plugin
        file_analyzer = plugin_manager.get_plugin('file_analyzer')
        if file_analyzer:
            print(file_analyzer.execute(__file__))  # Info about this script file