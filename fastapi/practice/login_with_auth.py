from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI()

fake_user = {
    "username": "john_doe",
    "password": "secret"
}

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != fake_user["username"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(form_data.password, fake_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

