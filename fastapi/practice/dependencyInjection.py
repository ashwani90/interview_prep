from fastapi import FastAPI

app = FastAPI()

def common_dependency():
    return {"msg": "Injected"}

@app.get("/")
def read(dep=Depends(common_dependency)):
    return dep


# Dependency with params

def verify_token(token: str):
    if token != 'secret_token':
        raise Exception("Invalid token")
    
    return token

@app.get("/verify")
def verify(verified_token=Depends(verify_token)):
    return {"token": verified_token}