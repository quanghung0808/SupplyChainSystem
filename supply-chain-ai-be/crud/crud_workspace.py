from models import models
from sqlalchemy.orm import Session
from schemas import schemas
from fastapi import HTTPException

def get_workspace_by_product_id(db: Session, product_id: int):
    return db.query(models.Workspace).filter(models.Workspace.product_id == product_id).all()

def create_workspace(db: Session, workspace = schemas.WorkspaceCreate):
    check_duplicate =  db.query(models.Workspace).filter(models.Workspace.name == workspace.name).first()
    if check_duplicate is None:    
        db_workspace = models.Workspace(name=workspace.name, product_id=workspace.product_id)
        db.add(db_workspace)
        db.commit()
        db.refresh(db_workspace)
        return db_workspace   
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Duplicate!"
        )

def delete_workspace(db: Session, workspace_id: int):
    workspace = db.query(models.Workspace).filter(models.Workspace.id == workspace_id).first()
    if workspace is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID {workspace_id} : Does not exist"
        )

    db.query(models.Workspace).filter(models.Workspace.id == workspace_id).delete()
    db.commit()


