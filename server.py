from flask import Flask, render_template, request
from webapi import TankLevelAPI
import urllib.parse
import time


#caches tank data to reduce loading time on the client. if the data was cached for more than 2 hours it will update
cache = {}
reading_cache = {}

#updates the data every 2 hours (7200 seconds)
UPDATE_SECONDS = 7200

api = TankLevelAPI(15)


app = Flask(__name__, template_folder="./dist/templates", static_folder="./dist/static")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getWells")
def getWells():
    return api.listWells()




def getReadings(wellTanks):
    res = []
    for i in wellTanks["data"]:
        entry = {}
        entry["Type"] = i["type"]
        entry["Multiplier"] = i["multiplier"]
        entry["Capacity"] = i["capacity"]
        entry["Name"] = i["name"]
        entry["Updated"] = i["updated_at"]
        entry["Id"] = i["id"]
        entry["LatestReading"] = api.getLatestReading(i["id"])
        res.append(entry)
        
    return res


@app.route("/getWellTankReadings")
def getWellTankReadings():

    wellName = urllib.parse.unquote(request.args.get("wellName"))

    wellId = api.getWellID(wellName)

    if not (wellId in cache):
        cache[wellId] = {"TimeStamp":time.time(), "Data":api.getWellTankData(wellId)}
    else:
        #if data was cached for longer than 2 hours (7200 seconds) get new data from iwell api
        if time.time()-cache[wellId]["TimeStamp"]>UPDATE_SECONDS:
            cache[wellId] = {"TimeStamp":time.time(), "Data":api.getWellTankData(wellId)}

    if not (wellId in reading_cache):
        reading_cache[wellId] = {"TimeStamp":time.time(), "Data":getReadings(cache[wellId]["Data"])}
    else:
        if time.time()-reading_cache[wellId]["TimeStamp"]>UPDATE_SECONDS:
            reading_cache[wellId] = {"TimeStamp":time.time(), "Data":getReadings(cache[wellId]["Data"])}


    return reading_cache[wellId]["Data"]


if __name__ == "__main__":
    app.run(debug=True, port=8080, host="0.0.0.0")