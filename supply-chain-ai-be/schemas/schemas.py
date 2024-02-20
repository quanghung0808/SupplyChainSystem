from pydantic import BaseModel
from typing import Optional, List

class ProductBase(BaseModel):
    name: str
    category: str

class ProductCreate(ProductBase):
    name: str

class ProductDelete(ProductBase):
    id: int

class ProductUpdate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    username: str
    password: str

class UserBase(BaseModel):
    username: str
    is_superuser: bool = False


class UserCreate(UserBase):
    username: str
    password: str


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class WorkspaceBase(BaseModel):
    name: str

class WorkspaceCreate(WorkspaceBase):
    name:str
    product_id: int


class Workspace(WorkspaceBase):
    id: int
    product_id: int

    class Config:
        orm_mode = True


class ReportBase(BaseModel):
    weather : str  
    weight : float
    vehicle : str 
    starting_point : str 
    destination : str 
    note : str


class ReportCreate(ReportBase):
    workspace_id: int
    product_id: int

class Report(ReportBase):
    id: int
    workspace_id: int
    user_id: int
    product_id: int

    class Config:
        orm_mode = True

class CreateUserRequest(BaseModel):
    username: str
    password: str

class ResponseLogin(BaseModel):
    access_token: str
    user: User
#
    

class ReportDetailBase(BaseModel):
    suitable_route : str
    product_comsumption_region : str 
    shipment_result : str
    traffic : str 

        
class ReportDetailCreate(ReportDetailBase):
    report_id: int

class ReportDetail(ReportDetailBase):
    id: int
    report_id: int
  
    class Config:
        orm_mode = True

    