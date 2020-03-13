"""
Main app module. Dealing with all the different app routes (receiving XML HttpRequests from index.html)
"""

import os
from time import sleep
from flask import *
from os import listdir
from os.path import isfile, join
from pythonosc.udp_client import SimpleUDPClient
import serial.tools.list_ports

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.basename('uploads')
app.config['PROGRAMS_FOLDER'] = os.path.basename('programs')
app.config.update(TEMPLATES_AUTO_RELOAD=True)
app.debug = True


@app.route("/")
def hello():
    return render_template("index.html")


@app.route('/run_code', methods=['POST'])
def run_code():
    """
    receives python code Strings and sends them as message to the UDPClient.
    :return: JSON Indicating success (200)
    """
    code = request.json['code']

    # for debugging purpose
    print(request.data)
    print(request.json)
    print(code)

    ADDRESS = "/Instructions"
    c = SimpleUDPClient('127.0.0.1', 5001)

    # Can only pass up to 9000 characters.
    c.send_message(ADDRESS, code)
    c.send_message(ADDRESS, "xxx")

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/upload', methods=['POST'])
def upload_file():
    """
    receives an image file, save it on UPLOAD_FOLDER.
    converting to .coords file including coordinates of the png.
    :return: render index.html template
    """
    file = request.files['image']
    f = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(f)
    os.system(os.path.join(app.config['UPLOAD_FOLDER'], 'convert.bat') + ' ' + file.filename)
    os.system('python coordsplotter.py ' + file.filename)
    return render_template('index.html')


@app.route('/save_xml', methods=['POST'])
def save_xml():
    """
    receives an xml text representing a blockly program,
    create an xml file and save it on PROGRAMS_FOLDER.
    :return: JSON Indicating success (200)
    """
    # for debugging purpose
    print(request.data)
    print(request.json)

    xml = request.json['xml']
    name = request.json['name']
    file_name = construct_program_name(name)
    print(file_name + "(^()*&")
    with open(file_name, "w") as file:
        file.write(xml)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/delete_image', methods=['POST'])
def delete_image():
    """
    receives an image name to delete, delete the relevant files:
    png, coords and html (layout template).
    :return: JSON Indicating success (200)
    """
    name = request.json['name']
    print(os.path.join(app.config['UPLOAD_FOLDER'], 'coords', name + '.coords'))
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], name))  # removes the png file
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], 'coords', name + '.coords'))  # removes the coords file
    os.remove("templates/" + name + ".html")  # removes the html template file
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/delete_xml', methods=['POST'])
def delete_xml():
    """
    receives a program name to delete, delete the relevant xml file.
    :return: JSON Indicating success (200)
    """
    name = request.json['name']
    file_name = construct_program_name(name)
    os.remove(file_name)  # removes the xml file
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/is_arm_connected', methods=['GET'])
def is_arm_connected():
    """
    check if the swift arm is connecting
    :return: 1 if the arm is connecting properly or 0 if there's an error
    """
    ans = 0
    ports = list(serial.tools.list_ports.comports())
    for p in ports:
        if "Arduino Mega 2560" in str(p):
            ans = 1
    result = json.dumps({'connected': ans})
    return result, 200, {'ContentType': 'application/json'}


@app.route('/get_position', methods=['GET'])
def get_position():
    """
    Get the current arm position from the live_position JSON file
    :return: JSON including:
        success: Indicating success status
        position: the position in JSON format
    """
    with open("live_position.json") as position:
        position = json.load(position)
    position = json.dumps({'success': True, 'position': position})
    return position, 200, {'ContentType': 'application/json'}


@app.route('/get_programs', methods=['GET'])
def get_list_programs():
    """
    Get a list with all the program names (for the saved programs tab on index.html)
    :return: JSON Indicating success (200)
    """
    programs = get_programs_names()
    result = json.dumps({'success': True, 'programs': programs})
    return result, 200, {'ContentType': 'application/json'}


@app.route('/get_images', methods=['GET'])
def get_list_images():
    """
    Get a list with all the images names (for the uploaded images tab on index.html)
    :return: JSON Indicating success (200)
    """
    images = get_images_names()
    result = json.dumps({'success': True, 'images': images})
    return result, 200, {'ContentType': 'application/json'}


@app.route('/stop_getting_position', methods=['POST'])
def stop_getting_position():
    """
    change live_position.json file so it will stop updating the arm position (make getting_position false)
    :return: JSON Indicating success (200)
    """
    with open("live_position.json", "r") as jsonFile:
        data = json.load(jsonFile)
    data["getting_position"] = "False"
    with open("live_position.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/get_code', methods=['GET'])
def get_program():
    """
    Gets a program name and returns it's xml content
    :return: JSON including:
        success: Indicating success status
        code: the xml text to add to blockly
    """
    name = request.args.get('name')
    code = get_file(name)
    result = json.dumps({'success': True, 'code': code})
    return result, 200, {'ContentType': 'application/json'}


def get_file(program_name):
    """
    Gets a program name and returns it's xml content
    :return: the xml content
    """
    file_name = construct_program_name(program_name)
    with open(file_name, "r") as file:
        text = file.read()
    return text


@app.route('/<string:page_name>/')
def hey(page_name):
    """
    basic navigation function between templates
    :return: render the relevant template
    """
    return render_template(page_name)


def get_programs_names():
    """
    :return: a list with all the program names on PROGRAMS_FOLDER
    """
    path = os.path.join(app.config['PROGRAMS_FOLDER'], "")
    only_files = [f for f in listdir(path) if isfile(join(path, f))]
    program_names = [name.replace(".xml", "") for name in only_files]
    return program_names


def get_images_names():
    """
    :return: a list with all the images names on UPLOAD_FOLDER
    """
    path = os.path.join(app.config['UPLOAD_FOLDER'], "")
    return [f for f in listdir(path) if f.endswith(".png")]


def construct_program_name(name):
    return os.path.join(app.config['PROGRAMS_FOLDER'], name + ".xml")


def construct_image_name(name):
    return os.path.join(app.config['UPLOAD_FOLDER'], name + ".png")


if __name__ == '__main__':
    app.run()
