class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    role = Column(String) 


create_access_token({
    "sub": user.username,
    "role": user.role
})

# Extract user from token
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    role = payload.get("role")
    return User(username=username, role=role)

# Role checker dependency
from fastapi import HTTPException, Depends

def require_role(required_role: str):
    def role_checker(user=Depends(get_current_user)):
        if user["role"] != required_role:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return role_checker

# Protect routes
@app.delete("/users/{user_id}")
async def delete_user(user_id: int, current_user=Depends(require_role("admin"))):
    # Implementation for deleting user
    return {"message": "User deleted"}

# Allow multiple roles
def require_any_role(required_roles: list):
    def role_checker(user=Depends(get_current_user)):
        if user["role"] not in required_roles:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return role_checker

@app.get("/dashboard")
def dashboard(user=Depends(require_any_role(["admin", "user"]))):
    return {"message": "Welcome to the dashboard"}

