# Implement a Vehicle system using Abstract Base Classes and abc module.

from abc import ABC, abstractmethod
from enum import Enum, auto
from typing import List, Optional

class FuelType(Enum):
    """Enumeration for fuel types"""
    PETROL = auto()
    DIESEL = auto()
    ELECTRIC = auto()
    HYBRID = auto()

class Vehicle(ABC):
    """Abstract Base Class for all vehicles"""
    
    def __init__(self, make: str, model: str, year: int, fuel_type: FuelType):
        self.make = make
        self.model = model
        self.year = year
        self.fuel_type = fuel_type
        self._speed = 0  # Current speed in km/h
        self._is_running = False
    
    @property
    @abstractmethod
    def vehicle_type(self) -> str:
        """Return the type of vehicle (must be implemented by subclasses)"""
        pass
    
    @abstractmethod
    def start_engine(self) -> None:
        """Start the vehicle's engine (must be implemented by subclasses)"""
        pass
    
    @abstractmethod
    def stop_engine(self) -> None:
        """Stop the vehicle's engine (must be implemented by subclasses)"""
        pass
    
    def accelerate(self, kmh: int) -> None:
        """Increase the vehicle's speed"""
        if not self._is_running:
            raise RuntimeError("Cannot accelerate when engine is off")
        self._speed += kmh
        print(f"Accelerating to {self._speed} km/h")
    
    def brake(self, kmh: int) -> None:
        """Decrease the vehicle's speed"""
        self._speed = max(0, self._speed - kmh)
        print(f"Braking to {self._speed} km/h")
    
    def get_speed(self) -> int:
        """Get current speed"""
        return self._speed
    
    def is_running(self) -> bool:
        """Check if engine is running"""
        return self._is_running
    
    def __str__(self) -> str:
        return (f"{self.vehicle_type}: {self.year} {self.make} {self.model} "
                f"({self.fuel_type.name.lower()})")

class LandVehicle(Vehicle, ABC):
    """Abstract base class for land vehicles"""
    
    @property
    def vehicle_type(self) -> str:
        return "Land Vehicle"
    
    @abstractmethod
    def change_gear(self, gear: int) -> None:
        """Change gear (must be implemented by subclasses)"""
        pass

class WaterVehicle(Vehicle, ABC):
    """Abstract base class for water vehicles"""
    
    @property
    def vehicle_type(self) -> str:
        return "Water Vehicle"
    
    @abstractmethod
    def drop_anchor(self) -> None:
        """Drop anchor (must be implemented by subclasses)"""
        pass
    
    @abstractmethod
    def raise_anchor(self) -> None:
        """Raise anchor (must be implemented by subclasses)"""
        pass

class Car(LandVehicle):
    """Concrete class representing a car"""
    
    def __init__(self, make: str, model: str, year: int, fuel_type: FuelType):
        super().__init__(make, model, year, fuel_type)
        self._current_gear = 0  # 0 = neutral
        self._max_gear = 6
    
    @property
    def vehicle_type(self) -> str:
        return "Car"
    
    def start_engine(self) -> None:
        if self._is_running:
            print("Engine is already running")
            return
        self._is_running = True
        print(f"{self.make} {self.model} engine started")
    
    def stop_engine(self) -> None:
        if not self._is_running:
            print("Engine is already stopped")
            return
        self._is_running = False
        self._speed = 0
        self._current_gear = 0
        print(f"{self.make} {self.model} engine stopped")
    
    def change_gear(self, gear: int) -> None:
        if not self._is_running:
            raise RuntimeError("Cannot change gear when engine is off")
        if gear < -1 or gear > self._max_gear:
            raise ValueError(f"Invalid gear. Must be between -1 (reverse) and {self._max_gear}")
        self._current_gear = gear
        print(f"Changed to gear {gear}")

class Boat(WaterVehicle):
    """Concrete class representing a boat"""
    
    def __init__(self, make: str, model: str, year: int, fuel_type: FuelType):
        super().__init__(make, model, year, fuel_type)
        self._anchor_dropped = False
    
    @property
    def vehicle_type(self) -> str:
        return "Boat"
    
    def start_engine(self) -> None:
        if self._is_running:
            print("Engine is already running")
            return
        if self._anchor_dropped:
            print("Cannot start engine with anchor dropped")
            return
        self._is_running = True
        print(f"{self.make} {self.model} boat engine started")
    
    def stop_engine(self) -> None:
        if not self._is_running:
            print("Engine is already stopped")
            return
        self._is_running = False
        self._speed = 0
        print(f"{self.make} {self.model} boat engine stopped")
    
    def drop_anchor(self) -> None:
        if self._anchor_dropped:
            print("Anchor already dropped")
            return
        if self._speed > 5:
            print("Cannot drop anchor at high speed")
            return
        self._anchor_dropped = True
        self._speed = 0
        print("Anchor dropped")
    
    def raise_anchor(self) -> None:
        if not self._anchor_dropped:
            print("Anchor already raised")
            return
        self._anchor_dropped = False
        print("Anchor raised")

class ElectricCar(Car):
    """Concrete class representing an electric car"""
    
    def __init__(self, make: str, model: str, year: int):
        super().__init__(make, model, year, FuelType.ELECTRIC)
        self._battery_level = 100  # Percentage
    
    @property
    def vehicle_type(self) -> str:
        return "Electric Car"
    
    def start_engine(self) -> None:
        if self._battery_level <= 5:
            print("Cannot start - battery too low")
            return
        super().start_engine()
    
    def get_battery_level(self) -> int:
        """Get current battery level percentage"""
        return self._battery_level
    
    def charge(self, percent: int) -> None:
        """Charge the battery"""
        self._battery_level = min(100, self._battery_level + percent)
        print(f"Battery charged to {self._battery_level}%")

# Example usage
if __name__ == "__main__":
    print("=== Vehicle System Demo ===")
    
    vehicles: List[Vehicle] = [
        Car("Toyota", "Camry", 2022, FuelType.PETROL),
        Boat("Yamaha", "242X", 2021, FuelType.DIESEL),
        ElectricCar("Tesla", "Model 3", 2023)
    ]
    
    for vehicle in vehicles:
        print("\n" + str(vehicle))
        print(f"Type: {vehicle.vehicle_type}")
        
        vehicle.start_engine()
        
        if isinstance(vehicle, LandVehicle):
            vehicle.change_gear(1)
            vehicle.accelerate(30)
            vehicle.brake(10)
            vehicle.change_gear(2)
        elif isinstance(vehicle, WaterVehicle):
            vehicle.raise_anchor()
            vehicle.accelerate(15)
            vehicle.drop_anchor()
        
        if isinstance(vehicle, ElectricCar):
            print(f"Battery level: {vehicle.get_battery_level()}%")
            vehicle.charge(20)
        
        vehicle.stop_engine()