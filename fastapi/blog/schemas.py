from pydantic import BaseModel
from typing import List 

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    id: int
    title: str
    content: str 
    class Config:
        from_attributes = True
    

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    posts: List[PostResponse] = []
    class Config:
        from_attributes = True
    
