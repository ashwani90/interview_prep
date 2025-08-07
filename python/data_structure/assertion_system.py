from typing import Any
import json

class AssertionErrorDetail(Exception):
    def __init__(self, message, path=None, expected=None, actual=None):
        self.message = message
        self.path = path or []
        self.expected = expected
        self.actual = actual
        super().__init__(self._format_message())

    def _format_message(self):
        path_str = '->'.join(map(str, self.path)) if self.path else 'root'
        expected_str = json.dumps(self.expected, indent=2) if self.expected is not None else "None"
        actual_str = json.dumps(self.actual, indent=2) if self.actual is not None else "None"
        
        return (f"\nAssertion Failed: {self.message}\n"
                f"Path: {path_str}\n"
                f"Expected:\n{expected_str}\n"
                f"Actual:\n{actual_str}\n")

def assert_equal(actual: Any, expected: Any, path: list = None) -> None:
    """
    Compare two complex nested structures and raise detailed error if they differ.
    """
    path = path or []
    
    # Handle None cases
    if expected is None and actual is None:
        return
    if expected is None or actual is None:
        raise AssertionErrorDetail(
            "One value is None",
            path, expected, actual
        )
    
    # Check type mismatch
    if type(actual) != type(expected):
        raise AssertionErrorDetail(
            f"Type mismatch: expected {type(expected)}, got {type(actual)}",
            path, expected, actual
        )
    
    # Handle different data structures
    if isinstance(expected, dict):
        _assert_dict_equal(actual, expected, path)
    elif isinstance(expected, (list, tuple)):
        _assert_sequence_equal(actual, expected, path)
    elif isinstance(expected, set):
        _assert_set_equal(actual, expected, path)
    else:
        # For primitive types or custom objects
        if actual != expected:
            raise AssertionErrorDetail(
                "Values are not equal",
                path, expected, actual
            )

def _assert_dict_equal(actual: dict, expected: dict, path: list) -> None:
    """Compare dictionaries with detailed error reporting."""
    # Check keys
    expected_keys = set(expected.keys())
    actual_keys = set(actual.keys())
    
    if expected_keys != actual_keys:
        missing = expected_keys - actual_keys
        extra = actual_keys - expected_keys
        
        msg_parts = []
        if missing:
            msg_parts.append(f"missing keys: {missing}")
        if extra:
            msg_parts.append(f"extra keys: {extra}")
        
        raise AssertionErrorDetail(
            f"Dictionary keys differ: {', '.join(msg_parts)}",
            path, expected, actual
        )
    
    # Compare each value
    for key in expected_keys:
        assert_equal(actual[key], expected[key], path + [f"dict[{key!r}]"])

def _assert_sequence_equal(actual: list, expected: list, path: list) -> None:
    """Compare sequences (lists, tuples) with detailed error reporting."""
    if len(actual) != len(expected):
        raise AssertionErrorDetail(
            f"Length mismatch: expected {len(expected)}, got {len(actual)}",
            path, expected, actual
        )
    
    for i, (actual_item, expected_item) in enumerate(zip(actual, expected)):
        assert_equal(actual_item, expected_item, path + [f"list[{i}]"])

def _assert_set_equal(actual: set, expected: set, path: list) -> None:
    """Compare sets with detailed error reporting."""
    if actual != expected:
        missing = expected - actual
        extra = actual - expected
        
        msg_parts = []
        if missing:
            msg_parts.append(f"missing items: {missing}")
        if extra:
            msg_parts.append(f"extra items: {extra}")
        
        raise AssertionErrorDetail(
            f"Set contents differ: {', '.join(msg_parts)}",
            path, expected, actual
        )

# Example usage
if __name__ == "__main__":
    def test_complex_structures():
        expected = {
            "name": "John",
            "age": 30,
            "address": {
                "street": "123 Main St",
                "city": "New York"
            },
            "hobbies": ["reading", "hiking"],
            "scores": {"math": 90, "science": 85}
        }
        
        actual = {
            "name": "John",
            "age": 31,
            "address": {
                "street": "123 Main St",
                "city": "Boston"  # Different city
            },
            "hobbies": ["reading", "swimming"],  # Different hobby
            "scores": {"math": 90, "science": 85},
            "extra_field": "unexpected"  # Extra field
        }
        
        try:
            assert_equal(actual, expected)
            print("Assertion passed!")
        except AssertionErrorDetail as e:
            print(e)
    
    test_complex_structures()