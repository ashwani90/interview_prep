from pydantic import BaseModel

class User(BaseModel):
    name: str 
    age: int 

user = User(name='John', age=25)

# Response model

class ResponseUser(BaseModel):
    name: str 

@app.get("/user", response_model=ResponseUser)
def get_user():
    return {"name": 'John', 'age': 25}