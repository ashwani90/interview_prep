from database import engine, Base, SeesionLocal
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import crud, schemas

app = FastAPI()

# Dependency injection
def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally: 
        db.close()

Base.metadata.create_all(bind=engine)

@app.post("/users", response_model=schemas.UserReponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    retur crud.create_user(db, user)

@app.get("/users", response_model=list[schemas.UserReponse])
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

# or
@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.get("/users/{user_id}", response_model=schemas.UserReponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

