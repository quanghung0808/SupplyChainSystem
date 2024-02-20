from fastapi import APIRouter, HTTPException
from schemas import schemas
from crud import crud_workspace
from typing import  List
from router.deps import user_dependency, db_dependency

router = APIRouter(
    prefix='/workspaces',
    tags=['workspaces']
)
# CRUD Workspace
@router.post('/', response_model=schemas.Workspace)
def create_workspace(user: user_dependency, workspace: schemas.WorkspaceCreate, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    return crud_workspace.create_workspace(db=db, workspace=workspace)


@router.get('/{product_id}', response_model=List[schemas.Workspace])
def read_workspaces(user: user_dependency, db: db_dependency, product_id: int):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    workspaces = crud_workspace.get_workspace_by_product_id(db, product_id=product_id)
    return workspaces

@router.delete('/{workspace_id}')
def delete_workspaces(user: user_dependency, db: db_dependency, workspace_id:  int):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    crud_workspace.delete_workspace(db, workspace_id=workspace_id)
    return {'message': "Delete successfully"}
