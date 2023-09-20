import requests
from datetime import datetime, timedelta
import os 
from dotenv import load_dotenv
import random

class TankLevelAPI:
    def __init__(self, daysSince):
        self.IWELL_AUTH_TOKEN = self.getIWellAccessToken()
        self.unix_timestamp = str(int((datetime.now()-timedelta(days=daysSince)).timestamp()))
        self.All_Wells = {}
        wellData = requests.get(f"https://api.iwell.info/v1/wells?since={self.unix_timestamp}", headers={"Authorization": f"Bearer {self.IWELL_AUTH_TOKEN}"}).json()["data"]
        for i in wellData:
            self.All_Wells[i["name"]] = i["id"]


    def getIWellAccessToken(self):
        load_dotenv()
        client_id = os.getenv('client_id')
        client_secret = os.getenv('client_secret')
        username = os.getenv('email')
        password = os.getenv('password')
        body = {
            "grant_type": "password",
            "client_id": client_id,
            "client_secret": client_secret,
            "username": username,
            "password": password
        }
        return(requests.post('https://api.iwell.info/v1/oauth2/access-token', headers={"content-type":"application/json"}, json = body).json()['access_token'])


    def listWells(self):
        return list(self.All_Wells.keys())
    
    def getWellID(self, wellName):
        return self.All_Wells[wellName]
    
    def getWellTanks(self, wellId):
        res = requests.get(f"https://api.iwell.info/v1/wells/{wellId}/tanks?since={self.unix_timestamp}", headers={"Authorization": f"Bearer {self.IWELL_AUTH_TOKEN}"})
        return res.json()




api = TankLevelAPI(30)

wellNames = api.listWells()

testID = api.getWellID(random.choice(wellNames))
tanks = api.getWellTanks(testID)
print(tanks)