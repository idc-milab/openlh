from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
from time import sleep

logger_init(logging.DEBUG)
global swift

swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}
sleep(2)
print("Allowing extrusion")
swift.send_cmd_sync("M302 S0")

# d = swift.send_cmd_sync("M503")
# print(d)
dict_args = ({'x':221, 'y':(-114.5), 'z':80, 'e':0, 'speed':5000})
dict_args['wait'] = True
swift.set_position(**dict_args)
#
# dict_args = ({'x':221, 'y':(-114.5), 'z':59, 'e':0, 'speed':5000})
# dict_args['wait'] = True
# swift.set_position(**dict_args)
#
# dict_args = ({'x':221, 'y':(-114.5), 'z':59, 'e':-20, 'speed':5000})
# dict_args['wait'] = True
# swift.set_position(**dict_args)
# sleep(4)
#
# dict_args = ({'x':221, 'y':(-114.5), 'z':80 , 'e':-20, 'speed':5000})
# dict_args['wait'] = True
# swift.set_position(**dict_args)
#
# swift.set_position(e=0, speed=1500, timeout=30, wait=True)
# swift.set_position(120, 0, 50, speed=1500, timeout=30, wait=True)