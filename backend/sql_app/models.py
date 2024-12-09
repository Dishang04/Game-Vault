from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from fastapi import HTTPException
from cryptography.fernet import Fernet
# from .config import encryption_key
from sql_app import database
# import database # use this when creating new tables

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
    
    # Relationship
    added_games = relationship("Added", back_populates="owner")

    # Password encryption
    @property
    def password(self):
        try:
            return cipher.decrypt(self.hashed_password).decode()
        except:
            raise HTTPException(status_code=408, detail="Incorrect use of database")
    
    @password.setter
    def password(self, plain_password):
        self.hashed_password = cipher.encrypt(plain_password.encode())
        # print(self.hashed_password)


class Added(database.Base):
    __tablename__ = "added"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    game_id = Column(Integer, nullable=False)

    # Relationships
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner = relationship("Users", back_populates="added_games")

    my_platforms = relationship("Platforms", back_populates="added_game")
    my_game = relationship("MyGames", back_populates="added_game")
    wishlist = relationship("WishList", back_populates="added_game")
    currently_playing = relationship("Currently", back_populates="added_game")
    finished = relationship("Finished", back_populates="added_game")

class Platforms(database.Base):
    __tablename__ = "platforms"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    platform_name = String

    # Relationships
    added_game_id = Column(Integer, ForeignKey("added.id"), nullable=False)
    added_game = relationship("Added", back_populates="my_platforms")


class MyGames(database.Base):
    __tablename__ = "mygames"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)

    # Relationships
    added_game_id = Column(Integer, ForeignKey("added.id"), nullable=False)
    added_game = relationship("Added", back_populates="my_game")

class WishList(database.Base):
    __tablename__ = "wishlist"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)

    # Relationships
    added_game_id = Column(Integer, ForeignKey("added.id"), nullable=False)
    added_game = relationship("Added", back_populates="wishlist")

class Currently(database.Base):
    __tablename__ = "currentlyplaying"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    game_id = Column(Integer, nullable=False)

    # Relationships
    added_game_id = Column(Integer, ForeignKey("added.id"), nullable=False)
    added_game = relationship("Added", back_populates="currently_playing")

class Finished(database.Base):
    __tablename__ = "finished"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    game_id = Column(Integer, nullable=False)

    # Relationships
    added_game_id = Column(Integer, ForeignKey("added.id"), nullable=False)
    added_game = relationship("Added", back_populates="finished")
