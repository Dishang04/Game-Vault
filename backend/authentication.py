from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sql_app.cruds.schemas import User, UserInDB
from sql_app.database import get_db


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def fake_hash_password(password: str):
    return "fakehashed" + password

def fake_decode_token(token):
    return User(
        firstname="John", lastname="Doe", email=token + "fakedecoded", password="fakepassword"
    )

def get_user(db, email: str):
    if email in db:
        user_dict = db[email]
        return UserInDB(
            firstname = user_dict.firstname,
            lastname = user_dict.lastname,
            email = user_dict.email,
            hashed_password = user_dict.hashed_password,
            )


def fake_decode_token(token):
    user = get_user(Depends(get_db), token)
    return user


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if not current_user.active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user