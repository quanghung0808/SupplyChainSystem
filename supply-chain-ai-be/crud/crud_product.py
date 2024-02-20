from models import models
from sqlalchemy.orm import Session
from schemas import schemas
from fastapi import HTTPException

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()


def create_product(db: Session, product: schemas.ProductCreate):
    check_duplicate =  db.query(models.Product).filter(models.Product.name == product.name).first()
    if check_duplicate is None:    
        db_product = models.Product(name=product.name, category=product.category)
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product 
    else:
        raise HTTPException(
            status_code=404,
            detail=f"Duplicate!"
        ) 

def delete_product(db: Session, product_id: int):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID {product_id} : Does not exist"
        )

    db.query(models.Product).filter(models.Product.id == product_id).delete()
    db.commit()

def update_product(db: Session, product: schemas.ProductUpdate, product_id : int):
    product_model = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID {product_id} : Does not exist"
        )   
    check_duplicate =  db.query(models.Product).filter((models.Product.name == product.name) & (models.Product.category == product.category) ).first()
    if check_duplicate is None:
        product_model.name = product.name
        product_model.category = product.category
        db.add(product_model)
        db.commit()
        return product
    else:
        raise HTTPException(
            status_code=404,
            detail=f"Duplicate!"
        ) 

