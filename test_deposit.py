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

total_liquid = 30
release_step = 30
printing_z = -74.8
fufu_amount = -9
# Water position (222, 78, -37)

swift.set_position(222, 78, 80, speed=30000, timeout=30, wait=True)
swift.set_position(222, 78, 0, speed=3000, timeout=30, wait=True)
swift.set_position(222, 78, -13, speed=300, timeout=30, wait=True)


swift.set_position(e=total_liquid, speed=50, timeout=30, wait=True)
current_liquid = total_liquid
sleep(0.2)
swift.set_position(z=80, speed=3000, timeout=30, wait=True)

swift.set_position(237, -19, 80, speed=3000, timeout=30, wait=True)
swift.set_position(237, -19, -70, speed=1000, timeout=30, wait=True)

current_liquid -= release_step
swift.set_position(e=current_liquid, wait=True, speed=50)
sleep(0.2)
swift.set_position(z=printing_z, wait=True)
sleep(0.2)
swift.set_position(e=fufu_amount, wait=True, speed=50)
sleep(0.2)
swift.set_position(z=printing_z + 3, e=fufu_amount-3, wait=True)


swift.set_position(z=80, speed=30000, timeout=30, wait=True)


swift.set_position(120, 0, 50, speed=30000, timeout=30, wait=True)
swift.set_position(e=0, speed=1500, timeout=30, wait=True)

# Homing
swift.set_position(120, 0, 50, speed=30000, timeout=30, wait=True)
sleep(5)
