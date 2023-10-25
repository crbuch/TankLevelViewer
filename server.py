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
    if not request.is_secure:
        print("Request not secure")
    return render_template("index.html")


@app.route("/getWells")
def getWells():
    return api.listWells()



def getResponse(tankData):
    res = []
    for i in tankData["data"]:
        res.append({})
        res[-1]["Type"] = i["type"]
        res[-1]["Multiplier"] = i["multiplier"]
        res[-1]["Capacity"] = i["capacity"]
        res[-1]["Name"] = i["name"]
        res[-1]["Updated"] = i["updated_at"]
        res[-1]["Id"] = i["id"]
        readings = api.getTankReadings(i["id"])["data"]
        readings.sort(key=lambda x: x["reading_time"])
        readings[-1] = {
            "Id":readings[-1]["id"],
            "reading_time":readings[-1]["reading_time"],
            "top_feet":readings[-1]["top_feet"],
            "top_inches":readings[-1]["top_inches"],
            "updated_at":readings[-1]["updated_at"],
        }
        res[-1]["LatestReading"] = readings[-1]
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


    tankData = cache[wellId]["Data"]

    if not (wellId in reading_cache):
        reading_cache[wellId] = {"TimeStamp":time.time(), "Data":getResponse(tankData)}
    else:
        if time.time()-reading_cache[wellId]["TimeStamp"]>UPDATE_SECONDS:
            reading_cache[wellId] = {"TimeStamp":time.time(), "Data":getResponse(tankData)}


    return reading_cache[wellId]["Data"]


if __name__ == "__main__":
    app.run(debug=True, port=8080, host="0.0.0.0", ssl_context=('./SSL/cmlorg.crt', './SSL/cmlorg.key'))
