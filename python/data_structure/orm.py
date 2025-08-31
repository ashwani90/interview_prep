import sqlite3
from typing import Dict, Type, TypeVar, List, Optional, Any
from dataclasses import dataclass, field

T = TypeVar('T', bound='BaseModel')

class Field:
    """Descriptor for model fields with type conversion"""
    def __init__(self, sql_type: str, primary_key: bool = False):
        self.sql_type = sql_type
        self.primary_key = primary_key
        self.name = None  # Will be set by the model metaclass
    
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, instance: 'BaseModel', owner: Type['BaseModel']):
        if instance is None:
            return self
        return instance._data.get(self.name)
    
    def __set__(self, instance: 'BaseModel', value: Any):
        instance._data[self.name] = value
        instance._dirty.add(self.name)

class ModelMeta(type):
    """Metaclass that collects all Field descriptors"""
    def __new__(mcls, name, bases, namespace):
        cls = super().__new__(mcls, name, bases, namespace)
        
        # Collect fields from class attributes
        cls._fields = {}
        cls._primary_key = None
        
        for name, attr in namespace.items():
            if isinstance(attr, Field):
                attr.__set_name__(cls, name)
                cls._fields[name] = attr
                if attr.primary_key:
                    if cls._primary_key is not None:
                        raise ValueError(f"Multiple primary keys in {cls.__name__}")
                    cls._primary_key = name
        
        return cls

class BaseModel(metaclass=ModelMeta):
    """Base class for all ORM models"""
    def __init__(self, **kwargs):
        self._data = {}
        self._dirty = set()
        
        for field_name, field in self._fields.items():
            value = kwargs.get(field_name)
            self._data[field_name] = value
    
    @classmethod
    def create_table(cls, conn: sqlite3.Connection):
        """Create the database table for this model"""
        columns = []
        for name, field in cls._fields.items():
            column_def = f"{name} {field.sql_type}"
            if field.primary_key:
                column_def += " PRIMARY KEY"
            columns.append(column_def)
        
        sql = f"CREATE TABLE IF NOT EXISTS {cls.__name__} ({', '.join(columns)})"
        conn.execute(sql)
        conn.commit()
    
    def save(self, conn: sqlite3.Connection):
        """Save the model to the database (insert or update)"""
        if not self._dirty:
            return
        
        if getattr(self, self._primary_key) is None:
            # Insert new record
            columns = []
            placeholders = []
            values = []
            
            for name in self._dirty:
                columns.append(name)
                placeholders.append('?')
                values.append(getattr(self, name))
            
            sql = f"""
                INSERT INTO {self.__class__.__name__} ({', '.join(columns)})
                VALUES ({', '.join(placeholders)})
            """
            cursor = conn.execute(sql, values)
            conn.commit()
            
            # Set the primary key if auto-incrementing
            if isinstance(self._fields[self._primary_key].sql_type, str) and \
               'INTEGER' in self._fields[self._primary_key].sql_type.upper():
                setattr(self, self._primary_key, cursor.lastrowid)
        else:
            # Update existing record
            updates = []
            values = []
            
            for name in self._dirty:
                updates.append(f"{name} = ?")
                values.append(getattr(self, name))
            
            values.append(getattr(self, self._primary_key))
            sql = f"""
                UPDATE {self.__class__.__name__}
                SET {', '.join(updates)}
                WHERE {self._primary_key} = ?
            """
            conn.execute(sql, values)
            conn.commit()
        
        self._dirty.clear()
    
    @classmethod
    def get(cls: Type[T], conn: sqlite3.Connection, pk: Any) -> Optional[T]:
        """Retrieve a model by primary key"""
        sql = f"SELECT * FROM {cls.__name__} WHERE {cls._primary_key} = ?"
        cursor = conn.execute(sql, (pk,))
        row = cursor.fetchone()
        
        if row is None:
            return None
        
        return cls(**dict(zip(cls._fields.keys(), row)))
    
    @classmethod
    def all(cls: Type[T], conn: sqlite3.Connection) -> List[T]:
        """Retrieve all models of this type"""
        sql = f"SELECT * FROM {cls.__name__}"
        cursor = conn.execute(sql)
        return [cls(**dict(zip(cls._fields.keys(), row))) for row in cursor]
    
    def delete(self, conn: sqlite3.Connection):
        """Delete this model from the database"""
        if getattr(self, self._primary_key) is None:
            return
        
        sql = f"DELETE FROM {self.__class__.__name__} WHERE {self._primary_key} = ?"
        conn.execute(sql, (getattr(self, self._primary_key),))
        conn.commit()
    
    def __repr__(self):
        fields = ', '.join(f"{k}={v!r}" for k, v in self._data.items())
        return f"{self.__class__.__name__}({fields})"

# Example model definitions
class User(BaseModel):
    id = Field("INTEGER", primary_key=True)
    name = Field("TEXT")
    email = Field("TEXT")
    age = Field("INTEGER")

class Product(BaseModel):
    id = Field("INTEGER", primary_key=True)
    name = Field("TEXT")
    price = Field("REAL")
    stock = Field("INTEGER")

# Example usage
if __name__ == "__main__":
    # Set up database
    conn = sqlite3.connect(":memory:")
    User.create_table(conn)
    Product.create_table(conn)
    
    # Create and save users
    alice = User(name="Alice", email="alice@example.com", age=30)
    bob = User(name="Bob", email="bob@example.com", age=25)
    
    alice.save(conn)
    bob.save(conn)
    
    # Create and save products
    product1 = Product(name="Laptop", price=999.99, stock=10)
    product2 = Product(name="Phone", price=699.99, stock=20)
    
    product1.save(conn)
    product2.save(conn)
    
    # Update a user
    alice.age = 31
    alice.save(conn)
    
    # Query all users
    print("All users:")
    for user in User.all(conn):
        print(user)
    
    # Query all products
    print("\nAll products:")
    for product in Product.all(conn):
        print(product)
    
    # Get a specific user
    print("\nGetting user with ID 1:")
    user = User.get(conn, 1)
    print(user)
    
    # Delete a product
    product1.delete(conn)
    print("\nProducts after deletion:")
    for product in Product.all(conn):
        print(product)
    
    conn.close()