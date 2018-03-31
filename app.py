from flask import Flask
from flask import *
from pythonosc.udp_client import SimpleUDPClient

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("index.html")

@app.route('/run_code', methods = ['POST'])
def run_code():
    print("fuck")
    print(request.data)
    print(request.json)
    # jsdata = request.form['code']
    code = request.json['code']
    print(code)

    ADDRESS = "/Instructions"
    c = SimpleUDPClient('127.0.0.1', 5001)

    # Can only pass up to 9000 characters.
    c.send_message(ADDRESS, code)
    c.send_message(ADDRESS, "xxx")

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}