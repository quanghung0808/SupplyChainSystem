from pydantic import BaseModel

class ReportBase(BaseModel):
    suitable_route : str
    product_comsumption_region : str
    shipment_result : str 
    traffic: str
