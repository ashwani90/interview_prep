from fastapi import FastAPI 
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class Todo(BaseModel):
    id: int
    title: str
    completed: bool = False

class User(BaseModel):
    id: int
    name: str
    email: str

class UpdateUser(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None

todos = []
users = []

@app.post("/todos")
def create_todos(todo: Todo):
    todos.append(todo)
    return {"message": "Todo created successfully", "todo": todo}

@app.get("/todos/{todo_id}")
def get_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    return HTTPException(status_code=404, detail="Todo not found")

@app.get("/todos")
def get_todos():
    return todos

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, updated_todo: Todo):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todos[index] = updated_todo
            return {"message": "Todo updated successfully", "todo": updated_todo}
    return HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    for index,todo in enumerate(todos):
        if todo.id == todo_id:
            todos.pop(index)
            return {"message": "Todo deleted successfully"}
    return HTTPException(status_code=404, detail="Todo not found")

# user Crud System
@app.post("/users")
def create_user(user: User):
    users.append(user)
    return {"message": "User created successfully", "user": user}

@app.get("/users")
def get_users():
    return users

@app.get("/users/{user_id}")
def get_user(user_id: int):
    for user in users:
        if user.id == user_id:
            return user
    
    return HTTPException(status_code=404, detail="User not found")

@app.put("/users/{user_id}")
def update_user(user_id: int, updated_user: UpdateUser):
    for index, user in enumerate(users):
        if user.id == user_id:
            # Update the user's information if provided
            if updated_user.name is not None:
                users[index].name = updated_user.name
            if updated_user.email is not None:
                users[index].email = updated_user.email
            return {"message": "User updated successfully", "user": users[index]}
    return HTTPException(status_code=404, detail="User not found")

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    for index, user in enumerate(users):
        if user.id == user_id:
            users.pop(index)
            return {"message": "User deleted successfully"}
    return HTTPException(status_code=404, detail="User not found")

