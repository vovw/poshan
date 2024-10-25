from pydantic import BaseModel

class mealReq(BaseModel):
    user_id:str
    image_url: str

class mealRes(BaseModel):
    message:str
    error: bool