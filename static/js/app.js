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
            "output": null,
            "colour": 260,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_position_with_custom_position",
            "message0": "Position %1 E %2 S %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "Position",
                    "check": ["robot_position", "robot_position_location_only"]
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
            "output": null,
            "colour": 300,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_move",
            "message0": "Move to: %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "position",
                    "check": ["robot_position", "robot_position_location_only"]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_position_location_only",
            "message0": "X %1 Y %2 Z %3",
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
                }
            ],
            "inputsInline": true,
            "output": null,
            "colour": 285,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_move",
            "message0": "Move to: %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "position",
                    "check": ["robot_position", "robot_position_location_only"]
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_wrist",
            "message0": "Move wrist: %1 %2",
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
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_sleep",
            "message0": "Sleep: %1",
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
            "colour": 200,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "print_image",
            "message0": "Image: %1 Starting Point: %2 Pipette Pick-Up: %3 Liquid Position: %4 Disposal Point: %5",
            "args0": [
                {
                    "type": "input_value",
                    "name": "image_name",
                    "check": "String"
                },
                {
                    "type": "input_value",
                    "name": "starting_point",
                    "check": ["robot_position", "robot_position_location_only"]
                },
                {
                    "type": "input_value",
                    "name": "pipette_pick",
                    "check": ["robot_position", "robot_position_location_only"]
                },
                {
                    "type": "input_value",
                    "name": "liquid_point",
                    "check": ["robot_position", "robot_position_location_only"]
                },
                {
                    "type": "input_value",
                    "name": "disposal_point",
                    "check": ["robot_position", "robot_position_location_only"]
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 30,
            "tooltip": "",
            "helpUrl": ""
        },
        {
            "type": "robot_pump",
            "message0": "Pump On: %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "pump_state"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 200,
            "tooltip": "",
            "helpUrl": ""
        }
    ]
);  // END JSON EXTRACT (Do not delete this comment.)

/**
 * replace empty arg strings with None.
 * otherwise, return arg
 * @param   {string}    arg     argument
 */
function valueOrNone(arg) {
    if (arg === "") {
        return 'None';
    } else {
        return arg;
    }

}

function extractCoordsFromValuePosition(value_position) {
    let re = /'x':(.*), 'y':(.*), 'z':(.*)}/;
    return [RegExp.$1, RegExp.$1, RegExp.$1];
}


Blockly.Python['robot_position'] = function (block) {
    var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
    var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
    var value_z = Blockly.Python.valueToCode(block, 'Z', Blockly.Python.ORDER_ATOMIC);
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

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['robot_position_location_only'] = function (block) {
    var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
    var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
    var value_z = Blockly.Python.valueToCode(block, 'Z', Blockly.Python.ORDER_ATOMIC);
    
    // generate python code
    var code = "{";
    code += "\'x\':" + valueOrNone(value_x) + ", ";
    code += "\'y\':" + valueOrNone(value_y) + ", ";
    code += "\'z\':" + valueOrNone(value_z);
    code += '}';
    
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['robot_position_with_custom_position'] = function (block) {
    let value_position = Blockly.Python.valueToCode(block, 'Position', Blockly.Python.ORDER_ATOMIC);
    let value_e = Blockly.Python.valueToCode(block, 'E', Blockly.Python.ORDER_ATOMIC);
    let value_s = Blockly.Python.valueToCode(block, 'S', Blockly.Python.ORDER_ATOMIC);

    // regex to extract X Y Z coords
    let re = /'x':(.*), 'y':(.*), 'z':(.*)}/;
    value_position.replace(re, '');

    // generate python code
    let code = "{";
    code += "\'x\':" + valueOrNone(RegExp.$1) + ", ";
    code += "\'y\':" + valueOrNone(RegExp.$2) + ", ";
    code += "\'z\':" + valueOrNone(RegExp.$3) + ", ";
    code += "\'e\':" + valueOrNone(value_e) + ", ";
    code += "\'speed\':" + valueOrNone(value_s);
    code += '}';

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['robot_move'] = function (block) {
    var value_position = Blockly.Python.valueToCode(block, 'position', Blockly.Python.ORDER_ATOMIC);
    console.log(value_position);

    // generate python code
    var code = "dict_args = " + value_position + " \n";
    code += "dict_args[\'wait\'] = True \n";
    code += "swift.set_position(**dict_args)\n";
    return code;
};

Blockly.Python['robot_wrist'] = function (block) {
    var angle = block.getFieldValue('Angle');
    var code = 'swift.set_wrist(' + angle + ')\nsleep(1)\n';
    return code;
};

Blockly.Python['robot_sleep'] = function (block) {
    var dur = block.getFieldValue('duration');
    var code = 'sleep(' + dur + ')\n';
    return code;
};

Blockly.Python['print_image'] = function (block) {
    var image = Blockly.Python.valueToCode(block, 'image_name', Blockly.Python.ORDER_ATOMIC);
    var pipette_position = Blockly.Python.valueToCode(block, 'pipette_pick', Blockly.Python.ORDER_ATOMIC);
    var disposal_position = Blockly.Python.valueToCode(block, 'disposal_point', Blockly.Python.ORDER_ATOMIC);
    var starting_position = Blockly.Python.valueToCode(block, 'starting_point', Blockly.Python.ORDER_ATOMIC);
    var liquid_position = Blockly.Python.valueToCode(block, 'liquid_point', Blockly.Python.ORDER_ATOMIC);

    var image_edit = image.replace(/'/g, '');
    var image_format = image_edit + '.coords';
    var code = 'image_format = \'' + image_format + '\'\n';

    // Reading the coords file into a list
    code += 'print(\'retrieveing coords from ' + image_format + '\')\n';
    code += 'coords = []\n';
    code += 'import os\n';
    code += 'with open(os.path.join(\'uploads\\coords\', \'' + image_format + '\'), \'r\') as f\:\n';
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

    return code;
};

Blockly.Python['robot_pump'] = function (block) {
    var state = Blockly.Python.valueToCode(block, 'pump_state', Blockly.Python.ORDER_ATOMIC);
    var code = 'swift.set_pump(on=' + state + ')\n';
    return code;
};
