
# Create a Rectangle class with methods for area and perimeter.
class Rectangle:
    
    def __init__(self, x, y):
        self.x = x
        self.y = y
        
    def area(self):
        return self.x*self.y

    def perimeter(self):
        return 2*(self.x+self.y)
    

react = Rectangle(12,12)
print(react.area())
print(react.perimeter())