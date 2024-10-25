from pydantic import BaseModel

class userRegister(BaseModel):
    email:str
    password:str
    calories:int
    protein:int
    carbs:int
    fats:int

class userlogin(BaseModel):
    email:str
    password:str

class userResMod(BaseModel):
    error:bool
    token:str

class getGoalsReq(BaseModel):
    user_id:str

class getGoalsRes(BaseModel):
    error:bool
    calories:int
    protein:int
    carbs:int
    fats:int
