from flask import Flask, send_from_directory, render_template



app = Flask(__name__)

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)


@app.route("/")
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True, port=8080, host="0.0.0.0")


