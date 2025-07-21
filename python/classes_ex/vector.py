# Make a Vector class with magnitude, angle, and overloaded operators.

import math

class Vector:
    def __init__(self, x=None, y=None, magnitude=None, angle=None):
        """
        Initialize a vector using either:
        - Cartesian coordinates (x, y)
        - Polar coordinates (magnitude, angle in radians)
        
        Args:
            x (float): x-component (Cartesian)
            y (float): y-component (Cartesian)
            magnitude (float): vector length (polar)
            angle (float): angle in radians (polar)
        """
        if x is not None and y is not None:
            self.x = x
            self.y = y
        elif magnitude is not None and angle is not None:
            self.x = magnitude * math.cos(angle)
            self.y = magnitude * math.sin(angle)
        else:
            raise ValueError("Must specify either (x,y) or (magnitude,angle)")
    
    @property
    def magnitude(self):
        """Calculate the vector's magnitude (length)"""
        return math.sqrt(self.x**2 + self.y**2)
    
    @property
    def angle(self):
        """Calculate the vector's angle in radians"""
        return math.atan2(self.y, self.x)
    
    @property
    def angle_degrees(self):
        """Calculate the vector's angle in degrees"""
        return math.degrees(self.angle)
    
    def normalize(self):
        """Return a normalized version of the vector (unit vector)"""
        mag = self.magnitude
        if mag == 0:
            return Vector(0, 0)
        return Vector(self.x/mag, self.y/mag)
    
    # Operator overloading
    def __add__(self, other):
        """Vector addition"""
        if isinstance(other, Vector):
            return Vector(self.x + other.x, self.y + other.y)
        raise TypeError("Operands must be Vectors")
    
    def __sub__(self, other):
        """Vector subtraction"""
        if isinstance(other, Vector):
            return Vector(self.x - other.x, self.y - other.y)
        raise TypeError("Operands must be Vectors")
    
    def __mul__(self, scalar):
        """Scalar multiplication"""
        if isinstance(scalar, (int, float)):
            return Vector(self.x * scalar, self.y * scalar)
        raise TypeError("Can only multiply by scalar")
    
    def __rmul__(self, scalar):
        """Reverse scalar multiplication (scalar * vector)"""
        return self.__mul__(scalar)
    
    def __truediv__(self, scalar):
        """Scalar division"""
        if isinstance(scalar, (int, float)):
            return Vector(self.x / scalar, self.y / scalar)
        raise TypeError("Can only divide by scalar")
    
    def __neg__(self):
        """Unary negation"""
        return Vector(-self.x, -self.y)
    
    def dot(self, other):
        """Dot product of two vectors"""
        if isinstance(other, Vector):
            return self.x * other.x + self.y * other.y
        raise TypeError("Operand must be a Vector")
    
    def cross(self, other):
        """2D cross product (returns scalar)"""
        if isinstance(other, Vector):
            return self.x * other.y - self.y * other.x
        raise TypeError("Operand must be a Vector")
    
    def rotate(self, angle_radians):
        """Rotate vector by specified angle (in radians)"""
        cos_theta = math.cos(angle_radians)
        sin_theta = math.sin(angle_radians)
        new_x = self.x * cos_theta - self.y * sin_theta
        new_y = self.x * sin_theta + self.y * cos_theta
        return Vector(new_x, new_y)
    
    def __eq__(self, other):
        """Check if two vectors are equal (within floating point tolerance)"""
        if isinstance(other, Vector):
            return (math.isclose(self.x, other.x) and 
                    math.isclose(self.y, other.y))
        return False
    
    def __str__(self):
        """String representation"""
        return f"Vector(x={self.x:.2f}, y={self.y:.2f})"
    
    def __repr__(self):
        """Official representation"""
        return f"Vector(x={self.x}, y={self.y})"
    
    def to_polar(self):
        """Return polar representation as tuple (magnitude, angle in radians)"""
        return (self.magnitude, self.angle)


# Example usage
if __name__ == "__main__":
    # Create vectors
    v1 = Vector(3, 4)
    v2 = Vector(magnitude=5, angle=math.pi/3)  # 60 degrees
    
    print(f"v1: {v1}")
    print(f"v1 magnitude: {v1.magnitude:.2f}")
    print(f"v1 angle: {v1.angle_degrees:.2f}°")
    print(f"v2: {v2}")
    
    # Vector operations
    v3 = v1 + v2
    print(f"\nv1 + v2 = {v3}")
    
    v4 = v1 * 2
    print(f"v1 * 2 = {v4}")
    
    v5 = v1.rotate(math.pi/2)  # Rotate 90 degrees
    print(f"v1 rotated 90° = {v5}")
    
    # Dot and cross products
    print(f"\nv1 · v2 = {v1.dot(v2):.2f}")
    print(f"v1 × v2 = {v1.cross(v2):.2f}")
    
    # Normalization
    v1_normalized = v1.normalize()
    print(f"\nNormalized v1: {v1_normalized}")
    print(f"Normalized magnitude: {v1_normalized.magnitude:.2f}")
    
    # Polar coordinates
    mag, angle = v1.to_polar()
    print(f"\nv1 in polar coordinates:")
    print(f"Magnitude: {mag:.2f}")
    print(f"Angle: {math.degrees(angle):.2f}°")