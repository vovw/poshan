from fastapi import APIRouter
from models import userReqMod,userResMod
from auth import jwt_decode, jwt_encode, hashed_pass, verify_hash_pass
from database import db_dependancy
from database import Base,engine
from schemas import User
router=APIRouter()

Base.metadata.create_all(bind=engine)


@router.post("/login",response_model=userResMod)
async def login(req:userReqMod,db:db_dependancy):
    user=db.query(User)
    findUser=user.filter(User.email==req.email).first()
    if findUser:
        if verify_hash_pass(req.password,str(findUser.password)):
            token=jwt_encode(str(findUser.id))
            return {"error":False,"token":token}
        else:
            return {"error":True,"token":""}
    else:
        return {"error":True,"token":""}


Base.metadata.create_all(bind=engine)
@router.post("/register",response_model=userResMod)
async def register(req:userReqMod,db:db_dependancy):
    user=db.query(User)
    findUser=user.filter(User.email==req.email).first()
    if findUser:
        return {"error":True,"token":""}
    hash_pass=hashed_pass(req.password)
    user=User(email=req.email,password=hash_pass)
    db.add(user)
    db.commit()
    db.refresh(user)
    token=jwt_encode(str(user.id))
    return {"error":False,"token":token}
