
/**
 * change the preview image on cellular automaton modal, according to the rule that the user chose.
 */
function changePreviewImageOnModal() {
    let previewImage = document.getElementById("previewImage");
    let ruleNumber = document.getElementById("ruleNumber").value;
    if (isNaN(parseInt(ruleNumber)) || parseInt(ruleNumber) < 0 || parseInt(ruleNumber) > 255)
        alert("The rule number is not valid (0-255)")
    else
        previewImage.src = "static/png/rule" + ruleNumber + ".png";
}

/**
 * add xml text representing blocks to the workspace (as blocks)
 * @param   {string}    xmlText    string representing a xml to be added to the workspace
 * @param   {boolean}   clear      true for clearing the workspace, false for appending to the workspace
 */
function loadXml(xmlText, clear) {
    if (clear)
        demoWorkspace.clear();
    let xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, demoWorkspace);
}


/**
 * gets a program name and requests the xml text from the server
 * @param   {string}    programName     name of the saved program
 */
function getProgram(programName) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_code?name=' + programName);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
        else {
            let response = JSON.parse(xhr.response);
            loadXml(response.code, true)
        }
    };
    xhr.send(null);
}


/**
 * adds programName to the programs list.
 * including Load and trash buttons
 * @param   {string}    programName     name of the saved program
 */
function addProgramToList(programName) {
    let ul = document.getElementById("listOfPrograms");
    let li = document.createElement("li");
    ul.className = "mdl-list";
    li.className = "mdl-list__item";
    li.appendChild(document.createTextNode(programName));
    let buttonsDiv = document.createElement("div");
    // buttonsDiv.style = "margin-left: 10px";
    // buttonsDiv.className = "btn-group";
    let loadButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    buttonsDiv.appendChild(loadButton);
    buttonsDiv.appendChild(deleteButton);
    loadButton.type = "button";
    // loadButton.className= "btn btn-secondary";
    loadButton.innerHTML = "Load";
    // loadButton.style = "font-size:13px;"
    loadButton.onclick = function () {
        getProgram(programName);
        alert(programName + " was loaded successfully.")
    };
    deleteButton.type = "buttom";
    // deleteButton.className= "btn btn-secondary";
    deleteButton.innerHTML = "<i class=\"fa fa-trash\"></i>"
    // deleteButton.style = "font-size:13px;"   
    deleteButton.onclick = function () {
        deleteProgram(programName)
        li.parentNode.removeChild(li);
    };
    let varSpace = document.createTextNode("    ->    ");
    li.appendChild(varSpace);
    li.appendChild(loadButton);
    li.appendChild(deleteButton);
    // li.appendChild(buttonsDiv);
    ul.appendChild(li);
}


/**
 * adds imageName to the images list.
 * including Show Layout and trash buttons
 * @param   {string}    imageName     name of the uploaded image
 */
function addImageToList(imageName) {
    let ul = document.getElementById("listOfImages");
    let li = document.createElement("li");
    ul.className = "mdl-list";
    li.className = "mdl-list__item";

    li.appendChild(document.createTextNode(imageName + ".png"));
    let layoutButton = document.createElement("BUTTON");
    let deleteButton = document.createElement("BUTTON");
    layoutButton.textContent = "Show Layout";
    layoutButton.onclick = function () {
        window.open("./" + imageName + ".png.html")
    };
    deleteButton.textContent = "Delete";
    deleteButton.innerHTML = "<i class=\"fa fa-trash\"></i>"
    deleteButton.onclick = function () {
        deleteImage(imageName)
        li.parentNode.removeChild(li);
    };
    let varSpace = document.createTextNode("    ->    ");

    li.appendChild(varSpace);
    li.appendChild(layoutButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
}


/**
 * adds patternName to the cellular automaton patterns list.
 * including Show Layout and trash buttons
 * @param   {string}    imageName     name of the uploaded image
 */
function addCellularAutomatonPatternToList(patternName) {
    let ul = document.getElementById("listOfCellularAutomatonPatterns");
    let li = document.createElement("li");
    ul.className = "mdl-list";
    li.className = "mdl-list__item";

    li.appendChild(document.createTextNode(patternName + ".ca"));
    let layoutButton = document.createElement("BUTTON");
    let deleteButton = document.createElement("BUTTON");
    layoutButton.textContent = "Show Layout";
    layoutButton.onclick = function () {
        window.open("./" + patternName + ".ca.html")
    };
    deleteButton.textContent = "Delete";
    deleteButton.innerHTML = "<i class=\"fa fa-trash\"></i>"
    deleteButton.onclick = function () {
        deleteCellularAutomatonPattern(patternName)
        li.parentNode.removeChild(li);
    };
    let varSpace = document.createTextNode("    ->    ");

    li.appendChild(varSpace);
    li.appendChild(layoutButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
}


/**
 * delete a saved program from the list.
 * @param   {string}    programName     name of the saved program
 */
function deleteProgram(programName) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete_xml');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(JSON.stringify({ name: programName }));
}


/**
 * delete an uploaded image from the list.
 * @param   {string}    programName     name of the uploaded image
 */
function deleteImage(imageName) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete_image');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(JSON.stringify({ name: imageName }));
}


/**
 * delete a cellular automaton pattern from the list.
 * @param   {string}    patternName     name of the uploaded image
 */
function deleteCellularAutomatonPattern(patternName) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete_cellular_automaton_pattern');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(JSON.stringify({ name: patternName }));
}

/** cleans the workspace from blocks */
function cleanWorkspace() {
    demoWorkspace.clear();
}

/** cleans the saved programs list */
function cleanProgramList() {
    let ul = document.getElementById("listOfPrograms");
    ul.innerHTML = "";
}


/** cleans the uploaded images list */
function cleanImageList() {
    let ul = document.getElementById("listOfImages");
    ul.innerHTML = "";
}

/** cleans the cellular automaton patterns list */
function cleanImageList() {
    let ul = document.getElementById("listOfCellularAutomatonPatterns");
    ul.innerHTML = "";
}


/** requests a list of the saved programs from server and add their names to the programs list. */
function getPrograms() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_programs');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
        else {
            cleanProgramList();
            let response = JSON.parse(xhr.response);
            for (let program in response.programs) {
                addProgramToList(response.programs[program]);
            }
        }
    };
    //      xhr.send(encodeURI('name=' + newName));#}
    xhr.send();
}


/** requests a list of the uploaded images from server and add their names to the uploaded images list. */
function getImages() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_images');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
        else {
            cleanImageList();
            let response = JSON.parse(xhr.response);
            for (let image in response.images) {
                addImageToList(response.images[image]);
            }
        }
    };
    xhr.send();
}


/** requests a list of the generated cellular automaton patterns from server and add their names to the cellular automaton patterns list. */
function getCellularAutomatonPatterns() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_cellular_automaton_patterns');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
        else {
            cleanImageList();
            let response = JSON.parse(xhr.response);
            for (let pattern in response.patterns) {
                addCellularAutomatonPatternToList(response.patterns[pattern]);
            }
        }
    };
    xhr.send();
}


/** Generate JavaScript code and display it. */
function showCode() {

    Blockly.Python.INFINITE_LOOP_TRAP = null;
    let code = Blockly.Python.workspaceToCode(demoWorkspace);
    alert(code);
}


/** Generate JavaScript code and executes it. */
function runCode() {
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    let code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}


/** 
 *  generates and run python code which puts the arm's motors on disjoint mode, allowing the user to physically maneuverit to differnet locations.
 *  will exit the mode (rejoin arm's motors) while the user is changing getting_position key in the live_position 
 *  JSON file (by clicking 'Stop').
 */
function savePosition() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/is_arm_connected');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
        else {
            let response = JSON.parse(xhr.response);
            if (response.connected == "0")  // uarm is not connected
            {
                alert("UArm is not connected properly");
                return;
            }

            // manage buttons disabling
            document.getElementById("Add").disabled = false;
            document.getElementById("Stop").disabled = false;
            document.getElementById("SavePosition").disabled = true;
            // document.getElementById("RunJavaScript").disabled = true;
            document.getElementById("Play").disabled = true;
            document.getElementById("Abort").disabled = true;

            // generate code which disjoints the arm and save it's current location to a JSON file.
            let code = "\nfrom uf.wrapper.swift_api import SwiftAPI\n" +
                "from uf.utils.log import *\n" +
                "from time import *\n" +
                "getting_position = \"True\"  # will be \"True\" while the user is capturing positions\n" +
                "logger_init(logging.DEBUG)\n" +
                "swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}\n" +
                "sleep(2)\n" +
                // save the current location to live_position.JSON
                "def report_position(position):\n" +
                "    global getting_position\n" +
                "    file = open(\"live_position.json\", \"r\")\n" +
                "    data = file.readline()\n" +
                "    getting_position = data[22:26]\n" +
                "    if getting_position != \"True\":  # the user pressed the STOP button on index.html\n" +
                "        return\n" +
                "    file.close()\n" +
                "    file = open(\"live_position.json\", \"w\")\n" +
                "    json_text = \"\\\"getting_position\\\": \\\"{getting_position}\\\", \\\"x\\\": \\\"{x}\\\", \\\"y\\\": \\\"{y}\\\", \\\"z\\\": \\\"{z}\\\"\"\n" +
                "    json_text = json_text.format(x=position[0], y=position[1], z=position[2], getting_position=getting_position)\n" +
                "    json_text = \"{\" + json_text + \"}\"\n" +
                "    file.write(json_text)\n" +
                "    file.close()\n" +
                // initialize the JSON file to default values
                "file = open(\"live_position.json\", \"w\")\n" +
                "json_text = \"{\\\"getting_position\\\": \\\"True\\\", \\\"x\\\": \\\"0\\\", \\\"y\\\": \\\"0\\\", \\\"z\\\": \\\"0\\\"}\"\n" +
                "file.write(json_text)\n" +
                "file.close()\n" +
                "sleep(2)\n" +
                // disjoin motors and write the position to the JSON file
                "swift.send_cmd_sync(\"M2019\")\n" +
                "swift.register_report_position_callback(report_position)\n" +
                "swift.set_report_position(1)\n" +
                "while getting_position == \"True\":\n" +
                "    pass\n" +
                // rejoin motors
                "swift.send_cmd_sync(\"M302 S0\")\n" +
                "sleep(1)\n" +
                "swift.close_conn()\n";
            sendCode(code);
        }
    }
    xhr.send();
}


/** 
 *  while in disjoint mode, request current X,Y,Z coordinates representing the position of the arm.
 *  create a new block with those coordinates and add it to the workspace
 */
function addPositionBlock() {
    // request position from server
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_position');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        } else {
            let position = JSON.parse(xhr.response).position;
            console.log(position);
            // create the new block with string representing the xml and add it to workspace
            let positionBlockXML = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="robot_position_location_only" id=":[.^%w}.^urrSE28/$54" x="274" y="57"><field name="X">' + position.x + '</field><field name="Y">' + position.y + '</field><field name="Z">' + position.z + '</field></block></xml>'
            loadXml(positionBlockXML, false);
        }

    };
    xhr.send(null);
}


/** 
 *  changing getting_position key in the live_position JSON file to exit disjoint mode (rejoin arm's motors).
 */
function stopSavePosition() {
    // manage buttons disabling
    document.getElementById("Add").disabled = true;
    document.getElementById("Stop").disabled = true;
    document.getElementById("SavePosition").disabled = false;
    // document.getElementById("RunJavaScript").disabled = false;
    document.getElementById("Play").disabled = false;
    document.getElementById("Abort").disabled = false;

    // send to server
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'stop_getting_position');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(null);

}


/**
 * The begining of every python code we want to run with the arm, including:
 * imports, loading swift API, 
 */
function getInitCode() {
    let code = '\n';
    code += 'import sys\n';
    code += "sys.path.append('pyuf/')\n";
    code += 'from uf.wrapper.swift_api import SwiftAPI\n';
    code += 'from uf.utils.log import *\n';
    code += 'from time import sleep\n';
    code += 'logger_init(logging.DEBUG)\n';
    code += 'global swift\n';
    code += "swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}\n";
    code += "sleep(2)\n";
    code += 'print("Allowing extrusion")\n';
    // Set the minimum extrusion "temperature" to 0 (so we can use 3d printing features for liquid extrusion)
    code += 'swift.send_cmd_sync("M302 S0")\n';
    // make some first movement (solving some bugs)
    code += 'swift.send_cmd_sync("G2204 X0.5")\n';
    return code;
}


/**
 * The ending of every python code we want to run with the arm, including:
 * return to starting position and close connection
 */
function getFinalCode() {
    let code = '';
    code += 'swift.set_position(e=0, speed=1500, timeout=30, wait=True)\n';
    code += 'swift.set_position(120, 0, 50, speed=1500, timeout=30, wait=True)\n';
    code += 'sleep(1)\n';
    code += 'swift.close_conn()\n';
    return code;
}


/**       
 * create python code from workspace, add init and final code and send to the server.
 */
function runWorkspaceCode() {
    let code = Blockly.Python.workspaceToCode(demoWorkspace);
    code = getInitCode() + code + getFinalCode();
    sendCode(code);
}

/**       
 * send abort command to the server (kill a running program on the arm)
 */
function abort() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'abort');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
    // document.getElementById("Play").disabled = true;
    // document.getElementById("Abort").disabled = false;
}


/**       
 * first checks if the uarm is connected properly to some port. 
 * then, send the code to the server.
 * @param   {string}    code     python code (operating the arm) to send to the server
 */
async function sendCode(code) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/is_arm_connected');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
        else {
            let response = JSON.parse(xhr.response);
            if (response.connected == "0")  // uarm is not connected
            {
                alert("UArm is not connected properly");
                return;
            }

            xhr.open('POST', 'run_code');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status !== 200) {
                    alert('Request failed.  Returned status of ' + xhr.status);
                }
            };
            xhr.send(JSON.stringify({ code: code }));
            // document.getElementById("Play").disabled = true;
            // document.getElementById("Abort").disabled = false;
        }
    };
    xhr.send();
}


/**
 * Create a string representing the xml of the current workspace.
 * Than send the string to the server in order to save as xml file
 */
function saveWorkspace() {
    let xml = Blockly.Xml.workspaceToDom(demoWorkspace);
    let xmlText = Blockly.Xml.domToText(xml);
    let programName = document.getElementById("programName").value;
    alert("Your program was saved successfully\n\n" + xmlText);
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'save_xml');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
        else {
            document.getElementById("programName").value = "";
            addProgramToList(programName);
        }
    };
    //      xhr.send(encodeURI('name=' + newName));#}
    xhr.send(JSON.stringify({ xml: xmlText, name: programName }));

}
