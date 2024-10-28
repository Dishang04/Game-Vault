from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from fastapi import HTTPException
from cryptography.fernet import Fernet
# from .config import encryption_key
from sql_app import database

encryption_key = "qI2h4NuAp7ePJPZsiTcNhDbZaeKz1fuIrWhdSnzLGPI="

encryption_key_bytes = encryption_key.encode()

cipher = Fernet(encryption_key_bytes)

class Users(database.Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)    
    email = Column(String, nullable=False)
    hashed_password = Column("password", String, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    all_games = relationship("MyGames", back_populates="owner")
    my_wishlist = relationship("WishList", back_populates="owner")
    my_currentlyplaying = relationship("Currently", back_populates="owner")
    my_finished = relationship("Finished", back_populates="owner")


    @property
    def password(self):
        try:
            return cipher.decrypt(self.hashed_password).decode()
        except:
            raise HTTPException(status_code=408, detail="Incorrect use of database")
    
    @password.setter
    def password(self, plain_password):
        self.hashed_password = cipher.encrypt(plain_password.encode())
        print(self.hashed_password)


class MyGames(database.Base):
    __tablename__ = "mygames"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("Users", back_populates="all_games")


class WishList(database.Base):
    __tablename__ = "wishlist"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    game_id = Integer
    game_name = String

    owner = relationship("Users", back_populates="my_wishlist")



class Currently(database.Base):
    __tablename__ = "currentlyplaying"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    game_id = Integer
    game_name = String

    owner = relationship("Users", back_populates="my_currentlyplaying")

class Finished(database.Base):
    __tablename__ = "finished"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    game_id = Integer
    game_name = String

    owner = relationship("Users", back_populates="my_finished")