# Implement a Temperature class that stores Celsius and converts to Fahrenheit.

class Temperature:
    
    def __init__(self, celsius):
        self.__celsius = celsius
        self.__fahrenheit = self.__celsius * 9/5 + 32
    
    def get_celsius(self):
        return self.__celsius

    def get_fahrenheit(self):
        return self.__fahrenheit

t = Temperature(40)

print(t.get_celsius())  # Returns 40
print(t.get_fahrenheit())  # Returns 104.0