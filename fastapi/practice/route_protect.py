from jose import JWTError

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# secure endpoint

@app.get("/secure")
def protected_route(user=Depends(get_current_user)):
    return {"user": f"Hello {user}"}