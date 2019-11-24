# OpenLH: Open Liquid-Handling System
The OpenLH is a Liquid handling system based on an available robotic arm platform (uARM swift Pro) which allows for creative exploration by biologists and bio-enthusiasts.
 
You can find full and detailed step-by-step guide for building one on our [Instructables page](https://www.instructables.com/id/OpenLH/), including BOM, STL models and precise instructions.
Find more about including publicationds on the project's [website](http://milab.idc.ac.il/teaching/projects/openlh/). 
Share with us if you're building one!

## Getting Started

Before you continue reading, make sure you have:

Python 3.7 and PyCharm IDE.
Then, clone this repository by:

```sh
git clone https://github.com/idc-milab/openlh
```

### Setting up Python Environment
Open the folder you cloned as a project, through PyCharm.  
First, we will create virtual environment for this project (For more information https://www.jetbrains.com/help/pycharm-edu/creating-virtual-environment.html):
1. Enter File → Settings → Project: <project name> → Project Interpreter.
2. Click the :gear: icon and choose Add
3. In Add Python Interpreter window, select Virtualenv Environment:
   * Specify the location of the new virtual environment in the text field, or click  Virtual environment location and find location in     your file system. Note that the directory where the new virtual environment should be located, must be empty!
   * Choose the base interpreter from the drop-down list, or click Choose the base interpreter and find the base interpreter in the your file system.
   * Select the Make available to all projects check-box, if needed.
 4. Click Ok  
 
### Install packages
This project uses several libraries within it:

* **flask:** Flask is a web framework for Python based on the Werkzeug toolkit.
* **bokeh:** Interactive Data Visualization in the browser, from Python.
* **psycopg2:** PostgreSQL database adapter for the Python programming language
* **pyserial:** Python serial port access library
* **python-osc:** Open Sound Control server and client in pure python 


After setting up the virtual environment, use pip to install the required packages through the ``Terminal`` in the bottom left:  
  ```sh
  pip install -r requirements.txt
  ```

### Running for the first time
After setting it all up, run both ``app.py`` and ``listener.py`` modules.
Than, in your web browser enter: http://127.0.0.1:5000/.
Now you can easily create programs for the arm via the blockly interface and run them with the OpenLH!
 
## Project Structure
The uArm runs on top of an Arduino Mega 2560 with a custom version of Marlin firmware (available under GPL licence). The
robot operates using G-code definitions sent through UART protocol.

* ``app.py``
	* Main app module. Dealing with all the different app routes (receiving XML HttpRequests from index.html)
* ``listener.py``
	* This is the listener of the project. registered to receive messages which was sent from the app.py through SimpleUDPClient.
    * The message will include strings with python code including instructions for the arm - using SwiftAPI and generated on the Blockly environment.
    * messages will always end with "xxx" string, indicating that the whole message successfully transferred.
* ``coordsplotter.py``
	* This script receives a .coords file name as a parameter (a list of coordinates representing an image. created by
	uploads/convert.bat) and generates an html page including a visual representation of the image. the html page
	will be saved on the templates folder.
* ``/google-blockly``
	* This handles the blockly infrastructure
* ```/programs```
	* directory for xml files representing blockly programs that the user have chosen to save for later use.
* ```/pyuf```
	* modified version of the uArm-Python-SDK (version 1.0) 
* ```/templates```
    * ``index.html`` - main software page
    * different templates of visual representations for images (before printing)
* ```/uploads```
	* .png files uploaded.
	* .coords files represneting the image coordinates.
