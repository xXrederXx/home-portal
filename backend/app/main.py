from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from .db import add_user, get_user, get_user_by_cred
from .util import generate_user_id, generate_hash

# .\venv\Scripts\activate
# uvicorn app.main:app --host 0.0.0.0 --port 8000


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specific origins like ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/hello")
def test_get():
    return {"message": "Hello from FastAPI"}


class CreateUserData(BaseModel):
    username: str
    passwd: str


@app.post("/api/createUser")
def create_user(data: CreateUserData):
    passwd_hash = generate_hash(data.passwd)
    username = data.username
    user_id = generate_user_id(username, passwd_hash)
    add_user(user_id, username, passwd_hash)
    return {"username": username, "passwd": passwd_hash, "user_id": user_id}


class LoginUserData(BaseModel):
    username: str
    passwd: str


@app.post("/api/loginUser")
def login_user(data: LoginUserData):
    passwd_hash = generate_hash(data.passwd)
    username = data.username
    user = get_user_by_cred(username, passwd_hash)

    if user:
        return {"error": "", "user_id": user[0]}

    return {"error": "Invalid Password or Username", "user_id": 0}
