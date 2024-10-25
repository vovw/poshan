from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,Session
from fastapi import Depends
from sqlalchemy.ext.declarative import declarative_base
from typing import Annotated
import models
import dotenv
import os

dotenv.load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# url_database='postgresql://postgres.tiqriynlomatzjzpqkbf:LZRmYtcQOg77uMUY@aws-0-ap-south-1.pooler.supabase.com:6543/postgres'
url_database = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create engine with SSL requirement (important for Supabase)
engine = create_engine(
    url_database,
    connect_args={
        "sslmode": "require"
    }
)
# engine=create_engine(url_database)
sessionlocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base=declarative_base()

def db_connect():
    db=sessionlocal()
    try:
        yield db
    finally:
        db.close()

db_dependancy=Annotated[Session,Depends(db_connect)]
