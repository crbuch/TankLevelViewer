from flask import Flask, render_template, request
from webapi import TankLevelAPI
import urllib.parse


# getting data for the last 15 days
api = TankLevelAPI(15)


app = Flask(__name__, template_folder="./dist/templates", static_folder="./dist/static")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getWells")
def getWells():
    return api.listWells()


@app.route("/getWellTankReadings")
def getWellTankReadings():
    wellName = urllib.parse.unquote(request.args.get("wellName"))
    wellId = api.getWellID(wellName)

    tankData = api.getWellTankData(wellId)

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
            "previous_top_feet":readings[-1]["previous_top_feet"],
            "previous_top_inches":readings[-1]["previous_top_inches"],
            "reading_time":readings[-1]["reading_time"],
            "top_feet":readings[-1]["top_feet"],
            "top_inches":readings[-1]["top_inches"],
            "updated_at":readings[-1]["updated_at"],
        }

        
        res[-1]["LatestReading"] = readings[-1]

    return res


if __name__ == "__main__":
    app.run(debug=True, port=8080, host="0.0.0.0")
