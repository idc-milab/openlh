import os
import sys

sys.path.append('pyuf/')
from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
from time import sleep

# TODO: reduce code duplication


def robot_move(swift: SwiftAPI, position: dict):
    dict_args = position
    dict_args['wait'] = True
    swift.set_position(**dict_args)


def robot_move_relative(swift: SwiftAPI, position: dict):
    dict_args = position
    dict_args['wait'] = True
    dict_args['relative'] = True
    swift.set_position(**dict_args)
    dict_args['relative'] = False


def pick_pipette(swift: SwiftAPI, position: dict):
    # Hovering above pipette
    dict_args = position
    dict_args['wait'] = True
    dict_args['change_z_by'] = 50
    swift.set_position(**dict_args)

    # Acquiring pipette
    dict_args['wait'] = True
    dict_args['change_z_by'] = 0
    swift.set_position(**dict_args)
    sleep(1)

    # Hovering above pipette
    dict_args['wait'] = True
    dict_args['change_z_by'] = 90
    swift.set_position(**dict_args)
    dict_args['change_z_by'] = 0


def drop_pipette(swift: SwiftAPI, position: dict):
    # Hovering above trash
    dict_args = position
    dict_args['change_z_by'] = 70
    dict_args['wait'] = True
    swift.set_position(**dict_args)

    # back to normal location (relevant in case of using variables)
    dict_args['change_z_by'] = 0
    swift.set_position(**dict_args)
    current_position = swift.get_position()
    robot_move(swift=swift, position=
        {'x': current_position[0], 'y': current_position[1], 'z': position['z'], 'e': None, 'speed': None})
    dict_args = position
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    swift.set_wrist(270)
    sleep(1)
    swift.set_wrist(90)

    # Hovering above trash
    dict_args = position
    dict_args['change_z_by'] = 70
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args['change_z_by'] = 0  # back to normal location(relevant in case of using variables)


def load_material(swift: SwiftAPI, position: dict, amount: int):
    amount *= -1
    dict_args = position
    dict_args['change_z_by'] = 70
    dict_args['wait'] = True
    swift.set_position(**dict_args)

    # back to normal location (relevant in case of using variables)
    dict_args['change_z_by'] = 0
    swift.set_position(**dict_args)

    # loading material
    dict_args = ({'e': amount})
    dict_args['wait'] = True
    dict_args['relative'] = True
    swift.set_position(**dict_args)
    dict_args['relative'] = False  # default is not relative

    # Hovering above
    dict_args = position
    dict_args['change_z_by'] = 70
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args['change_z_by'] = 0  # back to normal location(relevant in case of using variables)


def eject_material(swift: SwiftAPI, position: dict, amount: int):
    # Hovering above
    dict_args = position
    dict_args['change_z_by'] = 70
    dict_args['wait'] = True
    swift.set_position(**dict_args)

    # moving to ejecting location
    dict_args = position
    dict_args['change_z_by'] = 0
    dict_args['wait'] = True
    swift.set_position(**dict_args)

    # ejecting material
    dict_args = ({'e': amount})
    dict_args['wait'] = True
    dict_args['relative'] = True
    swift.set_position(**dict_args)
    dict_args['relative'] = False  # default is not relative

    # Hovering above
    dict_args = position
    dict_args['change_z_by'] = 70
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args['change_z_by'] = 0  # back to normal location(relevant in case of using variables)


def mix_material(swift: SwiftAPI, position: dict, amount: int, iterations: int, ejecting_delta: int, position_for_delta_injection: dict):
    # Hovering above
    dict_args = position
    dict_args['change_z_by'] = 70
    dict_args['wait'] = True
    swift.set_position(**dict_args)

    # back to normal location (relevant in case of using variables)
    dict_args['change_z_by'] = 0
    swift.set_position(**dict_args)

    for i in range(iterations):
        sleep(1)
        # loading material
        dict_args = {'e': amount * (-1)}
        dict_args['wait'] = True
        dict_args['relative'] = True
        swift.set_position(**dict_args)

        # ejecting material
        dict_args = {'e': amount + ejecting_delta}
        dict_args['wait'] = True
        dict_args['relative'] = True
        swift.set_position(**dict_args)
        dict_args['relative'] = False  # default is not relative

    # Hovering above
    dict_args = position
    dict_args['change_z_by'] = 70
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args['change_z_by'] = 0  # back to normal location(relevant in case of using variables)

    # delta injection
    load_material(swift=swift, amount=iterations*ejecting_delta,
                     position=position_for_delta_injection)


def robot_wrist(swift: SwiftAPI, angle: float):
    swift.set_wrist(angle=angle)
    sleep(1)


def robot_sleep(duration: float):
    sleep(duration)


def set_speed(swift: SwiftAPI, speed: float):
    swift.set_speed(speed=speed)


def shaker_module(swift: SwiftAPI, speed: int, duration: int):
    swift.shaker_module_init(time=duration, speed=speed)


# TODO: check and unite with mini function (most of it is copy paste)
def print_pattern(swift: SwiftAPI, pattern_format: str, pipette_position: dict, starting_position: dict,
                  liquid_position: dict,
                  disposal_position: dict):
    # Reading the coords file into a list
    print(f'retrieveing coords from {pattern_format}')
    coords = []
    with open(os.path.join('uploads\coords', pattern_format), 'r') as f:
        for line in f:
            x, y = line.strip().split("\,")
            coords.append((float(x), float(y)))

    # Initializing required variables
    current_liquid = 0
    release_step = -0.070
    total_liquid = release_step * (len(coords) + 100) * 1.75
    step_proportional = 2
    protection_sip = -1.5

    # Resetting arm position to home
    swift.set_wrist(90)
    swift.set_position(120, 0, 50, speed=15000, wait=True)

    # Initializing required positions
    pip_args = pipette_position
    pip_args['wait'] = True
    start_args = starting_position
    start_args['wait'] = True
    starting_x = start_args['x']
    starting_y = start_args['y']
    printing_z = start_args['z']
    liquid_args = liquid_position
    liquid_args['wait'] = True
    disposal_args = disposal_position
    disposal_args['wait'] = True

    # Moving to pipette pick up location, while preserving arm's height
    temp_z = pip_args['z']
    pip_args['z'] = 60
    swift.set_position(**pip_args)
    pip_args['z'] = temp_z
    swift.set_position(**pip_args)
    sleep(1)
    swift.set_position(z=105, speed=1500, timeout=30, wait=True)

    # Moving to liquid location, while preserving arm's height
    temp_z = liquid_args['z']
    liquid_args['z'] = 105
    swift.set_position(**liquid_args)
    liquid_args['z'] = temp_z
    swift.set_position(**liquid_args)

    # Extrude the liquid according to the amount of coords
    swift.set_position(e=total_liquid, speed=1500, timeout=30, wait=True)
    current_liquid = total_liquid
    swift.set_position(z=90, speed=30000, timeout=30, wait=True)

    # Moves to printing starting point
    swift.set_position(x=(step_proportional * coords[0][0]) + starting_x,
                       y=(step_proportional * coords[0][1]) + starting_y, z=60, speed=30000, timeout=30, wait=True)

    # Printing image's coords
    picture = coords
    total_len = len(picture)
    current_step = 0
    for x, y in picture:
        current_step += 1
        print("{c_step}/{total}".format(c_step=current_step, total=total_len))
        current_liquid -= release_step
        print(x, y)
        swift.set_position(x=starting_x + (step_proportional * x), y=starting_y + (step_proportional * y), wait=True,
                           speed=1500)
        sleep(0.3)
        swift.set_position(z=printing_z, wait=True)
        swift.set_position(e=current_liquid, wait=True, speed=500)
        swift.set_position(z=printing_z + 5, wait=True)

    # Printing last step
    current_liquid += release_step
    swift.set_position(z=printing_z, wait=True)
    swift.set_position(e=current_liquid, wait=True, speed=300)
    swift.set_position(z=printing_z + 3, wait=True)

    # Releasing the rest of the liquid
    # Dropping off the pipette at disposal area
    swift.set_position(e=current_liquid, z=155, speed=30000, wait=True)
    temp_z = disposal_args['z']
    disposal_args['z'] = 155
    swift.set_position(x=269, y=-90, z=155, e=current_liquid, speed=30000, wait=True)
    swift.set_position(z=155, speed=30000, timeout=20, wait=True)
    swift.set_position(e=0, speed=30000, timeout=20, wait=True)
    swift.set_wrist(0)
    swift.set_wrist(90)
    swift.set_position(z=150, speed=30000, wait=True)


# TODO: check and unite with function above (most of it is copy paste)
def print_pattern_mini(swift: SwiftAPI, pattern_format, starting_position):
    # Reading the coords file into a list
    print(f'retrieveing coords from {pattern_format}')
    coords = []
    with open(os.path.join('uploads\coords', pattern_format), 'r') as f:
        for line in f:
            x, y = line.strip().split("\,")
            coords.append((float(x), float(y)))

    # Initializing required variables
    release_step = -0.070
    step_proportional = 2

    # Initializing required positions
    start_args = starting_position  # Starting Point
    start_args['wait'] = True
    starting_x = start_args['x']
    starting_y = start_args['y']
    printing_z = start_args['z']

    # Moves to printing starting point
    swift.set_position(x=(step_proportional * coords[0][0]) + starting_x,
                       y=(step_proportional * coords[0][1]) + starting_y, z=60, speed=1500, timeout=30, wait=True)

    # Printing image's coords
    picture = coords
    total_len = len(picture)
    current_step = 0
    for x, y in picture:
        current_step += 1
        print("{c_step}/{total}".format(c_step=current_step, total=total_len))
        print(x, y)
        swift.set_position(x=starting_x + (step_proportional * x), y=starting_y + (step_proportional * y), wait=True,
                           speed=1500)
        sleep(0.3)
        swift.set_position(z=printing_z, wait=True)
        swift.set_position(e=-release_step, wait=True, speed=500, relative=True)
        swift.set_position(z=printing_z + 5, wait=True)

    # Printing last step
    swift.set_position(z=printing_z, wait=True)
    swift.set_position(e=release_step, wait=True, speed=300, relative=True)
    swift.set_position(z=printing_z + 3, wait=True)


def robot_pump(swift: SwiftAPI, pump_state):
    swift.set_pump(on=pump_state)


def move_to_starting_position(swift: SwiftAPI):
    swift.set_position(e=0, speed=1500, timeout=30, wait=True)
    swift.set_position(120, 0, 50, speed=1500, timeout=30, wait=True)
