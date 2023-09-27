from flask import Flask, send_from_directory, render_template
from webapi import TankLevelAPI
import json

app = Flask(__name__)


api = TankLevelAPI(30)

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getWells")
def getWells():
    return json.dumps(api.listWells())


if __name__ == '__main__':
    app.run(debug=True, port=8080, host="0.0.0.0")


