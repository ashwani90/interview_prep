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