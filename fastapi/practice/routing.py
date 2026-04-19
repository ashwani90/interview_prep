from fastapi.routing import APIRoute

class LoggingRoute(APIRoute):
    def get_route_handler(self):
        original_handler = super().get_route_handler()
        async def custom_handler(request):
            print("Request created")
            return await original_handler(request)
        return custom_handler

# Mutlitple routes

@app.get("/users")
@app.get("/customers")
def get_data():
    return {"data": []}

# path operations metadata for docs

@app.get("/items", tags=["items"], summary="Get items")
def get_items():
    return []

