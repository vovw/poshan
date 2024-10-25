from fastapi import FastAPI,WebSocket
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict,List,Union

from routes import userRoute
app = FastAPI()

origins=["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Domains that can talk to your API
    allow_credentials=True,  # To allow cookies and authentication headers
    allow_methods=["*"],  # HTTP methods to allow
    allow_headers=["*"],  # Headers to allow
)

app.include_router(userRoute.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
