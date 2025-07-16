# Create a Point class that supports adding two points using operator overloading (__add__).

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        if isinstance(other, Point):
            return Point(self.x + other.x, self.y + other.y)
        return NotImplemented

    def __repr__(self):
        return f"Point({self.x}, {self.y})"
# Example usage
p1 = Point(2, 3)
p2 = Point(5, 7)
p3 = p1 + p2  # Uses the __add__ method
print(p3)  # Output: Point(7, 10)
