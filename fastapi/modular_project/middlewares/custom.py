from fastapi import FastAPI
import time 

app = FastAPI()

@app.middleware("http")
async def custom_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    end_time = time.time()
    print(f"Request took {end_time - start_time} seconds")
    response.headers["X-Processing-Time"] = str(end_time - start_time)
    return response