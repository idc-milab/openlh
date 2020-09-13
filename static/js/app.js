Blockly.defineBlocksWithJsonArray(
    // BEGIN JSON EXTRACT
    [
        //   {
        //   "type": "robot_position",
        //   "message0": "X %1 %2 Y %3 %4 Z %5 %6 E %7",
        //   "args0": [
        //     {
        //       "type": "field_number",
        //       "name": "X",
        //       "value": 0
        //     },
        //     {
        //       "type": "input_dummy"
        //     },
        //     {
        //       "type": "field_number",
        //       "name": "Y",
        //       "value": 0
        //     },
        //     {
        //       "type": "input_dummy"
        //     },
        //     {
        //       "type": "field_number",
        //       "name": "Z",
        //       "value": 0
        //     },
        //     {
        //       "type": "input_dummy"
        //     },
        //     {
        //       "type": "field_number",
        //       "name": "E",
        //       "value": 0
        //     }
        //   ],
        //   "inputsInline": true,
        //   "output": null,
        //   "colour": 260,
        //   "tooltip": "",
        //   "helpUrl": ""
        // },
        {
            "type": "robot_position_new",
            "message0": "X %1 Y %2 Z %3 E %4 S %5",
            "args0": [
                {
                    "type": "field_number",
                    "name": "X",
                    "check": "Number"
                },
                {
                    "type": "field_number",
                    "name": "Y",
                    "check": "Number"
                },
                {
                    "type": "field_number",
                    "name": "Z",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "E",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "S",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "output": "robot_position",
            "colour": 260,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_position",
            "message0": "X %1 Y %2 Z %3 E %4 S %5",
            "args0": [
                {
                    "type": "input_value",
                    "name": "X",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "Y",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "Z",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "E",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "S",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "output": "robot_position",
            "colour": 260,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_position_current",
            "message0": "current location",
            "inputsInline": true,
            "output": "robot_position",
            "colour": 260,
            "tooltip": "Arm's current location",
            "helpUrl": ""
        },
        {
            "type": "robot_position_arithmetic",
            "message0": "%1 + X%2 Y%3 Z%4",
            "args0": [
                {
                    "type": "input_value",
                    "name": "position",
                    "check": "robot_position"
                },
                {
                    "type": "field_number",
                    "name": "X",
                    "check": "Number"
                },
                {
                    "type": "field_number",
                    "name": "Y",
                    "check": "Number"
                },
                {
                    "type": "field_number",
                    "name": "Z",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "output": "robot_position",
            "colour": 260,
            "tooltip": "Adjust coordinate's X Y Z axis (usefull while using variables to store coordinates)",
            "helpUrl": ""
        },
        {
            "type": "robot_position_arithmetic_puzzle",
            "message0": "%1 + X%2 Y%3 Z%4",
            "args0": [
                {
                    "type": "input_value",
                    "name": "position",
                    "check": "robot_position"
                },
                {
                    "type": "input_value",
                    "name": "X",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "Y",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "Z",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "output": "robot_position",
            "colour": 260,
            "tooltip": "Adjust coordinate's X Y Z axis (usefull while using variables to store coordinates)",
            "helpUrl": ""
        },
        {
            "type": "robot_position_location_only",
            "message0": "X %1 Y %2 Z %3",
            "args0": [
                {
                    "type": "field_number",
                    "name": "X",
                    "check": "Number"
                },
                {
                    "type": "field_number",
                    "name": "Y",
                    "check": "Number"
                },
                {
                    "type": "field_number",
                    "name": "Z",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "output": "robot_position",
            "colour": 260,
            "tooltip": "",
        },
        {
            "type": "robot_position_from_grid",
            "message0": "grid %1 row %2 column %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "grid",
                    "check": "robot_grid"
                },
                {
                    "type": "field_input",
                    "name": "row",
                    "text": "A",
                    "check": "String"
                },
                {
                    "type": "field_input",
                    "name": "column",
                    "text": "1",
                    "check": "String"
                }
            ],
            "inputsInline": true,
            "output": "robot_position",
            "colour": 260,
            "tooltip": "",
        },
        {
            "type": "robot_grid",
            "message0": "🔢 Microplate Grid %1↖ top left%2 ↗ top right%3 ↙ bottom left%4 ↘ bottom right%5 grid size%6",
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "top_left",
                    "check": "robot_position"
                },
                {
                    "type": "input_value",
                    "name": "top_right",
                    "check": "robot_position"
                },
                {
                    "type": "input_value",
                    "name": "bottom_left",
                    "check": "robot_position"
                },
                {
                    "type": "input_value",
                    "name": "bottom_right",
                    "check": "robot_position"
                },
                {
                    "type": "field_dropdown",
                    "name": "grid_size",
                    "options": [
                        ["48", "48"],
                        ["96", "96"],
                        ["384", "384"]
                    ]
                },
            ],
            "inputsInline": false,
            "output": "robot_grid",
            "colour": '#993DFF',
            "tooltip": "",
        },
        {
            "type": "robot_move",
            "message0": "move to %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "position",
                    "check": "robot_position"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 245,
            "tooltip": "Move the arm to a specific location (coordinates)",
            "helpUrl": ""
        },
        {
            "type": "robot_move_relative",
            "message0": "relative move to %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "position",
                    "check": "robot_position"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 245,
            "tooltip": "Move the arm relatively (coordinates)",
            "helpUrl": ""
        },
        {
            "type": "pick_or_drop_pipette",
            "message0": "pipette %1 %2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "action",
                    "options": [
                        ["pick", "PICK"],
                        ["drop", "DROP"]
                        // ["print", "PRINT"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "position",
                    "check": "robot_position"
                },
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 245,
            "tooltip": "Acquire\\Drop a pipette from\\to a location (coordinates)",
            "helpUrl": ""
        },
        {
            "type": "drop_pipette",
            "message0": "pipette drop %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "position",
                    "check": "robot_position"
                },
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 245,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "load_Material",
            "message0": "🧪 %1 amount %2 position %3",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "action",
                    "options": [
                        ["load", "LOAD"],
                        ["eject", "EJECT"]
                        // ["print", "PRINT"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "amount",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "position",
                    "check": "robot_position"
                },

            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 245,
            "tooltip": "Load\\Eject a material from\\to a location (coordinates)",
        },
        {
            "type": "robot_wrist",
            "message0": "📐 move wrist %1 %2",
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_angle",
                    "name": "Angle",
                    "angle": 90
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 245,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_sleep",
            "message0": "💤 sleep %1",
            "args0": [
                {
                    "type": "field_number",
                    "name": "duration",
                    "value": 0
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 245,
            "tooltip": "Pause the arm (seconds)",
            "helpUrl": ""
        },
        {
            "type": "robot_speed",
            "message0": "moving speed %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "speed",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 245,
            "tooltip": "Arm's moving speed in mm/min (0-30,000)",
            "helpUrl": ""
        },
        {
            "type": "print_pattern",
            "message0": "🧠 Smart Printing %1  %2 . %3 %4 starting point %5 pipette pick-up %6 liquid position %7 disposal point %8",
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_input",
                    "name": "pattern_name",
                    "text": "patternName"
                },
                {
                    "type": "field_dropdown",
                    "name": "pattern_type",
                    "options": [
                        ["png", ".png"],
                        ["ca", ".ca"]
                    ]
                },
                {
                    "type": "input_dummy",
                },
                {
                    "type": "input_value",
                    "name": "starting_point",
                    "check": "robot_position"
                },
                {
                    "type": "input_value",
                    "name": "pipette_pick",
                    "check": "robot_position"
                },
                {
                    "type": "input_value",
                    "name": "liquid_point",
                    "check": "robot_position"
                },
                {
                    "type": "input_value",
                    "name": "disposal_point",
                    "check": "robot_position"
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#c165ff",
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "print_pattern_mini",
            "message0": "print %1  .  %2 starting at %3",
            "args0": [
                {
                    "type": "field_input",
                    "name": "pattern_name",
                    "text": "patternName"
                },
                {
                    "type": "field_dropdown",
                    "name": "pattern_type",
                    "options": [
                        ["png", ".png"],
                        ["ca", ".ca"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "starting_point",
                    "check": "robot_position"
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#c165ff",
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_pump",
            "message0": "💨 suction %1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "pump_state",
                    "options": [
                        ["on", "True"],
                        ["off", "False"]
                    ]
                },
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 245,
            "tooltip": "Turn on\\off the suction cup",
            "helpUrl": ""
        },
        {
            "type": "shaker_module",
            "message0": "👋 Shake %1 duration %2 seconds %3 speed %4",
            "args0": [
                {
                    "type": "input_dummy",
                },
                {
                    "type": "field_number",
                    "name": "duration",
                    "check": ["Number"]
                },
                {
                    "type": "input_dummy",
                },
                {
                    "type": "field_dropdown",
                    "name": "speed",
                    "options": [
                        ["gently", "1"],
                        ["normal", "2"],
                        ["fast", "3"],
                        ["thoroughly", "4"]
                    ]
                },
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#808080",
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "heater_module",
            "message0": "🌡️ Heat %1 power %2 %3 °C %4",
            "args0": [
                {
                    "type": "input_dummy",
                },
                {
                    "type": "field_dropdown",
                    "name": "pump_state",
                    "options": [
                        ["on", "True"],
                        ["off", "False"]
                    ]
                },
                {
                    "type": "input_dummy",
                },
                {
                    "type": "field_number",
                    "name": "speed",
                    "check": ["Number"]
                },
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#808080",
            "tooltip": "",
            "helpUrl": ""
        },
        // {
        //     "type": "materials",
        //     "message0": "%1 position: %4 %2 position: %5 %3 position: %6",
        //     "args0": [
        //         {
        //             "type": "field_input",
        //             "name": "MATERIAL1",
        //             "text": "Material 1",
        //         },
        //         {
        //             "type": "field_input",
        //             "name": "MATERIAL2",
        //             "text": "Material 2",
        //         },
        //         {
        //             "type": "field_input",
        //             "name": "MATERIAL3",
        //             "text": "Material 3",
        //         },
        //         {
        //             "type": "input_value",
        //             "name": "position",
        //             "check": ["robot_position", "robot_position_location_only"]
        //         },
        //         {
        //             "type": "input_value",
        //             "name": "position",
        //             "check": ["robot_position", "robot_position_location_only"]
        //         },
        //         {
        //             "type": "input_value",
        //             "name": "position",
        //             "check": ["robot_position", "robot_position_location_only"]
        //         },
        //     ],
        //     "inputsInline": false,
        //     "output": null,
        //     "colour": 330,
        //     "tooltip": "",
        //     "helpUrl": ""
        // },
    ]
);  // END JSON EXTRACT (Do not delete this comment.)

/**
 * replace empty arg strings with None.
 * otherwise, return arg
 * @param   {string}    arg     argument
 * @returns value or None
 */
function valueOrNone(arg) {
    if (arg === "") {
        return 'None';
    } else {
        return arg;
    }

}

/**
 * convert a string representing coordinates (X, Y, Z) to its values
 * @param   {string}    value_position     string representing coordinates
 * @returns Array of values [X,Y,Z]
 */
function extractCoordsFromValuePosition(value_position) {
    let re = /{'x':(.*), 'y':(.*), 'z':(.*)[,}]/;
    return [RegExp.$1, RegExp.$1, RegExp.$1];
}

Blockly.Python['robot_position'] = function (block) {
    var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
    var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
    var value_z = Blockly.Python.valueToCode(block, 'Z', Blockly.Python.ORDER_ATOMIC);

    // dealing with negative numbers
    if (parseFloat(value_x) < 0)
        value_x = "(" + value_x + ")";
    if (parseFloat(value_y) < 0)
        value_y = "(" + value_y + ")";
    if (parseFloat(value_x) < 0)
        value_z = "(" + value_x + ")";


    var value_e = Blockly.Python.valueToCode(block, 'E', Blockly.Python.ORDER_ATOMIC);
    var value_s = Blockly.Python.valueToCode(block, 'S', Blockly.Python.ORDER_ATOMIC);

    // generate python code
    var code = "{";
    code += "\'x\':" + valueOrNone(value_x) + ", ";
    code += "\'y\':" + valueOrNone(value_y) + ", ";
    code += "\'z\':" + valueOrNone(value_z) + ", ";
    code += "\'e\':" + valueOrNone(value_e) + ", ";
    code += "\'speed\':" + valueOrNone(value_s);
    code += '}';
    code += '\n';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['robot_position_new'] = function (block) {
    var value_x = block.getFieldValue('X');
    var value_y = block.getFieldValue('Y');
    var value_z = block.getFieldValue('Z');

    // dealing with negative numbers
    if (parseFloat(value_x) < 0)
        value_x = "(" + value_x + ")";
    if (parseFloat(value_y) < 0)
        value_y = "(" + value_y + ")";
    if (parseFloat(value_x) < 0)
        value_z = "(" + value_x + ")";


    var value_e = Blockly.Python.valueToCode(block, 'E', Blockly.Python.ORDER_ATOMIC);
    var value_s = Blockly.Python.valueToCode(block, 'S', Blockly.Python.ORDER_ATOMIC);

    // generate python code
    var code = "{";
    code += "\'x\':" + valueOrNone(value_x) + ", ";
    code += "\'y\':" + valueOrNone(value_y) + ", ";
    code += "\'z\':" + valueOrNone(value_z) + ", ";
    code += "\'e\':" + valueOrNone(value_e) + ", ";
    code += "\'speed\':" + valueOrNone(value_s);
    code += '}';
    code += '\n';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['robot_position_location_only'] = function (block) {
    var value_x = block.getFieldValue('X');
    var value_y = block.getFieldValue('Y');
    var value_z = block.getFieldValue('Z');

    // dealing with negative numbers
    if (parseFloat(value_x) < 0)
        value_x = "(" + value_x + ")";
    if (parseFloat(value_y) < 0)
        value_y = "(" + value_y + ")";
    if (parseFloat(value_x) < 0)
        value_z = "(" + value_x + ")";

    // generate python code
    var code = "{";
    code += "\'x\':" + valueOrNone(value_x) + ", ";
    code += "\'y\':" + valueOrNone(value_y) + ", ";
    code += "\'z\':" + valueOrNone(value_z) + ", ";
    code += "\'e\':None, ";
    code += "\'speed\':None";
    code += '}';
    code += '\n';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['robot_position_current'] = function (block) {

    // generate python code
    var code = "{";
    code += "\'x\':None, ";
    code += "\'y\':None, ";
    code += "\'z\':None";
    code += '}';
    code += '\n';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['robot_position_arithmetic'] = function (block) {
    var value_position = String(Blockly.Python.valueToCode(block, 'position', Blockly.Python.ORDER_ATOMIC));
    var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC)
    var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC)
    var value_z = Blockly.Python.valueToCode(block, 'Z', Blockly.Python.ORDER_ATOMIC)

    // delete unnecessary brackets characters
    if (value_position.startsWith("(") && value_position.endsWith(")"))
        value_position = String(value_position).substring(1, value_position.length - 1);

    console.log(value_position);

    // in case of a non-variable position block
    if (value_position.startsWith("{")) {
        var patt = /{'x':[\(]?([0-9-]*).*[\)]?, 'y':[\(]?([0-9-]*).*[\)]?, 'z':[\(]?([0-9-]*).*[\)]?[,}]/i;
        var match = patt.exec(value_position);
        var code = "{";
        console.log(match);
        if (match[1] == "")
            code += "\'x\':None, ";
        else {
            value_x = parseInt(value_x) + parseInt(match[1])
            if (value_x < 0) value_x = "(" + value_x + ")"; // add brackets to negative number
            code += "\'x\':" + value_x + ", ";
        }
        if (match[2] == "")
            code += "\'y\':None, ";
        else {
            value_y = parseInt(value_y) + parseInt(match[2])
            if (value_y < 0) value_y = "(" + value_y + ")"; // add brackets to negative number
            code += "\'y\':" + value_y + ", ";
        }
        if (match[3] == "")
            code += "\'z\':None";
        else {
            value_z = parseInt(value_z) + parseInt(match[3])
            if (value_z < 0) value_z = "(" + value_z + ")";
            code += "\'z\':" + value_z;
        }
        code += '}';
        code += '\n';
    }

    // in case of a variable position block
    else {
        var code = "{";
        code += "\'x\':" + value_position + "['x'] + " + value_x + ", ";
        code += "\'y\':" + value_position + "['y'] + " + value_y + ", ";
        code += "\'z\':" + value_position + "['z'] + " + value_z;
        code += '}';
        code += '\n';
    }

    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['robot_position_arithmetic_puzzle'] = function (block) {
    var value_position = String(Blockly.Python.valueToCode(block, 'position', Blockly.Python.ORDER_ATOMIC));
    var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC)
    var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC)
    var value_z = Blockly.Python.valueToCode(block, 'Z', Blockly.Python.ORDER_ATOMIC)

    // delete unnecessary brackets characters
    if (value_position.startsWith("(") && value_position.endsWith(")"))
        value_position = String(value_position).substring(1, value_position.length - 1);

    console.log(value_position);

    // in case of a non-variable position block
    if (value_position.startsWith("{")) {
        var patt = /{'x':[\(]?([0-9-]*).*[\)]?, 'y':[\(]?([0-9-]*).*[\)]?, 'z':[\(]?([0-9-]*).*[\)]?[,}]/i;
        var match = patt.exec(value_position);
        var code = "{";
        console.log(match);
        if (match[1] == "")
            code += "\'x\':None, ";
        else {
            value_x = parseInt(value_x) + parseInt(match[1])
            if (value_x < 0) value_x = "(" + value_x + ")"; // add brackets to negative number
            code += "\'x\':" + value_x + ", ";
        }
        if (match[2] == "")
            code += "\'y\':None, ";
        else {
            value_y = parseInt(value_y) + parseInt(match[2])
            if (value_y < 0) value_y = "(" + value_y + ")"; // add brackets to negative number
            code += "\'y\':" + value_y + ", ";
        }
        if (match[3] == "")
            code += "\'z\':None";
        else {
            value_z = parseInt(value_z) + parseInt(match[3])
            if (value_z < 0) value_z = "(" + value_z + ")";
            code += "\'z\':" + value_z;
        }
        code += '}';
        code += '\n';
    }

    // in case of a variable position block
    else {
        var code = "{";
        code += "\'x\':" + value_position + "['x'] + " + value_x + ", ";
        code += "\'y\':" + value_position + "['y'] + " + value_y + ", ";
        code += "\'z\':" + value_position + "['z'] + " + value_z;
        code += '}';
        code += '\n';
    }

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['robot_position_from_grid'] = function (block) {
    var grid = String(Blockly.Python.valueToCode(block, 'grid', Blockly.Python.ORDER_ATOMIC));
    var row = block.getFieldValue('row');
    var column = block.getFieldValue('column');

    // input validation
    if (!row.match(/^[a-z]$/i)) {
        alert("Grid row index must be a letter")
        return null;
    }

    // generate python code
    var code = `${grid}['${row.toUpperCase()}${column}']`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['robot_grid'] = function (block) {
    var top_left = String(Blockly.Python.valueToCode(block, 'top_left', Blockly.Python.ORDER_ATOMIC));
    var top_right = String(Blockly.Python.valueToCode(block, 'top_right', Blockly.Python.ORDER_ATOMIC));
    var bottom_left = String(Blockly.Python.valueToCode(block, 'bottom_left', Blockly.Python.ORDER_ATOMIC));
    var bottom_right = String(Blockly.Python.valueToCode(block, 'bottom_right', Blockly.Python.ORDER_ATOMIC));
    var grid_size = block.getFieldValue('grid_size');
    var positions_array = [top_left, top_right, bottom_left, bottom_right];

    // delete unnecessary brackets characters
    for (i = 0; i < positions_array.length; i++)
        if (positions_array[i].startsWith("(") && positions_array[i].endsWith(")"))
            positions_array[i] = positions_array[i].substring(1, positions_array[i].length - 1);

    // input validation
    if (top_left.length == 0 || top_right.length == 0 || bottom_left.length == 0 || bottom_right.length == 0) {
        alert("one of the grid's coordinates is missing");
        return null;
    }

    var code = `grid_generator(${positions_array[0]},${positions_array[1]},${positions_array[2]},${positions_array[3]},${grid_size})`;
    return [code, Blockly.Python.ORDER_NONE]
}

Blockly.Python['robot_move'] = function (block) {
    var value_position = String(Blockly.Python.valueToCode(block, 'position', Blockly.Python.ORDER_ATOMIC));

    // delete unnecessary brackets characters
    if (value_position.startsWith("(") && value_position.endsWith(")"))
        value_position = value_position.substring(1, value_position.length - 1);
    console.log(value_position);

    // generate python code
    var code = "dict_args = " + value_position + " \n";
    code += "dict_args[\'wait\'] = True \n";
    code += "swift.set_position(**dict_args)\n";
    code += '\n';
    return code;
};

Blockly.Python['robot_move_relative'] = function (block) {
    var value_position = String(Blockly.Python.valueToCode(block, 'position', Blockly.Python.ORDER_ATOMIC));

    // delete unnecessary brackets characters
    if (value_position.startsWith("(") && value_position.endsWith(")"))
        value_position = value_position.substring(1, value_position.length - 1);
    console.log(value_position);

    // generate python code
    var code = "dict_args = " + value_position + " \n";
    code += "dict_args[\'wait\'] = True \n";
    code += "dict_args[\'relative\'] = True \n";
    code += "swift.set_position(**dict_args)\n";
    code += "dict_args[\'relative\'] = False \n";  // default is not relative
    code += '\n';
    return code;
};

Blockly.Python['pick_or_drop_pipette'] = function (block) {
    var value_position = String(Blockly.Python.valueToCode(block, 'position', Blockly.Python.ORDER_ATOMIC));
    // delete unnecessary brackets characters
    if (value_position.startsWith("(") && value_position.endsWith(")"))
        value_position = String(value_position).substring(1, value_position.length - 1);
    var action = block.getFieldValue('action');
    var code = "";

    // generate python code

    if (action == "PICK") {
        // pippete pick mode
        // Hovering above pipette
        code = "dict_args = " + value_position + " \n";
        code += "dict_args[\'wait\'] = True \n";
        code += "dict_args[\'change_z_by\'] = 50 \n";
        code += "swift.set_position(**dict_args)\n";

        // Acquiring pipette
        code += "dict_args[\'wait\'] = True \n";
        code += "dict_args[\'change_z_by\'] = 0 \n";
        code += "swift.set_position(**dict_args)\n";
        code += 'sleep(1)\n';

        // Hovering above pipette
        code += "dict_args[\'wait\'] = True \n";
        code += "dict_args[\'change_z_by\'] = 80 \n";
        code += "swift.set_position(**dict_args)\n";
        code += "dict_args[\'change_z_by\'] = 0 \n"; // back to normal location (relevant in case of using variables)

        code += '\n';
    }
    else {
        // pippete drop mode
        var code = "dict_args = " + value_position + " \n";  // go to drop position
        code += "dict_args[\'wait\'] = True \n";
        code += "swift.set_position(**dict_args)\n";

        code += "swift.set_wrist(270)\n"  // drop the pipette
        code += "sleep(1)\n\n"
    }


    return code;
};

Blockly.Python['load_Material'] = function (block) {
    var value_position = String(Blockly.Python.valueToCode(block, 'position', Blockly.Python.ORDER_ATOMIC));
    // delete unnecessary brackets characters
    if (value_position.startsWith("(") && value_position.endsWith(")"))
        value_position = value_position.substring(1, value_position.length - 1);
    var value_amount = Blockly.Python.valueToCode(block, 'amount', Blockly.Python.ORDER_ATOMIC);
    var action = block.getFieldValue('action');
    // var patt = /{'x':(.*), 'y':(.*), 'z':[\(]?(.*)[\)]?(.*)}/i;
    // var match = patt.exec(value_position);
    // var value_position_up;
    // if (valueOrNone(match[3]) != 'None')  // there is a Z coordinate
    //     value_position_up = "{'x':" + match[1] + ", 'y':" + match[2] + ", 'z':" + (parseFloat(match[3]) + 50) + "}";
    // else
    //     value_position_up = value_position;

    // generate python code
    if (action == "LOAD") {
        // Load option
        value_amount *= -1;

        // Hovering above
        var code = "dict_args = " + value_position + " \n";
        code += "dict_args[\'change_z_by\'] = 70 \n";
        code += "dict_args[\'wait\'] = True \n";
        code += "swift.set_position(**dict_args)\n";

        // back to normal location (relevant in case of using variables)
        code += "dict_args[\'change_z_by\'] = 0 \n";
        code += "swift.set_position(**dict_args)\n";

        // loading material
        code += "dict_args = ({'e': " + value_amount + "}) \n";
        code += "dict_args[\'wait\'] = True \n";
        code += "dict_args[\'relative\'] = True \n";
        code += "swift.set_position(**dict_args)\n";
        code += "dict_args[\'relative\'] = False \n";  // default is not relative

        // Hovering above
        code += "dict_args = " + value_position + " \n";
        code += "dict_args[\'change_z_by\'] = 70 \n";
        code += "dict_args[\'wait\'] = True \n";
        code += "swift.set_position(**dict_args)\n";
        code += "dict_args[\'change_z_by\'] = 0 \n";  // back to normal location (relevant in case of using variables)
    }
    else if (action == "EJECT") {
        // Eject option

        // Hovering above
        var code = "dict_args = " + value_position + " \n";
        code += "dict_args[\'change_z_by\'] = 70 \n";
        code += "dict_args[\'wait\'] = True \n";
        code += "swift.set_position(**dict_args)\n";

        // moving to ejecting location
        code += "dict_args = " + value_position + " \n";
        code += "dict_args[\'change_z_by\'] = 0 \n";
        code += "dict_args[\'wait\'] = True \n";
        code += "swift.set_position(**dict_args)\n";

        // ejecting material
        code += "dict_args = ({'e': " + value_amount + "}) \n";
        code += "dict_args[\'wait\'] = True \n";
        code += "dict_args[\'relative\'] = True \n";
        code += "swift.set_position(**dict_args)\n";
        code += "dict_args[\'relative\'] = False \n";  // default is not relative

        // Hovering above
        code += "dict_args = " + value_position + " \n";
        code += "dict_args[\'change_z_by\'] = 30 \n";
        code += "dict_args[\'wait\'] = True \n";
        code += "swift.set_position(**dict_args)\n";
        code += "dict_args[\'change_z_by\'] = 0 \n";  // back to normal location (relevant in case of using variables)
    }

    code += '\n';
    return code;
};

Blockly.Python['robot_wrist'] = function (block) {
    var angle = block.getFieldValue('Angle');
    var code = 'swift.set_wrist(' + angle + ')\nsleep(1)\n';
    code += '\n';
    return code;
};

Blockly.Python['robot_sleep'] = function (block) {
    var dur = block.getFieldValue('duration');
    var code = 'sleep(' + dur + ')\n';
    code += '\n';
    return code;
};

Blockly.Python['robot_speed'] = function (block) {
    var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    var code = "swift.set_speed(" + speed + ")\n";
    code += '\n';
    return code;
};

Blockly.Python['shaker_module'] = function (block) {
    var dur = block.getFieldValue('duration');
    var speed = block.getFieldValue('speed');
    var code = 'swift.shaker_module_init(time=' + dur + ', speed=' + speed + ')\n';
    code += '\n';
    return code;
};

Blockly.Python['print_pattern'] = function (block) {
    var pattern = block.getFieldValue('pattern_name');
    var type = block.getFieldValue('pattern_type');
    var pipette_position = Blockly.Python.valueToCode(block, 'pipette_pick', Blockly.Python.ORDER_ATOMIC);
    var disposal_position = Blockly.Python.valueToCode(block, 'disposal_point', Blockly.Python.ORDER_ATOMIC);
    var starting_position = Blockly.Python.valueToCode(block, 'starting_point', Blockly.Python.ORDER_ATOMIC);
    var liquid_position = Blockly.Python.valueToCode(block, 'liquid_point', Blockly.Python.ORDER_ATOMIC);

    var pattern_edit = pattern.replace(/'/g, '');
    var pattern_format = pattern_edit + type + '.coords';
    console.log(pattern_format);
    // var code = 'image_format = \'' + pattern_format + '\'\n';
    var code = '';

    // Reading the coords file into a list
    code += 'print(\'retrieveing coords from ' + pattern_format + '\')\n';
    code += 'coords = []\n';
    code += 'import os\n';
    code += 'with open(os.path.join(\'uploads\\coords\', \'' + pattern_format + '\'), \'r\') as f\:\n';
    code += '    for line in f\:\n';
    code += '        x\, y = line.strip().split(\"\,\")\n';
    code += '        coords.append((float(x), float(y)))\n';

    // Initializing required variables
    code += 'current_liquid = 0\n';
    code += 'release_step = -0.070\n';
    code += 'total_liquid = release_step * (len(coords) + 100)* 1.75\n';
    code += 'step_proportional = 2\n';
    code += 'protection_sip = -1.5\n';

    // Resetting arm position to home
    code += 'swift.set_wrist(90)\n';
    code += 'swift.set_position(120, 0, 50, speed=15000, wait=True)\n';

    // Initializing required positions
    code += 'pip_args = ' + pipette_position + '\n'; // Pipette pick up Point
    code += "pip_args[\'wait\'] = True \n";
    code += 'start_args = ' + starting_position + '\n'; // Starting Point
    code += "start_args[\'wait\'] = True \n";
    code += 'starting_x = start_args[\'x\']\n';
    code += 'starting_y = start_args[\'y\']\n';
    code += 'printing_z = start_args[\'z\']\n';
    code += 'liquid_args = ' + liquid_position + '\n'; // Liquid Point
    code += "liquid_args[\'wait\'] = True \n";
    code += 'disposal_args = ' + disposal_position + '\n'; // Disposal Point
    code += "disposal_args[\'wait\'] = True \n";

    // Moving to pipette pick up location, while preserving arm's height
    code += 'temp_z = pip_args[\'z\']\n';
    code += 'pip_args[\'z\'] = 60\n';
    code += 'swift.set_position(**pip_args)\n'; // Moving to pipette pick-up point
    code += 'pip_args[\'z\'] = temp_z\n';
    code += 'swift.set_position(**pip_args)\n'; // Acquiring pipette
    code += 'sleep(1)\n';
    code += 'swift.set_position(z=105, speed=1500, timeout=30, wait=True)\n';

    // Moving to liquid location, while preserving arm's height
    code += 'temp_z = liquid_args[\'z\']\n';
    code += 'liquid_args[\'z\'] = 105\n';
    code += 'swift.set_position(**liquid_args)\n'; // Moves to liquid point
    code += 'liquid_args[\'z\'] = temp_z\n';
    code += 'swift.set_position(**liquid_args)\n';
    // Extrude the liquid according to the amount of coords
    code += 'swift.set_position(e=total_liquid, speed=1500, timeout=30, wait=True)\n';
    code += 'current_liquid = total_liquid\n';
    code += 'swift.set_position(z=90, speed=30000, timeout=30, wait=True)\n';
    // Moves to printing starting point
    code += 'swift.set_position(x = (step_proportional * coords[0][0] ) + starting_x,' +
        'y = (step_proportional * coords[0][1] ) + starting_y, z = 60 ,speed=30000, timeout=30, wait=True)\n';

    // Printing image's coords
    code += 'picture = coords\n';
    code += 'total_len = len(picture)\n';
    code += 'current_step = 0\n';
    code += 'for x, y in picture:\n';
    code += '    current_step += 1\n';
    code += '    print("{c_step}/{total}".format(c_step=current_step, total=total_len))\n';
    code += '    current_liquid -= release_step\n';
    code += '    print(x, y)\n';
    code += '    swift.set_position(x=starting_x + (step_proportional * x), y=starting_y + (step_proportional * y), wait=True, speed=1500)\n';
    code += '    sleep(0.3)\n';
    code += '    swift.set_position(z=printing_z, wait=True)\n';
    code += '    swift.set_position(e=current_liquid, wait=True, speed=500)\n';
    code += '    swift.set_position(z=printing_z + 5, wait=True)\n';


    // Printing last step
    code += 'current_liquid += release_step\n';
    code += 'swift.set_position(z=printing_z, wait=True)\n';
    code += 'swift.set_position(e=current_liquid, wait=True, speed=300)\n';
    code += 'swift.set_position(z=printing_z+3, wait=True)\n';

    // Releasing the rest of the liquid
    // code += 'swift.set_position(e=current_liquid-protection_sip)\n';
    // Dropping off the pipette at disposal area
    code += 'swift.set_position(e=current_liquid, z=155, speed=30000, wait=True)\n';
    code += 'temp_z = disposal_args[\'z\']\n';
    code += 'disposal_args[\'z\'] = 155\n';
    code += 'swift.set_position(x=269, y=-90, z=155, e=current_liquid, speed=30000, wait=True)\n';
    code += 'swift.set_position(z = 155, speed=30000, timeout=20, wait=True)\n';
    code += 'swift.set_position(e=0, speed=30000, timeout=20, wait=True)\n';
    code += 'swift.set_wrist(0)\n';
    code += 'swift.set_wrist(90)\n';
    code += 'swift.set_position(z=150, speed=30000, wait=True)\n';

    code += '\n';
    return code;
};

Blockly.Python['print_pattern_mini'] = function (block) {
    var pattern = block.getFieldValue('pattern_name');
    var type = block.getFieldValue('pattern_type');
    var starting_position = Blockly.Python.valueToCode(block, 'starting_point', Blockly.Python.ORDER_ATOMIC);
    var pattern_edit = pattern.replace(/'/g, '');
    var pattern_format = pattern_edit + type + '.coords';
    // var code = 'image_format = \'' + pattern_format + '\'\n';
    var code = '';

    // Reading the coords file into a list
    code += 'print(\'retrieveing coords from ' + pattern_format + '\')\n';
    code += 'coords = []\n';
    code += 'import os\n';
    code += 'with open(os.path.join(\'uploads\\coords\', \'' + pattern_format + '\'), \'r\') as f\:\n';
    code += '    for line in f\:\n';
    code += '        x\, y = line.strip().split(\"\,\")\n';
    code += '        coords.append((float(x), float(y)))\n';

    // Initializing required variables
    code += 'release_step = -0.070\n';
    code += 'step_proportional = 2\n';

    // Initializing required positions
    code += 'start_args = ' + starting_position + '\n'; // Starting Point
    code += "start_args[\'wait\'] = True \n";
    code += 'starting_x = start_args[\'x\']\n';
    code += 'starting_y = start_args[\'y\']\n';
    code += 'printing_z = start_args[\'z\']\n';

    // Moves to printing starting point
    code += 'swift.set_position(x = (step_proportional * coords[0][0] ) + starting_x,' +
        'y = (step_proportional * coords[0][1] ) + starting_y, z = 60 ,speed=1500, timeout=30, wait=True)\n';
    // code += 'swift.set_position(x = starting_x, y = starting_y, z = printing_z + 30 ,speed=1500, timeout=30, wait=True)\n';

    // Printing image's coords
    code += 'picture = coords\n';
    code += 'total_len = len(picture)\n';
    code += 'current_step = 0\n';
    code += 'for x, y in picture:\n';
    code += '    current_step += 1\n';
    code += '    print("{c_step}/{total}".format(c_step=current_step, total=total_len))\n';
    code += '    print(x, y)\n';
    code += '    swift.set_position(x=starting_x + (step_proportional * x), y=starting_y + (step_proportional * y), wait=True, speed=1500)\n';
    code += '    sleep(0.3)\n';
    code += '    swift.set_position(z=printing_z, wait=True)\n';
    code += '    swift.set_position(e=-release_step, wait=True, speed=500, relative=True)\n';
    code += '    swift.set_position(z=printing_z + 5, wait=True)\n';

    // Printing last step
    code += 'swift.set_position(z=printing_z, wait=True)\n';
    code += 'swift.set_position(e=release_step, wait=True, speed=300, relative=True)\n';
    code += 'swift.set_position(z=printing_z+3, wait=True)\n';

    code += '\n';
    return code;
};

Blockly.Python['robot_pump'] = function (block) {
    var state = block.getFieldValue('pump_state');
    var code = 'swift.set_pump(on=' + state + ')\n';
    code += '\n';
    return code;
};
