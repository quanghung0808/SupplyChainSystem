from fastapi import APIRouter, HTTPException, Depends
from starlette import status
from fastapi.security import  OAuth2PasswordRequestForm
from typing import Annotated
from datetime import timedelta
from models import models
from router.deps import authenticate_user, create_access_token, db_dependency
from schemas import schemas
from core.config import settings

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency,
                      create_user_request: schemas.CreateUserRequest):
    check_duplicate =  db.query(models.User).filter((models.User.username == create_user_request.username)).first()
    if check_duplicate is None:
        create_user_model = models.User(
            username=create_user_request.username,
            hashed_password=settings.bcrypt_context.hash(create_user_request.password,
            ))
        db.add(create_user_model)
        db.commit()
        return {'message': "Create successfully", 'status': status.HTTP_201_CREATED}

    else:
        raise HTTPException(
            status_code=404,
            detail=f"Duplicate!"
        ) 
    
@router.post("/login", response_model=schemas.ResponseLogin)
async def login_for_access_token(form_data: schemas.UserLogin,
                                 db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Wrong username or password!")
    token = create_access_token(user.username, user.id, timedelta(minutes=30))
    return {'access_token': token, 'user': user}

# @router.post("/login", response_model=schemas.ResponseLogin)
# async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
#                                  db: db_dependency):
#     user = authenticate_user(form_data.username, form_data.password, db)
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
#                             detail="Wrong username or password!")
#     token = create_access_token(user.username, user.id, timedelta(minutes=30))
#     return {'access_token': token, 'user': user}
