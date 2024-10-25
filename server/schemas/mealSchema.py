from sqlalchemy import Column, Integer, String, Float, ForeignKey, Time
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
    time = Column(String, nullable=False)
    name = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    
    # Relationship with items - each meal can contain multiple items
    items = relationship("Item", back_populates="meal", cascade="all, delete-orphan")

class Item(Base):
    __tablename__ = 'items'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    meal_id = Column(UUID(as_uuid=True), ForeignKey('meals.id', ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    calories = Column(Float, nullable=False)
    protein = Column(Float, nullable=False)
    carbs = Column(Float, nullable=False)
    fats = Column(Float, nullable=False)
    
    # Relationship back to Meal
    meal = relationship("Meal", back_populates="items")