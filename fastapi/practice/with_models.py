from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int

# Create user using the same user model

@app.post("/users")
def create_user(user: User):
    return user

class Product(BaseModel):
    name: str
    price: float
    available: bool

# Reusing model
class Address(BaseModel):
    street: str
    city: str
    zipcode: str

class User(BaseModel):
    name: str
    address: Address

# Combining everything
@app.post("/users/{user_id}")
def update_user(user_id: int, q: str, user: User):
    return {
        "user_id": user_id,
        "query": q,
        "user": user
    }

