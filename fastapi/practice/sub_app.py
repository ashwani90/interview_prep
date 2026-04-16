from fastapi import FastAPI

main_app = FastAPI()
sub_app = FastAPI()

@sub_app.get("/sub")
def get_sub():
    return {"message": "Error"}

main_app.mount("/sub", sub_app)
