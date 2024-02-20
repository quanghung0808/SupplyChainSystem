from models import models
from sqlalchemy.orm import Session, joinedload
from schemas import schemas
from fastapi import  HTTPException

def save_report(db: Session, report: schemas.ReportCreate, workspace_id: int, user_id: int):
    workspace =  db.query(models.Workspace).filter((models.Workspace.id == workspace_id)).first()
    print(workspace)
    if workspace is None:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot find workspace!"
        ) 
    else:
        db_report = models.Report(  weather=report.weather,
                                    weight=report.weight,
                                    vehicle=report.vehicle,
                                    starting_point=report.starting_point,
                                    destination=report.destination,
                                    note=report.note,
                                    workspace_id=workspace_id,
                                    user_id=user_id,
                                    product_id=report.product_id
                                )
        db.add(db_report)
        db.commit()
        db.refresh(db_report)
        return db_report 

def create_report_detail(db: Session, report_detail):
    # print(report_detail)
    print(report_detail.suitable_route)

    db_report_detail = models.ReportDetail( suitable_route=report_detail.suitable_route,
                                            product_comsumption_region=report_detail.product_comsumption_region,
                                            shipment_result=report_detail.shipment_result,
                                            traffic=report_detail.traffic,
                                            report_id=report_detail.report_id
                                        )
    db.add(db_report_detail)
    db.commit()
    db.refresh(db_report_detail)
    return      

def get_report_by_workspace_id(db: Session, workspace_id: int):
    return db.query(models.Report).filter(models.Report.workspace_id == workspace_id).all()


def get_report_by_user_id(db: Session, user_id: int):
    return db.query(models.Report).filter(models.Report.user_id == user_id).all()

def get_report_detail_by_report_id(db: Session, report_id: int):
    return db.query(models.ReportDetail).filter(models.ReportDetail.report_id == report_id).all()

def get_reports(db: Session):
    return db.query(models.Report).options(joinedload(models.Report.report_detail)).all()

def get_reports_by_report_id(db: Session, report_id: int):
    return db.query(models.Report).filter(models.Report.id == report_id).options(joinedload(models.Report.report_detail)).all()
