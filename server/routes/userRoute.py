from fastapi import APIRouter
from models import userReqMod,userResMod
from passlib.context import CryptContext
from jose import jwt,JWTError
from database import db_dependancy
from database import Base,engine
from schemas import User
router=APIRouter()

Base.metadata.create_all(bind=engine)


pwd_context=CryptContext(schemes=['bcrypt'],deprecated='auto')

def hashed_pass(password:str)->str:
    return pwd_context.hash(password)

def verify_hash_pass(plain_pass:str,hashed_pass:str)->bool:
    return pwd_context.verify(plain_pass,hashed_pass)
SECRET_KEY='fuck_yea_bitch_ass_nigga'
ALGORITHM='HS256'

def jwt_encode(data:str)->str:
    payload={'sub':str(data)}
    token=jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)
    return token

def jwt_decode(token:str):
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        return payload['sub']
    except JWTError:
        print("error")

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
