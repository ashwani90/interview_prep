import contextlib
from typing import Any, Callable, Optional
import unittest

class MonkeyPatcher:
    def __init__(self):
        self._patches = []

    def patch(
        self,
        target: Any,
        attribute: str,
        new_value: Any,
        restore_on_teardown: bool = True
    ) -> None:
        """Replace an attribute on a target object with a new value."""
        original = getattr(target, attribute)
        self._patches.append((target, attribute, original, restore_on_teardown))
        setattr(target, attribute, new_value)

    @contextlib.contextmanager
    def temporary_patch(self, target: Any, attribute: str, new_value: Any):
        """Context manager for temporary patching that auto-restores."""
        original = getattr(target, attribute)
        self.patch(target, attribute, new_value, restore_on_teardown=False)
        try:
            yield
        finally:
            setattr(target, attribute, original)

    def teardown(self) -> None:
        """Restore all patched attributes to their original values."""
        for target, attribute, original, should_restore in reversed(self._patches):
            if should_restore:
                setattr(target, attribute, original)
        self._patches = []


# Example usage in tests
class TestExample(unittest.TestCase):
    def setUp(self):
        self.monkey = MonkeyPatcher()

    def tearDown(self):
        self.monkey.teardown()

    def test_monkey_patching(self):
        # Original class we want to test
        class Calculator:
            def add(self, a, b):
                return a + b

        calc = Calculator()

        # Test with original implementation
        self.assertEqual(calc.add(2, 3), 5)

        # Patch the method
        def mock_add(self, a, b):
            return a * b  # Change behavior for testing

        self.monkey.patch(Calculator, 'add', mock_add)
        self.assertEqual(calc.add(2, 3), 6)  # Now multiplies instead

        # Temporary patch using context manager
        with self.monkey.temporary_patch(Calculator, 'add', lambda self, a, b: a - b):
            self.assertEqual(calc.add(5, 3), 2)  # Temporarily subtracts

        # Outside context manager, previous patch is restored
        self.assertEqual(calc.add(2, 3), 6)  # Still multiplies

    def test_patch_restoration(self):
        # Original function
        def original():
            return "original"

        # Mock function
        def mock():
            return "mock"

        # Patch and test
        self.monkey.patch(__main__, 'original', mock)
        self.assertEqual(original(), "mock")

        # After teardown (called automatically by tearDown)
        self.monkey.teardown()
        self.assertEqual(original(), "original")


# Standalone example (not in test)
class Database:
    def query(self):
        return "real database result"

def run_example():
    patcher = MonkeyPatcher()
    db = Database()

    print("Original:", db.query())  # "real database result"

    # Permanent patch
    patcher.patch(Database, 'query', lambda self: "mocked result")
    print("Patched:", db.query())  # "mocked result"

    # Temporary patch
    with patcher.temporary_patch(Database, 'query', lambda self: "temporary mock"):
        print("Temp patch:", db.query())  # "temporary mock"

    print("After temp:", db.query())  # "mocked result"

    patcher.teardown()
    print("Restored:", db.query())  # "real database result"

if __name__ == "__main__":
    unittest.main(exit=False)
    print("\nStandalone example:")
    run_example()