from flask import Flask, render_template
from webapi import TankLevelAPI
import json

api = TankLevelAPI(30)



app = Flask(__name__, template_folder="./dist/templates", static_folder="./dist/static")




# @app.route('/static/<path:path>')
# def serve_static(path):
#     return send_from_directory('static', path)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getWells")
def getWells():
    return json.dumps(api.listWells())


if __name__ == '__main__':
    app.run(debug=True, port=8080, host="0.0.0.0")


