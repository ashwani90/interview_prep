# Design a Shape base class and implement Triangle, Rectangle, Circle using polymorphism.

import math

class Shape:
    def area(self):
        """Calculate and return the area of the shape"""
        raise NotImplementedError("Subclasses must implement this method")
    
    def perimeter(self):
        """Calculate and return the perimeter of the shape"""
        raise NotImplementedError("Subclasses must implement this method")
    
    def __str__(self):
        """Return a string representation of the shape"""
        return f"{self.__class__.__name__} with area: {self.area():.2f} and perimeter: {self.perimeter():.2f}"


class Triangle(Shape):
    def __init__(self, side1, side2, side3):
        self.side1 = side1
        self.side2 = side2
        self.side3 = side3
    
    def area(self):
        # Using Heron's formula
        s = self.perimeter() / 2
        return math.sqrt(s * (s - self.side1) * (s - self.side2) * (s - self.side3))
    
    def perimeter(self):
        return self.side1 + self.side2 + self.side3
    
    def __str__(self):
        return f"Triangle(sides: {self.side1}, {self.side2}, {self.side3}) - " + super().__str__()


class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width
    
    def area(self):
        return self.length * self.width
    
    def perimeter(self):
        return 2 * (self.length + self.width)
    
    def __str__(self):
        return f"Rectangle(length: {self.length}, width: {self.width}) - " + super().__str__()


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        return 2 * math.pi * self.radius
    
    def __str__(self):
        return f"Circle(radius: {self.radius}) - " + super().__str__()


# Demonstration of polymorphism
def print_shape_info(shape):
    """This function demonstrates polymorphism - it works with any Shape subclass"""
    print(shape)
    print(f"Area: {shape.area():.2f}")
    print(f"Perimeter: {shape.perimeter():.2f}\n")


if __name__ == "__main__":
    # Create shapes
    shapes = [
        Triangle(3, 4, 5),
        Rectangle(4, 5),
        Circle(3)
    ]
    
    # Process each shape polymorphically
    for shape in shapes:
        print_shape_info(shape)