from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Double
from sqlalchemy.orm import relationship

from database import Base


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    workspace = relationship('Workspace', back_populates = 'product')
    report = relationship('Report', back_populates="product")


class Report(Base):
    __tablename__ = 'reports'

    id = Column(Integer, primary_key=True, index=True)
    weather = Column(String, index=True)   
    weight = Column(Double, index=True)
    vehicle = Column(String, index=True)
    starting_point = Column(String, index=True)
    destination = Column(String, index=True)
    note = Column(String, index=True)
    workspace_id = Column(Integer, ForeignKey('workspaces.id'))
    product_id = Column(Integer, ForeignKey('products.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    workspace = relationship('Workspace', back_populates='report')
    user = relationship('User', back_populates='report')
    product = relationship('Product', back_populates='report')
    report_detail = relationship('ReportDetail', back_populates = 'report')

class ReportDetail(Base):
    __tablename__ = 'report_details'

    id = Column(Integer, primary_key=True, index=True)
    suitable_route = Column(String, index=True)
    traffic = Column(String, index=True)   
    product_comsumption_region = Column(String, index=True)
    shipment_result = Column(String, index=True)
    report_id = Column(Integer, ForeignKey('reports.id'))
    report = relationship('Report', back_populates = 'report_detail')

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(256), unique=True, index=True)
    hashed_password = Column(String)
    is_superuser = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    report = relationship('Report', back_populates="user")

class Workspace(Base):
    __tablename__ = 'workspaces'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), index=True)
    product_id = Column(Integer, ForeignKey('products.id'))
    product = relationship('Product', back_populates='workspace')
    report = relationship('Report', back_populates="workspace")