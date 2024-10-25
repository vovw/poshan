from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from database import db_dependancy
from database import Base,engine
from schemas import Meal
from uuid import UUID, uuid4
from models import mealReq, mealRes, getMealsReq, getMealsRes
from ai import analyze_meal_image
import json


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
        meal_id = await uuid4()
        response = await analyze_meal_image(req.image_url)['choices'][0]['message']['content']
        json_data = await convert_to_json(response)
        new_meal = await Meal(
            name=json_data['name'], 
            time=json_data['time'], 
            image_url=req.image_url,
            items=json_data['items']
        )
        
        # Add the meal to the session
        await db.add(new_meal)
        await db.commit()
        await db.refresh(new_meal)

        return {"message": "Meal created successfully", "error": False}
    except Exception as e:
        # Handle exceptions
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Failed to create meal")


@router.get("/get-meals/", response_model=getMealsRes)
async def get_meals(req:getMealsReq,db: db_dependancy):
    meals = await db.query(Meal).match({"user_id":getMealsReq.user_id}).all()
    return meals