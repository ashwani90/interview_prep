from fastapi import Request
from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def custom_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": "Something went wrong"}
    )

