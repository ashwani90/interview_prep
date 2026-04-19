from fastapi import APIRouter
# this can replace things of main.py
router = APIRouter(prefix="/posts", tags=["Posts"])

@router.get("/")
def get_posts("/"):
    return []