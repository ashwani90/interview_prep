class EnumMeta(type):
    """Metaclass for creating Enum classes"""
    
    def __new__(mcls, name, bases, namespace):
        # Create the new class
        cls = super().__new__(mcls, name, bases, namespace)
        
        # Skip if this is the base Enum class
        if name == 'Enum':
            return cls
        
        # Collect enum members (attributes that don't start with '_')
        members = {}
        for key, value in namespace.items():
            if not key.startswith('_'):
                members[key] = value
        
        # Create enum instances for each member
        enum_members = {}
        for key, value in members.items():
            if isinstance(value, (int, str)):
                # For simple values, create an Enum instance
                enum_member = cls()
                enum_member._name = key
                enum_member._value = value
                enum_members[key] = enum_member
                setattr(cls, key, enum_member)
            elif callable(value):
                # Skip methods
                continue
        
        # Store members and value lookup
        cls._member_map_ = enum_members
        cls._value2member_map_ = {v._value: v for v in enum_members.values()}
        
        return cls
    
    def __iter__(cls):
        """Allow iteration over enum members"""
        return iter(cls._member_map_.values())
    
    def __contains__(cls, member):
        """Support 'in' operator"""
        return member in cls._member_map_.values()
    
    def __getitem__(cls, name):
        """Allow access by name using []"""
        return cls._member_map_[name]

class Enum(metaclass=EnumMeta):
    """Base class for creating enumerated constants"""
    
    def __repr__(self):
        return f"<{self.__class__.__name__}.{self._name}: {self._value}>"
    
    def __str__(self):
        return f"{self.__class__.__name__}.{self._name}"
    
    @property
    def name(self):
        """The name of the enum member"""
        return self._name
    
    @property
    def value(self):
        """The value of the enum member"""
        return self._value
    
    def __eq__(self, other):
        """Equality comparison"""
        if not isinstance(other, Enum):
            return NotImplemented
        return (self.__class__ == other.__class__ and 
                self._value == other._value)
    
    def __hash__(self):
        """Make enum members hashable"""
        return hash((self.__class__, self._value))

# Example usage
if __name__ == "__main__":
    class Color(Enum):
        RED = 1
        GREEN = 2
        BLUE = 3
        WHITE = 255
        BLACK = 0
        
        def describe(self):
            return f"{self.name} is color number {self.value}"
    
    print("\n=== Enum Members ===")
    print(Color.RED)          # <Color.RED: 1>
    print(Color.GREEN)        # <Color.GREEN: 2>
    print(Color['BLUE'])      # <Color.BLUE: 3>
    
    print("\n=== Properties ===")
    print(Color.RED.name)     # RED
    print(Color.RED.value)    # 1
    print(Color.RED.describe())  # RED is color number 1
    
    print("\n=== Iteration ===")
    for color in Color:
        print(color)
    
    print("\n=== Membership ===")
    print(Color.RED in Color)  # True
    print(1 in Color)          # False (checks for member identity, not value)
    
    print("\n=== Comparison ===")
    print(Color.RED == Color.RED)    # True
    print(Color.RED == Color.GREEN)  # False
    print(Color.RED == 1)            # False
    
    print("\n=== Value Lookup ===")
    print(Color(1))            # <Color.RED: 1>
    print(Color(255))          # <Color.WHITE: 255>
    
    try:
        print(Color(999))      # Raises ValueError
    except ValueError as e:
        print(f"Error: {e}")

    print("\n=== String Values ===")
    class HTTPStatus(Enum):
        OK = "200 OK"
        NOT_FOUND = "404 Not Found"
        SERVER_ERROR = "500 Internal Server Error"
    
    print(HTTPStatus.OK)              # <HTTPStatus.OK: 200 OK>
    print(HTTPStatus['NOT_FOUND'])    # <HTTPStatus.NOT_FOUND: 404 Not Found>
    print(HTTPStatus("500 Internal Server Error"))  # <HTTPStatus.SERVER_ERROR: 500...>