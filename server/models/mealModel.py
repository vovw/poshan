from pydantic import BaseModel
from typing import List

class MealItem(BaseModel):
    name: str
    quantity: int
    calories: int
    protein: int
    carbs: int
    fats: int

class Meal(BaseModel):
    id: int
    time: str
    name: str
    imageUrl: str
    items: List[MealItem]