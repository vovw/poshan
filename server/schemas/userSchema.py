from sqlalchemy import String,Integer,Column,Boolean,ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid

Base = declarative_base()
class User(Base):
    __tablename__="user"

    id=Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    email=Column(String,index=True)
    password=Column(String,index=True)
