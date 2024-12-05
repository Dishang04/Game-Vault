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
    id: int
    firstname: str
    lastname: str
    email: str
    admin: bool = False
    active: bool = True
    
    
    class Config:
        from_orm = True

class UserInDB(BaseModel):
    hashed_password: str
    firstname: str
    lastname: str
    email: str
    admin: bool = False
    active: bool = True
    
    
    class Config:
        from_orm = True

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
    platforms: List[str] = []
    user_id: int
    game_id: int
    platform_name: str

    class Config:
        from_orm = True

class NewGame(BaseModel):
    user_id: int
    game_id: int

    class Config:
        from_orm = True

class ReturnGame(BaseModel):
    game_id: int

    class Config:
        from_orm = True
        from_attributes = True