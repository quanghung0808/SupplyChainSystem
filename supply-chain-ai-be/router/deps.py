from models import models
from fastapi import  Depends,HTTPException
from database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from core.config import settings
from jose import jwt, JWTError
from datetime import timedelta, datetime
from starlette import status
from faker import Faker

fake = Faker()

def get_db():
    db = SessionLocal()
    for _ in range(10):  # Generate 10 fake products
        product = models.Product(
            name=fake.name(),
            category=fake.random_element(elements=("Electronics", "Clothing", "Books", "Food")),
        )
        db.add(product)
        db.commit()
    for _ in range(10):  # Generate 10 fake products
        workspace = models.Workspace(
            name=fake.name(), 
            product_id=fake.random_element(elements=("1", "2", "3", "4", "5", "6", "7", "8", "9", "10")))
        db.add(workspace)
        db.commit()
    try:
        yield db
    finally:
        db.close()



def authenticate_user(username: str, password: str, db):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        return False
    if not settings.bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.utcnow() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

async def get_current_user(token: Annotated[str, Depends(settings.oauth2_bearer)]):
    try:
        if token == settings.SYSTEM_ACCESS_TOKEN:
            return
        else:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
            username: str = payload.get('sub')
            user_id: int = payload.get('id')
      
            if username is None or user_id is None:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Could not validate user.")
            return {'username': username, 'id': user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate user.")
    
db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]