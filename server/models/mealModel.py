from pydantic import BaseModel
from schemas import Meal
from typing import Any, List

class mealReq(BaseModel):
    user_id:str
    image_base64: str

class mealRes(BaseModel):
    message:str
    error: bool

class getMealsReq(BaseModel):
    user_id:str

class getMealsRes(BaseModel):
    meals: List[Any]