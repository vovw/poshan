from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from database import db_dependancy
from database import Base,engine
from schemas import Meal
from uuid import UUID, uuid4
from models import mealReq, mealRes
from helper import upload_image_to_drive
import time


router = APIRouter()


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
            time="22:27",
            image_url=imgurl,
            items=[{
                "name": "Apple",
                "quantity": 1,
                "calories": 95
            }]
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
