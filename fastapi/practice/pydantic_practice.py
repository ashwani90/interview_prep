# Field validation and Constraints

from pydantic import BaseModel, Field

class User(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    age: int = Field(..., ge=0, le=120)

# Optional fields
class Cast(BaseModel):
    name: str = Field(None, min_length=2, max_length=100)
    age: Optional[int] = None # Default value

# default value and two ways
class Todo(BaseModel):
    name: str = Field(default="")
    completed: bool = False

# Embedded fields we have already seen

# List and Complex types
from typing import List

class User(BaseModel):
    name: str
    hobbies: List[str] # list of strings

# Custom validation
from pydantic import validator
class User(BaseModel):
    age: int
    @validator("age")
    def check_age(cls, value):
        if value < 18:
            raise ValueError("Must be adult")
        
        return value

class UserCreate(BaseModel):
    name: str
    age: int
    hobbies: List[str]

class UserResponse(BaseModel):
    name: str
@app.post("/user", response_model=UserResponse)
def create_user(user: UserCreate):
    return {"name": user.name} 

@app.get("/user/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    return {"name": "John Doe", "age": 30} # age will be removed


from typing import List
@app.get("/users", response_model=List[UserResponse])
def get_users():
    return [{"name": "John Doe"}, {"name": "Jane Smith"}]

