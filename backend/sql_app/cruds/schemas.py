from pydantic import BaseModel
from typing import Optional, Union, List

class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str
    admin: bool = False
    active: bool = True
    
    class Config:
        from_orm = True

class User(BaseModel):
    firstname: str
    lastname: str
    email: str
    admin: bool = False
    active: bool = True
    
    
    class Config:
        from_orm = True

class UserInDB(User):
    hashed_password: str

class UserUpdate(BaseModel):
    email: str
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    hashed_password: Optional[str] = None

    class Config:
        from_orm = True

class EmailRequest(BaseModel):
    email: str
    
class Game(BaseModel):
    name: str
    platforms: List[str] = []

    class Config:
        from_orm = True

