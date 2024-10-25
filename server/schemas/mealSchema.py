from sqlalchemy import Column, Integer, String, Float, ForeignKey, Time, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import time
from sqlalchemy.dialects.postgresql import UUID
import uuid


# Define the Base class for SQLAlchemy models
Base = declarative_base()

class Meal(Base):
    __tablename__ = 'meals'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    time = Column(String, nullable=False)
    name = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    
    items = Column(JSON, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name':self.name,
            'time':self.time,
            'image_url':self.image_url,
            'items':self.items
        }