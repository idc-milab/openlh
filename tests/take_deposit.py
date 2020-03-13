from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
from time import sleep

logger_init(logging.DEBUG)
global swift
try:
    swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}
except:  # problem connecting to the arm
    print("123")
    exit()
sleep(2)
print("Allowing extrusion")
swift.send_cmd_sync("M302 S0")
for count in range(100):
    dict_args = ({'x': 140.32, 'y': (-109), 'z': 0, 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': (-50), 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': (-60), 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': (-66), 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': (-66.5), 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': (-67), 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': (-67.5), 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': 10, 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 160.32, 'y': 40, 'z': 10, 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': 0, 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': (-60), 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    swift.set_wrist(90)
    sleep(1)
    swift.set_wrist(0)
    sleep(1)
    swift.set_wrist(90)
    sleep(1)
    dict_args = ({'x': 140.32, 'y': (-109), 'z': 0, 'e': 0})
    dict_args['wait'] = True
    swift.set_position(**dict_args)
    swift.set_position(e=0, speed=1500, timeout=30, wait=True)
    swift.set_position(120, 0, 50, speed=1500, timeout=30, wait=True)
