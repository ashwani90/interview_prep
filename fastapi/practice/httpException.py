from fastapi import HTTPException

@app.get("/items/{id}")
def get_item(id: str):
    # Simulate an error for demonstration purposes
    if id == "error":
        raise HTTPException(status_code=404, detail="Item not found")
    return {"id": id}

# Custom exception handler
from fastapi import Request
from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": "An unexpected error occurred"}
    )

class CustomError(Exception):
    pass

@app.exception_handler(CustomError)
async def handler_custom_error(request: Request, exc: CustomError):
    return JSONResponse(
        status_code=400,
        content={"error": "Custom error occurred"}
    )


# Usage with all things pluggin in
@app.get("/secure-data")
def secure_data(user=Depends(get_current_user)):
    if user['user'] != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    return {"data": "This is secure data"}

