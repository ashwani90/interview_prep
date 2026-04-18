from main import app
from fastapi import Path

@app.get("/gusers/{user_id}")
def get_user(user_id: int):
    return {"Mesage": "original", "user_id": user_id}

# multiple path params
@app.get("/users/{user_id}/posts/{post_id}")
def multiple(user_id: int, post_id: int):
    return {
        "user_id": user_id,
        "post_id": post_id
    }

# with constraints
@app.get("/users/{user_id}")
def get_user_with_constraints(user_id: int = Path(..., ge=1)):
    return {"user_id": user_id}

# Query params
@app.get("/items/")
def get_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

from typing import Optional
@app.get("/search")
def search(q: Optional[str] = None):
    return {"query": q}

# Required
@app.get("/search")
def search(q: str):
    return {"query": q}

# Query validation
from fastapi import Query
@app.get("/items")
def get_items(skip: int = Query(0, ge=0), limit: int = Query(10, lt=100)):
    return {"skip": skip, "limit": limit}

