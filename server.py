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

    tankIDs = api.getWellTankIds(wellId)

    tankReadings = []

    for i in tankIDs:
        tankReadings.append(api.getTankReadings(i))

    return tankReadings


if __name__ == "__main__":
    app.run(debug=True, port=8080, host="0.0.0.0")
