import sys, os
from time import sleep

from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
logger_init(logging.DEBUG)


swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}
print('sleep 2 sec ...')
sleep(2)

print('device info: ')
print(swift.get_device_info())

print("Allowing extrusion")
swift.send_cmd_sync("M302 S0")
y_inc = [0, 16, 16]
liquids = [20, 10, 5, 4, 3, 2, 1, 0.5, 0.25]
printing_x = 180
printing_y = -50 # hasta 1
printing_z = -73.5
fufu_amount = -9

for y in y_inc:
    printing_y += y
    printing_x = 180
    for l in liquids:
        total_liquid = l
        release_step = l


        swift.set_position(189.8, -129.8, 80, speed=30000, timeout=30, wait=True)
        swift.set_position(z=0, speed=3000, timeout=30, wait=True)
        swift.set_position(z=-63, speed=300, timeout=30, wait=True)


        swift.set_position(e=total_liquid, speed=50, timeout=30, wait=True)
        current_liquid = total_liquid
        sleep(0.2)
        swift.set_position(z=80, speed=30000, timeout=30, wait=True)

        swift.set_position(printing_x, printing_y, 80, speed=30000, timeout=30, wait=True)
        swift.set_position(z=-70, speed=1000, timeout=30, wait=True)

        current_liquid -= release_step
        swift.set_position(z=printing_z, wait=True,timeout=300)
        swift.set_position(e=current_liquid, wait=True, speed=50, timeout=300)
        sleep(0.2)
        swift.set_position(z=printing_z + 3, e=fufu_amount-3, wait=True)
        sleep(0.2)
    #     current_liquid -= release_step
    # swift.set_position(e=current_liquid, wait=True, speed=50, timeout=300)
    # sleep(0.2)
    # swift.set_position(z=printing_z, wait=True,timeout=300)
    # sleep(0.2)
    # swift.set_position(e=fufu_amount, wait=True, speed=50, timeout=300)
    # sleep(0.2)
    # swift.set_position(z=printing_z + 3, e=fufu_amount-3, wait=True)
    #


        swift.set_position(z=80, speed=30000, timeout=30, wait=True)


        swift.set_position(120, 0, 50, speed=30000, timeout=30, wait=True)
        swift.set_position(e=0, speed=1500, timeout=30, wait=True)

        # Homing
        swift.set_position(120, 0, 50, speed=30000, timeout=30, wait=True)

        printing_x += 10
