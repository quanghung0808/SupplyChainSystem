import paho.mqtt.client as paho
import sys
from crud import crud_report
from models import models
from schemas import schemas
from database import engine
import router.authenticate as authenticate
import router.product as product
import router.workspace as workspace
from core.config import settings
from contextlib import asynccontextmanager
from fastapi import FastAPI,HTTPException
from router.deps import (db_dependency, user_dependency)
from typing import  List
import threading
import json
from types import SimpleNamespace
import requests 
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

publisher = paho.Client()
subcriber = paho.Client()

def onMessage(client, userdata, msg):
    try:
        msg_from_ai = json.loads(msg.payload.decode(), object_hook=lambda d: SimpleNamespace(**d))      
        print(msg_from_ai)  
        for item in msg_from_ai:
            data_json = {
                'suitable_route': item.suitable_route,
                'product_comsumption_region': item.product_comsumption_region,
                'shipment_result': item.shipment_result,
                'traffic': item.traffic,
                'report_id': item.report_id
            }
            requests.post(  url="http://127.0.0.1:8000/report_detail",
                            json=data_json, headers={'Content-Type' : 'application/json', 
                                                    'Authorization': 'Bearer ' + settings.SYSTEM_ACCESS_TOKEN}
                            )

            
    except Exception as e:
        print("An error occurred in onMessage:", e)
            

if publisher.connect(settings.HOST, settings.PORT, 60) != 0:
    print("Could not connect to MQTT Broker!")
    sys.exit(-1)    
if subcriber.connect(settings.HOST, settings.PORT, 60) != 0:
    print("Could not connect to MQTT Broker!")
    sys.exit(-1)

subcriber.subscribe("prediction/end")
subcriber.on_message = onMessage

def connect_mqtt():
    try:  
        print("Press CTRL+C to exit...")
        subcriber.loop_forever()
    except:
        print("Disconnect from broker")

@asynccontextmanager
async def lifespan(app:FastAPI):
    print("startup")
    threading.Thread(target=connect_mqtt, daemon=True).start() 
    # await fake.generateData()
    yield
    print("shutdown")
    subcriber.disconnect()
    publisher.disconnect()

app = FastAPI(title="Supply chain AI",lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(authenticate.router)
app.include_router(product.router)
app.include_router(workspace.router)


@app.get("/")
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    return {"User": user}

#Report Route
@app.post('/reports')
def create_report( report: schemas.ReportCreate,  db: db_dependency, user: user_dependency):
    report_db = crud_report.save_report(db=db, report=report, workspace_id=report.workspace_id, user_id=user.get('id'))
    result = {
        'report_id': report_db.id,
        'weather' : report.weather,
        'weight' : report.weight,
        'vehicle' : report.vehicle, 
        'starting_point' : report.starting_point, 
        'destination' : report.destination, 
        'note' : report.note
    }
    publisher.publish("prediction/start", json.dumps(result))
    return report_db

@app.get('/reports/{report_id}',)
def get_report(user: user_dependency, db: db_dependency, report_id: int):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    report = crud_report.get_reports_by_report_id(db, report_id=report_id)
    return report

@app.get('/reports')
def get_report_detail(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    reports = crud_report.get_reports(db)
    return reports


@app.post('/report_detail')
async def create_report_detail(request: Request, db: db_dependency, user: user_dependency):
    data = await request.json()
    report_detail = schemas.ReportDetailCreate(**data)
    return crud_report.create_report_detail(db=db,report_detail=report_detail)
