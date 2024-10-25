from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,Session
from fastapi import Depends
from sqlalchemy.ext.declarative import declarative_base
from typing import Annotated
import models
DB_USER = "postgres.pglfcdzhnxfpawsuoydd"
DB_PASSWORD = "Poshan_12345_rane"  # Replace with your actual password
DB_HOST = "aws-0-ap-south-1.pooler.supabase.com"
DB_PORT = "6543"
DB_NAME = "postgres"
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
