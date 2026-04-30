from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str

class UserReponse(BaseModel):
    id: int 
    name: str
    email: str 

    class Config:
        # this allows conversion from model to pydantic model
        from_attributes = True
    

    
