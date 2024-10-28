from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated

from sqlalchemy.orm import Session
from sql_app.database import get_db
from sql_app.cruds import schemas, user_crud

from authentication import fake_hash_password, HTTPException, oauth2_scheme

router = APIRouter()

# Working 
@router.post("/addmygame")
async def create_new_user(newuser: schemas.UserCreate, db: Session = Depends(get_db)):
    user = schemas.UserInDB(
        firstname= newuser.firstname,
        lastname = newuser.lastname,
        email= newuser.email.lower(),
        admin= newuser.admin,
        active= newuser.active,
        hashed_password= fake_hash_password(newuser.password)
    )

    user_existing = user_crud.get_user_by_email(db=db, email=user.email)

    if user_existing:
        raise HTTPException(status_code=403, detail="Email already exists")
    else:
        user_crud.create_user(db=db, user=user)
        return {"message": f"User succesfully made, welcome {newuser.firstname}"}
    
@router.put("/addwishlist", response_model=schemas.game)
def update_user(user_update: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = user_crud.update_user(db, user_update)
    if db_user is None:
        raise HTTPException(status_code=406, detail="User could not be updated")
    return db_user

@router.delete("/deleteuser")
async def read_user(email_request: schemas.EmailRequest, db: Session = Depends(get_db)):
    deleted = user_crud.hard_delete(db=db, email=email_request.email)
    if not deleted:
        raise HTTPException(status_code=407, detail="User could not be deleted")
    return {"message": "User deleted successfully"}


@router.get("/all_users")
async def get_all_users(db: Session = Depends(get_db)):
    return user_crud.get_all_users(db = db)

@router.post("/user", response_model=schemas.User)
async def read_user(email_request: schemas.EmailRequest, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_email(db=db, email=email_request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    email = form_data.username.lower()
    hashed_password = fake_hash_password(form_data.password)

    user_dict = user_crud.get_user_by_email(db=db, email=email)

    if not user_dict:
        raise HTTPException(status_code=401, detail="User does not exist.")
    
    user = schemas.UserInDB(
        firstname = user_dict.firstname,
        lastname = user_dict.lastname,
        email = user_dict.email,
        hashed_password = user_dict.password,
        )
    
    if email != user.email or hashed_password != user.hashed_password:
        raise HTTPException(status_code=402, detail="Incorrect username or password")

    return {"access_token": user.email, "token_type": "bearer"}