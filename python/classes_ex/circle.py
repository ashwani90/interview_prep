# Make a Circle class with class variables for pi and methods for area/circumference.

class Circle:
    pi = 3.14159  # Class variable for the value of pi

    def __init__(self, radius):
        self.radius = radius  # Instance variable for the radius of the circle

    def area(self):
        """Calculate the area of the circle."""
        return Circle.pi * (self.radius ** 2)

    def circumference(self):
        """Calculate the circumference of the circle."""
        return 2 * Circle.pi * self.radius

# Example usage
circle = Circle(5)
print(f"Area: {circle.area()}")  # Output: Area: 78.53975
print(f"Circumference: {circle.circumference()}")  # Output: Circumference: 31.4159
