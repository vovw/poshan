from jose import jwt,JWTError
from passlib.context import CryptContext

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
