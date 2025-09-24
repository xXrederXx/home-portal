import sqlite3
from fastapi import FastAPI

app = FastAPI()
DB_PATH = "../database/homeportal.db"

def get_connection():
    return sqlite3.connect(DB_PATH)

@app.get("/api/todos")
def get_todos():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title FROM todos;")
    rows = cursor.fetchall()
    conn.close()
    return [{"id": r[0], "title": r[1]} for r in rows]

@app.post("/api/todos")
def add_todo(title: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO todos (title) VALUES (?);", (title,))
    conn.commit()
    conn.close()
    return {"message": "Todo added!"}
