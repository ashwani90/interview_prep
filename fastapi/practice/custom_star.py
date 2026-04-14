from fastapi import FastAPI
import time

app = FastAPI()

@app.middleware
async def custom_middleware(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Access raw request

@app.get("/a")
async def read_root(request: Request):
    user_agent = request.headers.get("user-agent")
    return {"user_agent": user_agent}

# Custom response

from fastapi.responses import JSONResponse
@app.get("/custom")
def custom_response():
    return JSONResponse(
        content={"message": "Custom"},
        status_code=202
    )

