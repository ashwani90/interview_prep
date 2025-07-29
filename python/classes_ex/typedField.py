""" 
Use descriptors to implement a TypedField class for enforcing type constraints on attributes.
"""

from typing import Any, Type, Union, get_origin, get_args
from functools import wraps

class TypedField:
    """Descriptor that enforces type constraints on attributes"""
    
    def __init__(
        self,
        type_hint: Union[Type, tuple],
        default: Any = None,
        allow_none: bool = False,
        coerce_types: bool = False
    ):
        """
        Args:
            type_hint: The expected type (or tuple of types)
            default: Default value if not provided
            allow_none: Whether None is an acceptable value
            coerce_types: Attempt to coerce values to correct type
        """
        self.type_hint = type_hint
        self.default = default
        self.allow_none = allow_none
        self.coerce_types = coerce_types
        self.field_name = None  # Will be set by __set_name__

    def __set_name__(self, owner: type, name: str) -> None:
        self.field_name = name
        if self.default is not None:
            self._validate(self.default)

    def _validate(self, value: Any) -> None:
        """Validate the value against the type constraints"""
        if value is None:
            if not self.allow_none:
                raise TypeError(f"{self.field_name} cannot be None")
            return

        expected_types = self._get_expected_types()
        
        if not isinstance(value, expected_types):
            if self.coerce_types:
                try:
                    # Try to coerce to the first expected type
                    return expected_types[0](value)
                except (ValueError, TypeError) as e:
                    raise TypeError(
                        f"Cannot coerce {value!r} to {expected_types[0].__name__}"
                    ) from e
            raise TypeError(
                f"Expected {self.field_name} to be {self._type_string()}, got {type(value).__name__}"
            )

    def _get_expected_types(self) -> tuple:
        """Handle complex type hints from typing module"""
        origin = get_origin(self.type_hint)
        if origin is Union:
            # Handle Optional[Type] (which is Union[Type, None])
            args = [t for t in get_args(self.type_hint) if t is not type(None)]
            return tuple(args)
        elif origin is not None:
            return (origin,)
        return (self.type_hint,)

    def _type_string(self) -> str:
        """Generate a readable type string for error messages"""
        if isinstance(self.type_hint, tuple):
            return " or ".join(t.__name__ for t in self.type_hint)
        origin = get_origin(self.type_hint)
        if origin is Union:
            args = get_args(self.type_hint)
            return " or ".join(
                "None" if t is type(None) else t.__name__ 
                for t in args
            )
        return self.type_hint.__name__

    def __get__(self, instance: Any, owner: type) -> Any:
        if instance is None:
            return self
        return instance.__dict__.get(self.field_name, self.default)

    def __set__(self, instance: Any, value: Any) -> None:
        self._validate(value)
        instance.__dict__[self.field_name] = value

    def __delete__(self, instance: Any) -> None:
        if not self.allow_none:
            raise AttributeError(f"Cannot delete required field {self.field_name}")
        instance.__dict__[self.field_name] = None

def type_checked(cls):
    """Class decorator to enforce type checking on all TypedFields"""
    for name, attr in cls.__dict__.items():
        if isinstance(attr, TypedField):
            attr.__set_name__(cls, name)
    return cls

# Example Usage
if __name__ == "__main__":
    @type_checked
    class Person:
        name = TypedField(str, default="Anonymous")
        age = TypedField(int, allow_none=True)
        height = TypedField((int, float), coerce_types=True)  # Accepts int or float
        email = TypedField(str, allow_none=False)
        is_active = TypedField(bool, default=True)

        def __init__(self, **kwargs):
            for field, value in kwargs.items():
                setattr(self, field, value)

    # Valid usage
    p1 = Person(name="Alice", age=30, height=5.6, email="alice@example.com")
    print(f"Valid person: {p1.name}, {p1.age}, {p1.height}, {p1.email}")

    # Coercion example
    p2 = Person(name="Bob", height="180")  # String coerced to int for height
    print(f"Coerced height type: {type(p2.height).__name__}")

    # Invalid usage examples
    try:
        p3 = Person(name=123)  # Invalid type for name
    except TypeError as e:
        print(f"TypeError as expected: {e}")

    try:
        p4 = Person(email=None)  # None not allowed for email
    except TypeError as e:
        print(f"TypeError as expected: {e}")

    # Optional field
    p5 = Person(name="Charlie", age=None)  # None allowed for age
    print(f"Person with None age: {p5.age is None}")