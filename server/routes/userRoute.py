from fastapi import APIRouter
from models import userRegister,userlogin,userResMod,getGoalsReq,getGoalsRes
from auth import jwt_decode, jwt_encode, hashed_pass, verify_hash_pass
from database import db_dependancy
from database import Base,engine
from schemas import User
router=APIRouter()

Base.metadata.create_all(bind=engine)


@router.post("/login",response_model=userResMod)
async def login(req:userlogin,db:db_dependancy):
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
async def register(req:userRegister,db:db_dependancy):
    user=db.query(User)
    findUser=user.filter(User.email==req.email).first()
    if findUser:
        return {"error":True,"token":""}
    hash_pass=hashed_pass(req.password)
    user=User(email=req.email,password=hash_pass,calories=req.calories,protein=req.protein,carbs=req.carbs,fats=req.fats)
    db.add(user)
    db.commit()
    db.refresh(user)
    token=jwt_encode(str(user.id))
    return {"error":False,"token":token}

Base.metadata.create_all(bind=engine)
@router.post("/get-goals",response_model=getGoalsRes)
async def getGoals(req:getGoalsReq,db:db_dependancy):
    user_id = jwt_decode(req.user_id)
    user=db.query(User).filter(User.id==user_id).first()
    return {"error":False,"calories":user.calories,"protein":user.protein,"carbs":user.carbs,"fats":user.fats}