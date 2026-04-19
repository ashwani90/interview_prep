from fastapi import APIRouter
# this can replace things of main.py
router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/")
def get_users("/"):
    return []