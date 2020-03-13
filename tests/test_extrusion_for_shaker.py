import sys
sys.path.append('pyuf/')
from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
from time import sleep
logger_init(logging.DEBUG)
global swift
swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}
sleep(2)
print("Allowing extrusion")
swift.send_cmd_sync("M302 S0")
dict_args = {'x':180, 'y':100, 'z':100, 'e':None, 'speed':None}
dict_args['wait'] = True
swift.set_position(**dict_args)
swift.set_position(e=0, speed=1500, timeout=30, wait=True)
swift.set_position(120, 0, 50, speed=1500, timeout=30, wait=True)
sleep(1)
swift.close_conn()