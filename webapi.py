import requests
from datetime import datetime, timedelta
import os 
from dotenv import load_dotenv
import random
import asyncio
from typing import Callable

class TankLevelAPI:
    def __init__(self, daysSince):
        self.IWELL_AUTH_TOKEN = self.getIWellAccessToken()
        self.unix_timestamp = str(int((datetime.now()-timedelta(days=daysSince)).timestamp()))
        self.All_Wells = {}
        wellData = requests.get(f"https://api.iwell.info/v1/wells?since={self.unix_timestamp}", headers={"Authorization": f"Bearer {self.IWELL_AUTH_TOKEN}"}).json()["data"]
        for i in wellData:
            self.All_Wells[i["name"]] = i["id"]


    def getIWellAccessToken(self):
        if not os.path.exists("./.env"):
            raise FileNotFoundError(".env file not found")
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


    def listWells(self) -> list:
        return list(self.All_Wells.keys())
    
    def getWellID(self, wellName:str)->str:
        return self.All_Wells[wellName]
    
    def getWellTankData(self, wellId:str)->list:
        res = requests.get(f"https://api.iwell.info/v1/wells/{wellId}/tanks?since={self.unix_timestamp}", headers={"Authorization": f"Bearer {self.IWELL_AUTH_TOKEN}"}).json()
        
        return res
    
    def getTankReadingsAsync(self, tankId:str)->asyncio.Task:
        return asyncio.create_task(self.getTankReadings(tankId))


    def getTankReadings(self, tankId:str)->dict:
        readings = requests.get(f"https://api.iwell.info/v1/tanks/{tankId}/readings", headers={"Authorization": f"Bearer {self.IWELL_AUTH_TOKEN}"}).json()["data"]
        readings.sort(key=lambda x: x["reading_time"])
        readings[-1] = {
            "Id":readings[-1]["id"],
            "reading_time":readings[-1]["reading_time"],
            "top_feet":readings[-1]["top_feet"],
            "top_inches":readings[-1]["top_inches"],
            "updated_at":readings[-1]["updated_at"],
        }
        return readings


if __name__ == "__main__":
    api = TankLevelAPI(30)

    wellNames = api.listWells()

    testID = api.getWellID(random.choice(wellNames))
    tanks = api.getWellTanks(testID)
    print(tanks)