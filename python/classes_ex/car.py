# Create a Car class that tracks speed and supports accelerate() and brake().

class Car:
    def __init__(self, speed):
        self._speed = speed
    
    def accelerate(self, increment):
        self._speed += increment
        print(f"Accelerated to {self._speed} km/h")
        
    def brake(self, decrement):
        self._speed -= decrement
        if self._speed < 0:
            self._speed = 0
        print(f"Slowed down to {self._speed} km/h")
        
# Example usage
car = Car(50)
car.accelerate(20)  # Accelerated to 70 km/h
car.brake(30)      # Slowed down to 40 km/h
car.brake(50)      # Slowed down to 0 km/h