class ImmutableMeta(type):
    """Metaclass to make objects immutable after __init__"""
    def __call__(cls, *args, **kwargs):
        # Create the instance
        instance = super().__call__(*args, **kwargs)
        # Lock the instance
        instance._frozen = True
        return instance

    def __setattr__(cls, name, value):
        raise AttributeError(f"Cannot modify {name} on immutable class")

class Immutable(metaclass=ImmutableMeta):
    """Base class for immutable objects"""
    __slots__ = ['_frozen']
    
    def __init__(self):
        self._frozen = False  # Allow initialization
    
    def __setattr__(self, name, value):
        if getattr(self, '_frozen', False):
            raise AttributeError(f"Cannot modify {name} on immutable object")
        super().__setattr__(name, value)
    
    def __delattr__(self, name):
        if getattr(self, '_frozen', False):
            raise AttributeError(f"Cannot delete {name} on immutable object")
        super().__delattr__(name)

# Example usage
class Point(Immutable):
    __slots__ = ['x', 'y']  # Fixed attributes for better performance
    
    def __init__(self, x, y):
        super().__init__()
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"
    
    def with_x(self, new_x):
        """Return a new Point with updated x value (functional update)"""
        return Point(new_x, self.y)
    
    def with_y(self, new_y):
        """Return a new Point with updated y value (functional update)"""
        return Point(self.x, new_y)

# Demonstration
if __name__ == "__main__":
    try:
        # Test immutability
        p = Point(3, 4)
        print("Created:", p)
        
        # Attempt to modify (should fail)
        p.x = 5
    except AttributeError as e:
        print(f"Expected error when modifying: {e}")
    
    try:
        # Attempt to add new attribute (should fail)
        p.z = 10
    except AttributeError as e:
        print(f"Expected error when adding attribute: {e}")
    
    try:
        # Attempt to delete attribute (should fail)
        del p.x
    except AttributeError as e:
        print(f"Expected error when deleting: {e}")
    
    # Functional updates work
    p2 = p.with_x(5)
    print("New point with updated x:", p2)
    
    # Original remains unchanged
    print("Original point remains:", p)
    
    # Class attributes are also immutable
    try:
        Point.color = "red"
    except AttributeError as e:
        print(f"Expected error when modifying class: {e}")