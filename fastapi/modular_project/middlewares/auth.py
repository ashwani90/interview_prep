@app.middleware("http")
async def authenticate_request(request: Request, call_next):
    token = request.headers.get("Authorization")
    if not token:
        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})
    
    return await call_next(request)


