import paho.mqtt.client as paho
import sys
import random
from schemas import schemas
from paho.mqtt.client import Client
import mock.mock_api as mock
from fastapi import FastAPI
from contextlib import asynccontextmanager
import threading
import json
from types import SimpleNamespace

publisher = paho.Client()
subcriber = paho.Client()
client2 = paho.Client('control1',transport="websockets")
if publisher.connect("localhost", 1883, 60) != 0:
    print("Could not connect to MQTT Broker!")
    sys.exit(-1)

if subcriber.connect("localhost", 1883, 60) != 0:
    print("Could not connect to MQTT Broker!")
    sys.exit(-1)
if client2.connect("localhost", 9001, 60) != 0:
    print("Could not connect to MQTT ws Broker!")
    sys.exit(-1)
def connect_mqtt():
    try:  
        print("Press CTRL+C to exit...")
        subcriber.loop_forever()        
    except KeyboardInterrupt:
        print("Disconnect from broker")

def generate_response(report_id: int):
    mylist = []
    random_number = random.randint(1,3)
    for i in range(random_number):
        result = schemas.ReportBase
        result.suitable_route = random.choice(mock.SUITABLE_ROUTES)
        result.product_comsumption_region = random.choice(mock.PRODUCT_CONSUMPTION_REGIONS)
        result.shipment_result = random.choice(mock.SHIPMENT_RESULT)
        result.traffic = random.choice(mock.TRAFFIC)
        mylist.append({
            'report_id': report_id,
            'suitable_route': result.suitable_route, 
            'product_comsumption_region': result.product_comsumption_region, 
            'shipment_result': result.shipment_result,
            'traffic': result.traffic
        })

    return mylist

def onMessage(client: Client, userdata, msg):
    print(msg.payload.decode())
    msg_from_server = json.loads(msg.payload.decode(), object_hook=lambda d: SimpleNamespace(**d))
    result = generate_response(msg_from_server.report_id)
    client.publish("prediction/end", json.dumps(result))
    client2.publish("prediction/end", json.dumps(result))




subcriber.on_message = onMessage

@asynccontextmanager
async def lifespan(app:FastAPI):
    print("startup")
    threading.Thread(target=connect_mqtt, daemon=True).start() 

    yield
    print("shutdown")
    subcriber.disconnect()
    publisher.disconnect()

app = FastAPI(title="Supply chain System",lifespan=lifespan)

        
subcriber.subscribe("prediction/start")

