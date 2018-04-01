from flask import Flask
from flask import *
from pythonosc.udp_client import SimpleUDPClient
from os import listdir
from os.path import isfile, join
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

def construct_file_name(name):
    return "programs/" + name + ".xml"

@app.route('/save_xml', methods = ['POST'])
def save_xml():
    print("fuck")
    print(request.data)
    print(request.json)
    # jsdata = request.form['code']
    xml = request.json['xml']
    name = request.json['name']
    file_name =construct_file_name(name)
    with open(file_name, "w") as file:
        file.write(xml)

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/get_code', methods = ['GET'])
def get_program():
    name = request.args.get('name')
    code = get_file(name)
    result = json.dumps({'success': True, 'code': code})
    return result, 200, {'ContentType': 'application/json'}

@app.route('/get_programs', methods = ['GET'])
def get_list_programs():
    programs = get_file_names()

    result = json.dumps({'success': True, 'programs': programs})
    return result, 200, {'ContentType': 'application/json'}

def get_file(program_name):
    file_name =construct_file_name(program_name)
    text = None
    with open(file_name, "r") as file:
        text = file.read()
    return text
def get_file_names():
    mypath = "programs/"
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    program_names = [name.replace(".xml", "") for name in onlyfiles]
    return program_names
if __name__ == '__main__':
    app.run()