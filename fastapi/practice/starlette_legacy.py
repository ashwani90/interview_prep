from starlette.applications import Starlette
from starlette.responses import JSONResponse

app = Starlette()

@app.route("/")
async def homepage(request):
    return JSONResponse({"message": "Hello"})

@app.middleware("http")
async def log_requests(request, call_next):
    response = await call_next(request)
    return response

