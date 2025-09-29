import sqlite3


DB_PATH = "../database/homeportal.db"

connection = sqlite3.connect(DB_PATH, check_same_thread=False)
cursor = connection.cursor()


def get_connection():
    return sqlite3.connect(DB_PATH)


def create_user_table():
    cursor.execute(
        "create table if not exists user(id int primary key, username text not null, passwd blob not null)"
    )


def add_user(id: int, username: str, passwd_hash: bytes):
    cursor.execute(
        "insert into user(id, username, passwd) values (?,?,?);",
        (id, username, passwd_hash),
    )


def get_user(id: int):
    cursor.execute(f"select * from user where id = {id};")
    return cursor.fetchone()


create_user_table()
