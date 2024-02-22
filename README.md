# Supply Chain AI
## Technology
Frontend: React Typescript

Backend: Python (FastAPI)

SystemAI: Python (FastAPI)

Database: SQLite (SQLAlchemy) 
# Installation

### Step 1: Install [Python](https://www.python.org/downloads/windows/) 

### Step 2: Install [PIP](https://phoenixnap.com/kb/install-pip-windows)

#### Make the python and pip global
- Search for "Edit the system environments variables" and open System Properties
- Click "Environment variables"
- Double click "Path"
- Add new variable : C:\\Users\\{name}\\AppData\\Local\\Programs\\Python\\Python312\\Scripts
- Add new variable : C:\\Users\\{name}\\AppData\\Local\\Programs\\Python\\Python312
- Save

### Step 3: Install [Mosquitto MQTT Broker](https://cedalo.com/blog/how-to-install-mosquitto-mqtt-broker-on-windows/)

#### Configure mosquitto: 
- Go to mosquitto folder in `C:\Program Files\mosquitto`
- Open `mosquitto.conf`
- Find #listener and add below:
```
listener 1883
listener 9001
protocol websockets
socket_domain ipv4
allow_anonymous true
```
### Step 4: Install FastAPI
- Open CMD
- Run the command
```
pip install fastapi "uvicorn[standard]"
```
# Getting started
Clone the repository:
```
git clone https://github.com/quanghung0808/SupplyChainAI.git
```
## Note
- Folder `supply-chain-ai-fe` is for client side frontend
- Folder `supply-chain-ai-be` is for server side backend
- Folder `supply-chain-ai-system` is for AI system

## Installation

## How to run Backend, SystemAI server

### Step 1: Using virtual environment venv
- Go to Backend, SystemAI folder, open Command Prompt and run below command
```
python -m venv env
```
```
cd env/Scripts
```
- Run
```
activate
```
- Out
```
cd ../../
```
### Step 2: Install packages
```
pip install paho-mqtt==1.6.1 json requests sqlalchemy faker
```
### Step 3: How to run project
```
uvicorn main:app --reload
```
## How to run Frontend Client

### Step 1: Go to Frontend Folder
### Step 2: Open terminal, run below command:
```
npm install
```
### Step 3: Run the project
```
npm start
```

# Documentation

## How the system works
![SupplyChaion drawio (4)](https://github.com/quanghung0808/SupplyChainSystem/assets/105264684/3fb43d99-c708-4610-9bc1-ee47c6139585)

## Contact
Duong Quang Hung - duongquanghung0122@gmail.com
