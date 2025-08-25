import unittest
import inspect
import importlib
from typing import List, Type
import sys

class CustomTestRunner:
    def __init__(self, verbosity: int = 2):
        """
        Initialize the test runner.
        
        Args:
            verbosity: 0 (quiet), 1 (dot output), or 2 (verbose)
        """
        self.verbosity = verbosity
        self.loader = unittest.TestLoader()
        self.runner = unittest.TextTestRunner(verbosity=verbosity)

    def discover_tests(self, directory: str = '.', pattern: str = 'test_*.py') -> List[str]:
        """
        Discover test modules in a directory.
        
        Args:
            directory: Directory to search (default: current)
            pattern: Filename pattern to match (default: test_*.py)
            
        Returns:
            List of discovered test module names
        """
        test_suite = self.loader.discover(directory, pattern=pattern)
        return [test.id() for test in self._iter_tests(test_suite)]

    def _iter_tests(self, test_suite):
        """Recursively iterate through test suite to get individual tests"""
        for test in test_suite:
            if isinstance(test, unittest.TestSuite):
                yield from self._iter_tests(test)
            else:
                yield test

    def load_tests_from_module(self, module_name: str) -> List[Type[unittest.TestCase]]:
        """
        Load test cases from a module using reflection.
        
        Args:
            module_name: Name of the module to import
            
        Returns:
            List of test case classes found in the module
        """
        module = importlib.import_module(module_name)
        test_classes = []
        
        for name, obj in inspect.getmembers(module):
            if (inspect.isclass(obj) and 
                issubclass(obj, unittest.TestCase) and 
                obj != unittest.TestCase):
                test_classes.append(obj)
        
        return test_classes

    def run_tests(self, test_classes: List[Type[unittest.TestCase]]) -> unittest.TestResult:
        """
        Run a list of test cases.
        
        Args:
            test_classes: List of test case classes to run
            
        Returns:
            TestResult object with run statistics
        """
        suite = unittest.TestSuite()
        for test_class in test_classes:
            tests = self.loader.loadTestsFromTestCase(test_class)
            suite.addTests(tests)
        
        return self.runner.run(suite)

    def run_from_directory(self, directory: str = '.', pattern: str = 'test_*.py') -> None:
        """
        Discover and run all tests in a directory.
        
        Args:
            directory: Directory to search (default: current)
            pattern: Filename pattern to match (default: test_*.py)
        """
        print(f"Discovering tests in {directory} with pattern {pattern}")
        test_suite = self.loader.discover(directory, pattern=pattern)
        self.runner.run(test_suite)

# Example test cases (would normally be in separate test_*.py files)
class TestMath(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(1 + 1, 2)
    
    def test_subtraction(self):
        self.assertEqual(5 - 3, 2)

class TestStrings(unittest.TestCase):
    def test_concatenation(self):
        self.assertEqual("a" + "b", "ab")

# Example usage
if __name__ == "__main__":
    # Create test runner
    runner = CustomTestRunner(verbosity=2)
    
    print("=== Option 1: Run tests from classes directly ===")
    test_classes = [TestMath, TestStrings]
    runner.run_tests(test_classes)
    
    print("\n=== Option 2: Discover and run tests from module ===")
    # Normally you would use an actual module name here
    # For demo, we'll add our test classes to sys.modules
    sys.modules['test_example'] = sys.modules[__name__]
    test_classes = runner.load_tests_from_module('test_example')
    runner.run_tests(test_classes)
    
    print("\n=== Option 3: Discover and run tests from directory ===")
    # This would normally search for test_*.py files in the directory
    # For demo purposes, we'll just show the method call
    print("(Would search for test files in current directory)")
    # runner.run_from_directory()