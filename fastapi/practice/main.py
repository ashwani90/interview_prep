from fastapi import FastAPI     
from pydantic import BaseModel
# This is core create instance of the app
app = FastAPI()


@app.get("/")
def read_root():
    return { 'message' : 'Hello World'}

@app.get("/hello")
def say_hello():
    return {"message": "Saying hello"}

# Dynamic routes

# Value passed directly to the url and to the function also
@app.get("/users/{user_id}")
def get_user(user_id: int):
    # Easy access of the variable (and type check by the pydantic as int)
    # Pydantic is already plugged in the fastapi
    return {"user_id", user_id}

class ResponseUser(BaseModel):
    name: str 
    age: int  # comment this to see the effect

@app.get("/user", response_model=ResponseUser)
def get_user():
    return {"name": 'John', 'age': 25}