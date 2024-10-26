from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from database import db_dependancy
from database import Base,engine
from schemas import Meal
from uuid import UUID, uuid4
from models import mealReq, mealRes, getMealsReq, getMealsRes
from ai import analyze_meal_image
import json
from helper import upload_image_to_drive
import time
from auth import jwt_decode, jwt_encode, hashed_pass, verify_hash_pass
from typing import Any
from fastapi.encoders import jsonable_encoder

router = APIRouter()

async def convert_to_json(string):
    start = string.find("{")
    end = string.rfind("}")
    if start != -1 and end != -1:
        json_str = string[start:end + 1]  
        json_str = json_str.replace("'", "\"")  # Convert single quotes to double quotes
        
        try:
            json_data = json.loads(json_str)  # Parse the JSON string
            return json_data  # Return the parsed JSON as a dictionary
        except json.JSONDecodeError as e:
            return f"Failed to decode JSON: {e}"
    else:
        return "No JSON found"
    
Base.metadata.create_all(bind=engine)
@router.post("/upload-meal/", response_model=mealRes)
async def upload_meal(req: mealReq, db: db_dependancy):
    try:
        # Create a new Meal object
        imgurl = await upload_image_to_drive(req.image_base64)
        # time.sleep(10)
        # print(imgurl)
        # print(req)
        meal_id = uuid4()
        new_meal = Meal(
            name="Breakfast",
            time="04:09",
            image_url=imgurl,
            items=[
                {
                "name": "Apple",
                "quantity": 1,
                "calories": 95
            }
            ],
            user_id=UUID(req.user_id)
        )
        # print(new_meal)
        # Add the meal to the session
        db.add(new_meal)
        db.commit()
        db.refresh(new_meal)

        return {"message": "Meal created successfully", "error": False}
    except Exception as e:
        # Handle exceptions
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Failed to create meal")


@router.post("/get-all-meals/", response_model=Any)
async def get_meals(req: getMealsReq, db: db_dependancy):
    decoded = jwt_decode(req.user_id)
    allmeals = db.query(Meal).filter(Meal.user_id == decoded).all()
    return [jsonable_encoder(meal) for meal in allmeals]