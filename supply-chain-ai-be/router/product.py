from fastapi import APIRouter, HTTPException
from schemas import schemas
from crud import crud_product
from crud import crud_product
from fastapi import  HTTPException
from typing import  List
from router.deps import user_dependency, db_dependency

router = APIRouter(
    prefix='/products',
    tags=['products']
)
# CRUD Product

@router.post('/', response_model=schemas.Product)
def create_product(user: user_dependency, product: schemas.ProductCreate, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    return crud_product.create_product(db=db, product=product)

@router.put('/{product_id}', response_model=schemas.Product)
def update_product(user: user_dependency, product: schemas.ProductUpdate, db: db_dependency, product_id: int):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    return crud_product.update_product(db=db, product=product, product_id=product_id)


@router.get('/', response_model=List[schemas.Product])
def read_products(user: user_dependency, db: db_dependency, skip: int = 0, limit: int = 100,):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    products = crud_product.get_products(db, skip=skip, limit=limit)
    return products

@router.delete('/{product_id}')
def read_products(user: user_dependency, db: db_dependency, product_id:  int):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    crud_product.delete_product(db, product_id=product_id)
    return {'message': "Delete successfully"}
