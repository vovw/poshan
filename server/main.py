from fastapi import FastAPI,WebSocket
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict,List,Union
from database import Base,engine


import uvicorn

from routes import userRoute
from routes import mealRoute
app = FastAPI()

origins=["https://poshan-taupe.vercel.app"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Domains that can talk to your API
    allow_credentials=True,  # To allow cookies and authentication headers
    allow_methods=["*"],  # HTTP methods to allow
    allow_headers=["*"],  # Headers to allow
)

Base.metadata.create_all(bind=engine)
app.include_router(userRoute.router)
app.include_router(mealRoute.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}



if __name__=="__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
