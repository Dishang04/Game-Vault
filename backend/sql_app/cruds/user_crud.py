from sqlalchemy.orm import Session

from . import schemas
from sql_app import models

def create_user(db: Session, user: schemas.UserInDB):
    db_user = models.Users(
        firstname = user.firstname, 
        lastname = user.lastname, 
        email = user.email, 
        password = user.hashed_password, 
        is_active = True
        )
        
    print(db_user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Users).offset(skip).limit(limit).all()

def get_user_by_email(db: Session, email: str):
    return db.query(models.Users).filter(models.Users.email == email).first()

def update_user(db: Session, user_update: schemas.UserUpdate):
    db_user = db.query(models.Users).filter(models.Users.email == user_update.email).first()
    if db_user is None:
        return None
    for key, value in user_update.model_dump(exclude={"email"}, exclude_unset=True).items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user


def soft_delete(db: Session, user: schemas.UserUpdate):
    db_user = models.Users(firstname = user.firstname, lastname = user.lastname, email = user.email, hashed_password = user.hashed_password, is_active = False)
    update_user(db=db, user_update=db_user)

def hard_delete(db: Session, email: str):
    db_user = db.query(models.Users).filter(models.Users.email == email).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False