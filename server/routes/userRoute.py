from fastapi import APIRouter
from models import userReqMod,userResMod

router=APIRouter()

@router.post("/login",response_model=userResMod)
async def login():
    print("Login")
    return {"error":False,"token":"token"}


@router.post("/register",response_model=userResMod)
async def register():
    print("Register")
    return {"error":False,"token":"token"}
