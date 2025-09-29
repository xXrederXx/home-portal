import bcrypt


def generate_hash(passwd: str) -> bytes:
    return bcrypt.hashpw(passwd.encode("utf-8"), bcrypt.gensalt())

def is_right_passwd(entered: str, pw_hash: bytes) -> bool:
    return bcrypt.checkpw(entered.encode("utf-8"), pw_hash)


def generate_user_id(username, passwd_hash):
    return hash(username) ^ hash(passwd_hash)