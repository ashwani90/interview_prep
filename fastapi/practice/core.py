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

