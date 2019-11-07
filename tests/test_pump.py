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

swift.set_position(214.25, 6.58, 80, speed=5000, timeout=30, wait=True)
swift.set_pump(on=True)
swift.set_position(150, 6.58, 60, speed=5000, timeout=30)

# swift.set_pump(on=False)
swift.set_position(100, 100, 80, speed=5000, timeout=30, wait=True)
