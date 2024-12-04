from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from cryptography.fernet import Fernet
import json

SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"

engine = create_engine( 
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False},
    echo=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal() 
    try:
        yield db
    finally:
        db.close()