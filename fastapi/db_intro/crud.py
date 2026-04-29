from sqlalchemy.orm import Session 
import models, schemas

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.UserDB(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(models.UserDB).all()

def get_user(db: Session, user_id: int):
    return db.query(models.UserDB).filter(models.UserDB.id == user_id).first()

